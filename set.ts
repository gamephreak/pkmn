import {StatsTable} from './stats';

export class PokemonSet {
  constructor(
      readonly name: string, readonly species: string, readonly item: string,
      readonly ability: string, readonly moves: string[],
      readonly nature: string, readonly gender: string,
      readonly evs: StatsTable, readonly ivs: StatsTable,
      readonly level: number, readonly shiny?: boolean,
      readonly happiness?: number, readonly pokeball?: string,
      readonly hpType?: string) {
    this.name = name;
    this.species = species;
    this.item = item;
    this.ability = ability;
    this.moves = moves;
    this.nature = nature;
    this.gender = gender;
    this.evs = evs;
    this.ivs = ivs;
    this.level = level;
    this.shiny = shiny;
    this.happiness = happiness;
    this.pokeball = pokeball;
    this.hpType = hpType;
  }

  pack(): string {
    return this.packSet();
  }

  packSet(): string {
    return '';  // TODO
  }

  exportSet(): string {
    return '';  // TODO
  }

  toString(): string {
    return this.exportSet();
  }

  toJSON(): string {
    return JSON.stringify(this);
  }
}

export class Sets {
  static unpack(buf: string): PokemonSet {
    return this.unpackSet(buf);
  }

  static unpackSet(buf: string): PokemonSet {
    return undefined;  // TODO
  }

  static importSet(buf: string): PokemonSet {
    return undefined;  // TODO
  }

  static fromJSON(json: string): PokemonSet {
    return undefined;  // TODO
  }

  static fromString(str: string): PokemonSet {
    return undefined;  // TODO
  }
}
