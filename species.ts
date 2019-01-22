import {Aliases} from './aliases';
import {Data, DataTable, patch} from './data';
import * as adv from './data/adv/pokemon.json';
import * as bw from './data/bw/pokemon.json';
import * as dpp from './data/dpp/pokemon.json';
import * as gsc from './data/gsc/pokemon.json';
import * as rby from './data/rby/pokemon.json';
import * as sm from './data/sm/pokemon.json';
import * as xy from './data/xy/pokemon.json';
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

const RBY: DataTable<Species> = patch({}, rby);
const GSC: DataTable<Species> = patch(RBY, gsc);
const ADV: DataTable<Species> = patch(GSC, adv);
const DPP: DataTable<Species> = patch(ADV, dpp);
const BW: DataTable<Species> = patch(DPP, bw);
const XY: DataTable<Species> = patch(BW, xy);
const SM: DataTable<Species> = patch(XY, sm);

const SPECIES: Readonly<Array<DataTable<Species>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

//  TODO rename Species with namespace?
export class Pokedex {
  static forGen(gen: Generation): DataTable<Species> {
    return SPECIES[gen - 1];
  }

  static getSpeciesName(s: ID|string, gen: Generation = CURRENT): string
      |undefined {
    const id = toID(s);
    const species = Pokedex.getSpecies(id);
    if (!species) return undefined;
    if (species.cosmeticForms && species.cosmeticForms.indexOf(id) >= 0) {
      const cosmeticForm = id.slice(species.name.length);
      if (cosmeticForm) {
        return species.name + '-' + cosmeticForm[0].toUpperCase() +
            cosmeticForm.slice(1);
      }
    }
    return species.name;
  }

  static getSpecies(s: ID|string, gen: Generation = CURRENT): Species
      |undefined {
    let id = toID(s);
    if (id === 'nidoran' && s.slice(-1) === '♀') {
      id = 'nidoranf' as ID;
    } else if (id === 'nidoran' && s.slice(-1) === '♂') {
      id = 'nidoranm' as ID;
    }

    const pokedex = Pokedex.forGen(gen);

    // BUG: Handle Rockruff-Dusk and other event pokemon?
    let alias = Aliases.lookup(id);
    if (alias) return pokedex[alias];

    let species = pokedex[id];
    if (species) return species;

    alias = '';
    if (id.startsWith('mega') && pokedex[id.slice(4) + 'mega']) {
      alias = id.slice(4) + 'mega';
    } else if (id.startsWith('m') && pokedex[id.slice(1) + 'mega']) {
      alias = id.slice(1) + 'mega';
    } else if (id.startsWith('primal') && pokedex[id.slice(6) + 'primal']) {
      alias = id.slice(6) + 'primal';
    } else if (id.startsWith('p') && pokedex[id.slice(1) + 'primal']) {
      alias = id.slice(1) + 'primal';
    }

    if (alias) species = pokedex[alias];
    return species;
  }
}
