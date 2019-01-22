import {ObservedPokemon} from './op';
import {StatsTable} from './stats';

export class PerceivedPokemon implements ObservedPokemon {
  constructor(
      public abilities: Set<string>, public items: Set<string>,
      public minstats: StatsTable, public maxstats: StatsTable,
      public approxhp: string) {
    this.abilities = abilities;
    this.items = items;
    this.minstats = minstats;
    this.maxstats = maxstats;
    this.approxhp = approxhp;
  }

  get ability() {
    return this.abilities.size === 1 ? this.abilities.values().next().value :
                                       undefined;
  }

  get item() {
    return this.items.size === 1 ? this.items.values().next().value : undefined;
  }
}
