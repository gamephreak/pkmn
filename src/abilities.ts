import {Aliases} from './aliases';
import {cache} from './cache';
import {Data, DataTable} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';

export interface Ability extends Data {}

const RBY: Promise<DataTable<Ability>> = Promise.resolve({});
const GSC: Promise<DataTable<Ability>> = Promise.resolve({});
const ADV: Promise<DataTable<Ability>> =
    Data.patch(GSC, import('./data/adv/abilities.json'));
const DPP: Promise<DataTable<Ability>> =
    Data.patch(ADV, import('./data/dpp/abilities.json'));
const BW: Promise<DataTable<Ability>> =
    Data.patch(DPP, import('./data/bw/abilities.json'));
const XY: Promise<DataTable<Ability>> =
    Data.patch(BW, import('./data/xy/abilities.json'));
const SM: Promise<DataTable<Ability>> =
    Data.patch(XY, import('./data/sm/abilities.json'));

const ABILITIES: Readonly<Array<Promise<DataTable<Ability>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Abilities {
  // istanbul ignore next: constructor
  protected constructor() {}

  static forGen(gen: Generation): Promise<DataTable<Ability>> {
    return ABILITIES[gen - 1];
  }

  @cache
  static async get(
      a: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT):
      Promise<Ability|undefined> {
    const id = toID(a);
    const abilities = await Abilities.forGen(gen);

    const alias = await Aliases.get(id);
    if (alias) return abilities[toID(alias)];

    return abilities[id];
  }
}
