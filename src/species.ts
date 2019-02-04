import {Aliases} from './aliases';
import {cache} from './cache';
import {Data, DataTable} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {StatsTable} from './stats';
import {Tier} from './tiers';
import {Type} from './types';

export type Gender = 'M'|'F'|'N';

export interface Species extends Data {
  readonly type1: Type;
  readonly type2?: Type;
  readonly baseStats: Readonly<StatsTable>;
  readonly weight: number;
  readonly gender?: Gender;
  readonly abilities?:
      Readonly<{0: string, 1?: string, H?: string, S?: string}>;
  readonly tier?: Tier;
  readonly prevo?: ID;
  readonly evos?: Readonly<ID[]>;
  readonly baseSpecies?: string;
  readonly baseForme?: string;
  readonly forme?: string;
  readonly formeLetter?: string;
  readonly otherFormes?: ID[];
  readonly cosmeticForms?: Readonly<ID[]>;
}

const RBY: Promise<DataTable<Species>> =
    Data.patch(Promise.resolve({}), import('./data/rby/species.json'));
const GSC: Promise<DataTable<Species>> =
    Data.patch(RBY, import('./data/gsc/species.json'));
const ADV: Promise<DataTable<Species>> =
    Data.patch(GSC, import('./data/adv/species.json'));
const DPP: Promise<DataTable<Species>> =
    Data.patch(ADV, import('./data/dpp/species.json'));
const BW: Promise<DataTable<Species>> =
    Data.patch(DPP, import('./data/bw/species.json'));
const XY: Promise<DataTable<Species>> =
    Data.patch(BW, import('./data/xy/species.json'));
const SM: Promise<DataTable<Species>> =
    Data.patch(XY, import('./data/sm/species.json'));

const SPECIES: Readonly<Array<Promise<DataTable<Species>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Species {
  static forGen(gen: Generation): Promise<DataTable<Species>> {
    return SPECIES[gen - 1];
  }

  @cache
  static async getName(
      s: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT):
      Promise<string|undefined> {
    const id = toID(s);
    const species = await Species.get(id);
    if (!species) return undefined;
    if (species.cosmeticForms && species.cosmeticForms.indexOf(id) >= 0) {
      const cosmeticForm = id.slice(species.name.length);
      // istanbul ignore else: N/A
      if (cosmeticForm) {
        return species.name + '-' + cosmeticForm[0].toUpperCase() +
            cosmeticForm.slice(1);
      }
    }
    return species.name;
  }

  @cache
  static async get(
      s: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT):
      Promise<Species|undefined> {
    if (!s) return undefined;

    let id = toID(s);
    if (id === 'nidoran' && s.slice(-1) === '♀') {
      id = 'nidoranf' as ID;
    } else if (id === 'nidoran' && s.slice(-1) === '♂') {
      id = 'nidoranm' as ID;
    }

    const data = await Species.forGen(gen);

    // BUG: Handle Rockruff-Dusk and other event pokemon?
    let alias = await Aliases.get(id);
    if (alias) return data[toID(alias)];

    let species = data[id];
    if (species) return species;

    alias = '';
    if (id.startsWith('mega') && data[id.slice(4) + 'mega']) {
      alias = id.slice(4) + 'mega';
    } else if (id.startsWith('m') && data[id.slice(1) + 'mega']) {
      alias = id.slice(1) + 'mega';
    } else if (id.startsWith('primal') && data[id.slice(6) + 'primal']) {
      alias = id.slice(6) + 'primal';
    } else if (id.startsWith('p') && data[id.slice(1) + 'primal']) {
      alias = id.slice(1) + 'primal';
    }

    if (alias) species = data[alias];
    return species;
  }
}
