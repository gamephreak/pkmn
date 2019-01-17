import {Generation} from './gen';
import {PokemonSet} from './set';
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
  static unpack(buf: string): Team {
    return Teams.unpackTeam(buf);
  }

  static unpackTeam(buf: string): Team {
    return [];  // TODO
  }

  static importTeam(buf: string): Team {
    return [];  // TODO
  }

  static fromJSON(json: string): Team {
    return [];  // TODO
  }

  static fromString(str: string): Team[] {
    return [];  // TODO
  }
}
