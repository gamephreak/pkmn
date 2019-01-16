import * as aliases from './data/aliases.json';
import {ID, toID} from './id';

const ALIASES: {[id: string]: string} = aliases;

export class Aliases {
  static lookup(a: ID|string): string|undefined {
    return ALIASES[toID(a)];
  }
}
