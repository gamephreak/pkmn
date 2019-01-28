import {Aliases} from './aliases';
import {cache, Data, DataTable, patch} from './data';
import * as adv from './data/adv/abilities.json';
import * as bw from './data/bw/abilities.json';
import * as dpp from './data/dpp/abilities.json';
import * as sm from './data/sm/abilities.json';
import * as xy from './data/xy/abilities.json';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';

export interface Ability extends Data {}

const RBY: DataTable<Ability> = {};
const GSC: DataTable<Ability> = {};
const ADV: DataTable<Ability> = patch(GSC, adv);
const DPP: DataTable<Ability> = patch(ADV, dpp);
const BW: DataTable<Ability> = patch(DPP, bw);
const XY: DataTable<Ability> = patch(BW, xy);
const SM: DataTable<Ability> = patch(XY, sm);

export interface Ability extends Data {}

const ABILITIES: Readonly<Array<DataTable<Ability>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Abilities {
  // istanbul ignore next: constructor
  protected constructor() {}

  static forGen(gen: Generation): DataTable<Ability> {
    return ABILITIES[gen - 1];
  }

  @cache
  static get(
      a: ID|string,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT): Ability
      |undefined {
    const id = toID(a);
    const abilities = Abilities.forGen(gen);

    const alias = Aliases.get(id);
    if (alias) return abilities[toID(alias)];

    return abilities[id];
  }
}
