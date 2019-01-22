import {PerceivedPokemon} from './pp';
import {StatsTable} from './stats';

export class Pokemon implements PerceivedPokemon {
  constructor(
      public ability: string, public hp: number, public maxhp: number,
      public stats: StatsTable, public item: string) {
    this.ability = ability;
    this.hp = hp;
    this.stats = stats;
    this.item = item;
  }

  get abilities() {
    return new Set([this.ability]);
  }

  get items() {
    return new Set([this.item]);
  }

  get minstats() {
    return this.stats;
  }

  get maxstats() {
    return this.stats;
  }

  get approxhp() {
    return (this.hp / this.maxhp).toFixed(2);
  }
}
