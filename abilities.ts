import {Aliases} from './aliases';
import {Data, DataTable, patch} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';

export interface Ability extends Data {}

const RBY: Promise<DataTable<Ability>> = Promise.resolve({});
const GSC: Promise<DataTable<Ability>> = Promise.resolve({});
const ADV: Promise<DataTable<Ability>> =
    patch(GSC, import('./data/adv/abilities.json'));
const DPP: Promise<DataTable<Ability>> =
    patch(ADV, import('./data/dpp/abilities.json'));
const BW: Promise<DataTable<Ability>> =
    patch(DPP, import('./data/bw/abilities.json'));
const XY: Promise<DataTable<Ability>> =
    patch(BW, import('./data/xy/abilities.json'));
const SM: Promise<DataTable<Ability>> =
    patch(XY, import('./data/sm/abilities.json'));

const ABILITIES: Readonly<Array<Promise<DataTable<Ability>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Abilities {
  // istanbul ignore next
  private constructor() {}

  static forGen(gen: Generation): Promise<DataTable<Ability>> {
    return ABILITIES[gen - 1];
  }

  static async getAbility(a: ID|string, gen: Generation = CURRENT):
      Promise<Ability|undefined> {
    const id = toID(a);
    const abilities = await Abilities.forGen(gen);

    const alias = await Aliases.lookup(id);
    if (alias) return abilities[toID(alias)];

    return abilities[id];
  }
}
