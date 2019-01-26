import {ID, toID} from './id';

const ALIASES: Promise<Readonly<{[id: string]: string}>> =
    import('./data/aliases.json');

export class Aliases {
  // istanbul ignore next
  protected constructor() {}

  static async get(a: ID|string): Promise<string|undefined> {
    const aliases: Readonly<{[id: string]: string}> = await ALIASES;
    return aliases[toID(a)];
  }
}
