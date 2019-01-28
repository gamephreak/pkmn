import {ID, toID} from './id';
import * as stat from './stats';

export class Nature {
  readonly id: ID;
  constructor(
      readonly name: string, readonly plus?: stat.Stat,
      readonly minus?: stat.Stat) {
    this.id = toID(name);
    this.name = name;
    this.plus = plus;
    this.minus = minus;
  }

  toString(): string {
    return this.name;
  }
}

const NATURES: Readonly<{[id: string]: Nature}> = {
  'adamant': new Nature('Adamant', stat.ATK, stat.SPA),
  'bashful': new Nature('Bashful'),
  'bold': new Nature('Bold', stat.DEF, stat.ATK),
  'brave': new Nature('Brave', stat.ATK, stat.SPE),
  'calm': new Nature('Calm', stat.SPD, stat.ATK),
  'careful': new Nature('Careful', stat.SPD, stat.SPA),
  'docile': new Nature('Docile'),
  'gentle': new Nature('Gentle', stat.SPD, stat.DEF),
  'hardy': new Nature('Hardy'),
  'hasty': new Nature('Hasty', stat.SPE, stat.DEF),
  'impish': new Nature('Impish', stat.DEF, stat.SPA),
  'jolly': new Nature('Jolly', stat.SPE, stat.SPA),
  'lax': new Nature('Lax', stat.DEF, stat.SPD),
  'lonely': new Nature('Lonely', stat.ATK, stat.DEF),
  'mild': new Nature('Mild', stat.SPA, stat.DEF),
  'modest': new Nature('Modest', stat.SPA, stat.ATK),
  'naive': new Nature('Naive', stat.SPE, stat.SPD),
  'naughty': new Nature('Naughty', stat.ATK, stat.SPD),
  'quiet': new Nature('Quiet', stat.SPA, stat.SPE),
  'quirky': new Nature('Quirky'),
  'rash': new Nature('Rash', stat.SPA, stat.SPD),
  'relaxed': new Nature('Relaxed', stat.DEF, stat.SPE),
  'sassy': new Nature('Sassy', stat.SPD, stat.SPE),
  'serious': new Nature('Serious'),
  'timid': new Nature('Timid', stat.SPE, stat.ATK),
};

export class Natures {
  // istanbul ignore next: constructor
  protected constructor() {}

  static get(n: ID|string): Nature|undefined {
    return NATURES[toID(n)];
  }

  static fromString(s: string): Nature|undefined {
    return Natures.get(s);
  }
}
