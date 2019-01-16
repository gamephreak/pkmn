import {Data} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';

export interface Item extends Data {}

export class Items {
  static forGen(gen: Generation): Readonly<Item[]> {
    return [];  // TODO
  }

  static getItem(i: ID|string, gen: Generation = CURRENT): Item|undefined {
    const id = toID(i);

    return undefined;  // TODO
  }
}
