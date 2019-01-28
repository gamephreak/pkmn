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
  spc: number,
  accuracy: number,
  evasion: number
};

export const HP: Stat = 'hp';
export const ATK: Stat = 'atk';
export const DEF: Stat = 'def';
export const SPA: Stat = 'spa';
export const SPD: Stat = 'spd';
export const SPE: Stat = 'spe';

// NOTE: https://www.dragonflycave.com/mechanics/stat-stages
const IDEAL_STAT_BOOSTS: Readonly<number[]> =
    [3 / 2, 4 / 2, 5 / 2, 6 / 2, 7 / 2, 8 / 2];
const APPROX_STAT_BOOSTS: Readonly<number[]> = IDEAL_STAT_BOOSTS;
const IDEAL_STAT_UNBOOSTS: Readonly<number[]> =
    [2 / 3, 2 / 4, 2 / 5, 2 / 6, 2 / 7, 2 / 8];
const APPROX_STAT_UNBOOSTS: Readonly<number[]> =
    [66 / 100, 50 / 100, 40 / 100, 33 / 100, 28 / 100, 25 / 100];

const IDEAL_OTHER_BOOSTS: Readonly<number[]> =
    [4 / 3, 5 / 3, 6 / 3, 7 / 3, 8 / 3, 9 / 3];
const APPROX_OTHER_BOOSTS: Readonly<number[]> = [1.33, 1.66, 2, 2.5, 2.66, 3];
const IDEAL_OTHER_UNBOOSTS: Readonly<number[]> =
    [3 / 4, 3 / 5, 3 / 5, 3 / 7, 3 / 8, 3 / 9];
const APPROX_OTHER_UNBOOSTS: Readonly<number[]> =
    [75 / 100, 60 / 100, 50 / 100, 43 / 100, 36 / 100, 33 / 100];

const STAT_IDS: Readonly<{[id: string]: Stat}> = {
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

export const STAT_NAMES: Readonly<{[stat in Stat]: string}> = {
  hp: 'HP',
  atk: 'Atk',
  def: 'Def',
  spa: 'SpA',
  spd: 'SpD',
  spe: 'Spe'
};

const DISPLAY: Readonly<{[stat: string]: Readonly<[string, string]>}> = {
  hp: [STAT_NAMES.hp, 'HP'],
  atk: [STAT_NAMES.atk, 'Attack'],
  def: [STAT_NAMES.def, 'Defense'],
  spa: [STAT_NAMES.spa, 'Special Attack'],
  spd: [STAT_NAMES.spd, 'Special Defense'],
  spe: [STAT_NAMES.spe, 'Speed'],
  spc: ['Spc', 'Special'],
};

export class Stats {
  // istanbul ignore next: constructor
  protected constructor() {}

  static calc(
      stat: Stat, base: number, iv: number, ev: number, level: number,
      gn?: Generation|Nature, g: Generation = CURRENT) {
    let gen: Generation = g;
    let nature: Nature|undefined = undefined;
    if (gn instanceof Nature) {
      nature = gn;
    } else {
      gen = gn || g;
    }

    return gen < 3 ? Stats.calcRBY(stat, base, iv, ev, level) :
                     Stats.calcADV(stat, base, iv, ev, level, nature);
  }

  static get(s: ID|string): Stat|undefined {
    return STAT_IDS[s];
  }

  static fromString(s: string): Stat|undefined {
    return Stats.get(s);
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

  static fillIVs(pivs: Readonly<Partial<StatsTable>>): StatsTable {
    return Stats.fill(pivs, 31);
  }

  static fillEVs(
      pevs: Readonly<Partial<StatsTable>>,
      gen: Generation = CURRENT): StatsTable {
    return Stats.fill(pevs, gen < 3 ? 252 : 0);
  }

  static itod(iv: number): number {
    return Math.floor(iv / 2);
  }

  static dtoi(dv: number): number {
    return dv * 2;  // + 1;
  }

  static istods(ivs: Readonly<Partial<StatsTable>>): Partial<StatsTable> {
    const dvs: Partial<StatsTable> = {};
    let iv: Stat;
    for (iv in ivs) {
      dvs[iv] = Stats.itod(ivs[iv]!);
    }
    return dvs;
  }

  static dstois(dvs: Readonly<Partial<StatsTable>>): Partial<StatsTable> {
    const ivs: Partial<StatsTable> = {};
    let dv: Stat;
    for (dv in dvs) {
      ivs[dv] = Stats.dtoi(dvs[dv]!);
    }
    return ivs;
  }

  static boost(b: Boost, n: number, gen: Generation = CURRENT): number {
    if (n > 6) {
      n = 6;
    } else if (n < -6) {
      n = -6;
    }
    const abs = Math.abs(n);
    if (abs === 0) return 1;

    if (gen === 1) {
      // RBY uses the same (nroken) tanles for accuracy/evasion as stats.
      return (n > 0 ? APPROX_STAT_BOOSTS : APPROX_STAT_UNBOOSTS)[abs - 1];
    }

    switch (b) {
      case 'accuracy':
        if (gen >= 5) {
          return (n > 0 ? IDEAL_OTHER_BOOSTS : IDEAL_OTHER_UNBOOSTS)[abs - 1];
        }
        if (gen === 2 && n === 4) {
          return 2.33;
        }
        return (n > 0 ? APPROX_OTHER_BOOSTS : APPROX_OTHER_UNBOOSTS)[abs - 1];
      case 'evasion':
        // NOTE: we purposefully swap BOOSTS and UNBOOSTS for evasion!
        if (gen >= 5) {
          return (n > 0 ? IDEAL_OTHER_UNBOOSTS : IDEAL_OTHER_BOOSTS)[abs - 1];
        }
        if (gen === 2 && n === -4) {
          return 2.33;
        }
        return (n > 0 ? APPROX_OTHER_UNBOOSTS : APPROX_OTHER_BOOSTS)[abs - 1];
      default:
        return (n > 0 ? IDEAL_STAT_BOOSTS : IDEAL_STAT_UNBOOSTS)[abs - 1];
    }
  }

  // NOTE: https://www.dragonflycave.com/mechanics/gen-i-stat-modification
  static modify(s: number, mod: number, gen: Generation = CURRENT): number {
    s = s * mod;
    return (gen < 3) ? Math.min(999, Math.max(1, s)) : s;
  }

  static getHPDV(pivs: Readonly<Partial<StatsTable>>): number {
    const ivs: StatsTable = Stats.fillIVs(pivs);
    return (Stats.itod(ivs.atk) % 2) * 8 + (Stats.itod(ivs.def) % 2) * 4 +
        (Stats.itod(ivs.spe) % 2) * 2 + (Stats.itod(ivs.spa) % 2);
  }

  private static fill(p: Readonly<Partial<StatsTable>>, val: number):
      StatsTable {
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
