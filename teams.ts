import {Generation} from './gen';
import {_unpack, PokemonSet} from './set';
import {Tier, Tiers} from './tiers';

export class Team {
  constructor(
      readonly team: PokemonSet[], readonly format?: string,
      readonly name?: string, readonly folder?: string) {
    this.team = team;
    this.format = format;
    this.name = name;
    this.folder = folder;
  }

  gen(): Generation|undefined {
    if (!this.format) return undefined;
    // BUG: this will break in ~10 years when gen10 gets released...
    return (this.format.slice(0, 3) !== 'gen' ? 6 : Number(this.format[3])) as
        Generation;
  }

  tier(): Tier|undefined {
    if (!this.format) return undefined;
    // BUG: this will break in ~10 years when gen10 gets released...
    return this.format.slice(0, 3) === 'gen' ?
        Tiers.fromString(this.format.slice(4)) :
        Tiers.fromString(this.format);
  }

  pack(): string {
    return this.packTeam();
  }

  packTeam(): string {
    return '';  // TODO
  }

  exportTeam(): string {
    return '';  // TODO
  }

  toString(): string {
    return this.exportTeam();
  }

  toJSON(): string {
    return '';  // TODO
  }
}

export class Teams {
  static unpack(buf: string): Team|undefined {
    return Teams.unpackTeam(buf);
  }

  static unpackTeam(buf: string): Team|undefined {
    if (!buf) return undefined;
    if (buf.charAt(0) === '[' && buf.charAt(buf.length - 1) === ']') {
      return Teams.fromJSON(buf);
    }

    const team: PokemonSet[] = [];
    let i = 0, j = 0;

    while (true) {
      const r = _unpack(buf, i, j);
      if (!r.set) return undefined;

      team.push(r.set);
      i = r.i;
      j = r.j;

      if (j < 0) break;
      i = j + 1;
    }

    return new Team(team);
  }

  static importTeam(buf: string): Team|undefined {
    return undefined;  // TODO
  }

  static fromJSON(json: string): Team|undefined {
    if (json.charAt(0) !== '[' || json.charAt(json.length - 1) !== ']') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    const team: PokemonSet[] = JSON.parse(json);
    return new Team(team);
  }

  static fromString(str: string): Team|undefined {
    return Teams.importTeam(str);
  }

  // TODO exportAll/imporAll
}
