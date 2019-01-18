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

// name = species
// id = speciesid
export interface Species extends Data {
  readonly type1: Type;
  readonly type2?: Type;
  readonly baseStats: StatsTable;
  readonly weight: number;
  readonly gender?: Gender;
  readonly abilities?: {0: string, 1?: string, H?: string, S?: string};
  readonly tier?: Tier;
  readonly prevo?: ID;
  readonly evos?: ID[];
  readonly baseSpecies?: string;  // Castform-Snowy -> Castform
  readonly baseForme?: string;
  readonly forme?: string;        // Castform-Snowy -> Snowy
  readonly formeLetter?: string;  // S
  readonly otherFormes?:
      ID[];  // castform -> castformsunny, castformrainy, castformsnowy
  readonly cosmeticForms?: ID[];  // = otherForms. shellos -> shelloseast
}

const RBY: DataTable<Species> = patch({}, rby);
const GSC: DataTable<Species> = patch(RBY, gsc);
const ADV: DataTable<Species> = patch(GSC, adv);
const DPP: DataTable<Species> = patch(ADV, dpp);
const BW: DataTable<Species> = patch(DPP, bw);
const XY: DataTable<Species> = patch(BW, xy);
const SM: DataTable<Species> = patch(XY, sm);

const SPECIES: Array<DataTable<Species>> = [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Pokedex {
  static forGen(gen: Generation): DataTable<Species> {
    return SPECIES[gen - 1];
  }

  // TODO should be equivalent to Dex.getTemplate, also add Dex.getSpecies
  // equivalent
  static getSpecies(s: ID|string, gen: Generation = CURRENT): Species
      |undefined {
    // TODO aliases, formes, etc?., see Dex.getTemplate
    return Pokedex.forGen(gen)[toID(s)];
  }
}
