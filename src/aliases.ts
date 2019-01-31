import * as aliases from './data/aliases.json';
import {ID, toID} from './id';

const ALIASES: Readonly<{[id: string]: string}> = aliases;

export class Aliases {
  // istanbul ignore next: constructor
  protected constructor() {}

  static get(a: ID|string|undefined): string|undefined {
    return ALIASES[toID(a)];
  }
}
