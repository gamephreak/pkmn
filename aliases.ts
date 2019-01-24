import * as aliases from './data/aliases.json';
import {ID, toID} from './id';

const ALIASES: Readonly<{[id: string]: string}> = aliases;

export class Aliases {
  private constructor() {}

  static lookup(a: ID|string): string|undefined {
    return ALIASES[toID(a)];
  }
}
