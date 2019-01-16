import {Data, DataTable} from './data';
import * as adv from './data/adv/abilities.json';
import * as bw from './data/bw/abilities.json';
import * as dpp from './data/dpp/abilities.json';
import * as sm from './data/sm/abilities.json';
import * as xy from './data/xy/abilities.json';
import {extend} from './extend';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';

export interface Ability extends Data {}

const RBY: DataTable<Ability> = {};
const GSC: DataTable<Ability> = {};
const ADV: DataTable<Ability> = extend(true, {}, GSC, adv);
const DPP: DataTable<Ability> = extend(true, {}, ADV, dpp);
const BW: DataTable<Ability> = extend(true, {}, DPP, bw);
const XY: DataTable<Ability> = extend(true, {}, BW, xy);
const SM: DataTable<Ability> = extend(true, {}, XY, sm);

const ABILITIES: Array<DataTable<Ability>> = [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Abilities {
  static forGen(gen: Generation): DataTable<Ability> {
    return ABILITIES[gen - 1];
  }

  static getAbility(a: ID|string, gen: Generation = CURRENT): Ability
      |undefined {
    return Abilities.forGen(gen)[toID(a)];
  }
}
