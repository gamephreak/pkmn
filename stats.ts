import {extend} from './extend';
import {CURRENT, Generation} from './gen';
import {ID} from './id';
import {Nature} from './natures';

export type Stat = 'hp'|'atk'|'def'|'spa'|'spd'|'spe';
export type Boost = 'atk'|'def'|'spa'|'spd'|'spe'|'evasion'|'accuracy'|'spc';

export type StatsTable = {
  hp: number,
  atk: number,
  def: number,
  spe: number,
  spa: number,
  spd: number,
};

export type BoostsTable = {
  atk: number,
  def: number,
  spa: number,
  spd: number,
  spe: number,
  accuracy: number,
  evasion: number
};

export const HP: Stat = 'hp';
export const ATK: Stat = 'atk';
export const DEF: Stat = 'def';
export const SPA: Stat = 'spa';
export const SPD: Stat = 'spd';
export const SPE: Stat = 'spe';

const BOOSTS = [1, 1.5, 2, 2.5, 3, 3.5, 4];

const STAT_IDS: {[id: string]: Stat} = {
  'HP': 'hp',
  'hp': 'hp',
  'Atk': 'atk',
  'atk': 'atk',
  'Def': 'def',
  'def': 'def',
  'SpA': 'spa',
  'SAtk': 'spa',
  'SpAtk': 'spa',
  'spa': 'spa',
  'spc': 'spa',
  'Spc': 'spa',
  'SpD': 'spd',
  'SDef': 'spd',
  'SpDef': 'spd',
  'spd': 'spd',
  'Spe': 'spe',
  'Spd': 'spe',
  'spe': 'spe',
};

const DISPLAY: {[stat: string]: [string, string]} = {
  hp: ['HP', 'HP'],
  atk: ['Atk', 'Attack'],
  def: ['Def', 'Defense'],
  spa: ['SpA', 'Special Attack'],
  spd: ['SpD', 'Special Defense'],
  spe: ['Spe', 'Speed'],
  spc: ['Spc', 'Special'],
};

export class Stats {
  static calc(
      gen: Generation, stat: Stat, base: number, iv: number, ev: number,
      level: number, nature?: Nature) {
    return gen < 3 ? Stats.calcRBY(stat, base, iv, ev, level) :
                     Stats.calcADV(stat, base, iv, ev, level, nature);
  }

  static getStat(s: ID|string): Stat|undefined {
    return STAT_IDS[s];
  }

  static fromString(s: string): Stat|undefined {
    return Stats.getStat(s);
  }

  static display(str: string, gen: Generation = CURRENT, full = false): string {
    let s: Stat|'spc'|undefined = STAT_IDS[str];
    if (!s) {
      return str;
    }

    if (gen === 1 && s === SPA) {
      s = 'spc';
    }
    return DISPLAY[s][+full];
  }

  static fillIVs(pivs: Partial<StatsTable>): StatsTable {
    return Stats.fill(pivs, 31);
  }

  static fillEVs(pevs: Partial<StatsTable>, gen: Generation = CURRENT):
      StatsTable {
    return Stats.fill(pevs, gen < 3 ? 252 : 0);
  }

  static itod(iv: number): number {
    return Math.floor(iv / 2);
  }

  static dtoi(dv: number): number {
    return dv * 2 + 1;
  }

  static istods(ivs: Partial<StatsTable>): Partial<StatsTable> {
    const dvs: Partial<StatsTable> = {};
    let iv: Stat;
    for (iv in ivs) {
      dvs[iv] = Stats.itod(ivs[iv]!);
    }
    return dvs;
  }

  static dstois(dvs: Partial<StatsTable>): Partial<StatsTable> {
    const ivs: Partial<StatsTable> = {};
    let dv: Stat;
    for (dv in dvs) {
      ivs[dv] = Stats.dtoi(dvs[dv]!);
    }
    return ivs;
  }

  static boost(b: number): number {
    if (b > 6) {
      b = 6;
    } else if (b < -6) {
      b = -6;
    }
    const boost = BOOSTS[Math.abs(b)];
    return b >= 0 ? boost : -boost;
  }

  static getHPDV(pivs: Partial<StatsTable>): number {
    const ivs: StatsTable = Stats.fillIVs(pivs);
    return (Stats.itod(ivs.atk) % 2) * 8 + (Stats.itod(ivs.def) % 2) * 4 +
        (Stats.itod(ivs.spe) % 2) * 2 + (Stats.itod(ivs.spa) % 2);
  }

  private static fill(p: Partial<StatsTable>, val: number): StatsTable {
    // NOTE: order is importer for calculating Hidden Power.
    return extend(
        true, {}, {hp: val, atk: val, def: val, spe: val, spa: val, spd: val},
        p);
  }

  private static calcRBY(
      stat: Stat, base: number, iv: number, ev: number, level: number) {
    // BUG: we ignore EVs - do we care about converting ev to stat experience?
    const dv = Stats.itod(iv);
    if (stat === HP) {
      return Math.floor(((base + dv) * 2 + 63) * level / 100) + level + 10;
    } else {
      return Math.floor(((base + dv) * 2 + 63) * level / 100) + 5;
    }
  }

  private static calcADV(
      stat: Stat, base: number, iv: number, ev: number, level: number,
      nature?: Nature) {
    if (stat === HP) {
      return base === 1 ?
          base :
          Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level / 100) +
              level + 10;
    } else {
      const n: number = !nature ?
          1 :
          nature.plus === stat ? 1.1 : nature.minus === stat ? 0.9 : 1;
      return Math.floor(
          (Math.floor((base * 2 + iv + Math.floor(ev / 4)) * level / 100) + 5) *
          n);
    }
  }
}
