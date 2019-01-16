import {Data} from './data';
import {Generation} from './gen';
import {ID, toID} from './id';
export interface Ability extends Data {}

export class Abilities {
  static forGen(gen: Generation): Readonly<Ability[]> {
    return [];  // TODO
  }

  static getAbility(a: ID|string, gen?: Generation): Ability|undefined {
    const id = toID(a);

    return undefined;  // TODO
  }
}
