import * as gsc from './data/gsc/types.json';
import * as rby from './data/rby/types.json';
import * as xy from './data/xy/types.json';
import {extend} from './extend';
import {CURRENT, Generation} from './gen';
import {Category} from './moves';
import {Stat, Stats, StatsTable} from './stats';

export type Type = '???'|'Normal'|'Grass'|'Fire'|'Water'|'Electric'|'Ice'|
    'Flying'|'Bug'|'Poison'|'Ground'|'Rock'|'Fighting'|'Psychic'|'Ghost'|
    'Dragon'|'Dark'|'Steel'|'Fairy';

export type TypeChart =
    Readonly<{[type in Type]?: Readonly<{[type in Type]?: number}>}>;

const RBY: TypeChart = rby;
const GSC: TypeChart = extend(true, {}, RBY, gsc);
const ADV: TypeChart = GSC;
const DPP: TypeChart = GSC;
const BW: TypeChart = GSC;
const XY: TypeChart = extend(true, {}, BW, xy);
const SM: TypeChart = XY;

const SPECIAL: {[type in Type]?: 1} = {
  'Grass': 1,
  'Fire': 1,
  'Water': 1,
  'Electric': 1,
  'Ice': 1,
  'Dragon': 1,
  'Psychic': 1,
  'Dark': 1,
  'Fairy': 1
};

const HIDDEN_POWER_TYPES: Readonly<Type[]> = [
  'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'
];

const HIDDEN_POWERS: Readonly<{
  [type in Type]?: {
    ivs: Readonly<Partial<StatsTable>>,
    dvs: Readonly<Partial<StatsTable>>
  }
}> = {
  'Bug': {
    ivs: {'atk': 30, 'def': 30, 'spd': 30},
    dvs: {'atk': 13, 'def': 13},
  },
  'Dark': {
    ivs: {},
    dvs: {},
  },
  'Dragon': {
    ivs: {'atk': 30},
    dvs: {'def': 14},
  },
  'Electric': {
    ivs: {'spa': 30},
    dvs: {'atk': 14},
  },
  'Fighting': {
    ivs: {'def': 30, 'spa': 30, 'spd': 30, 'spe': 30},
    dvs: {'atk': 12, 'def': 12},
  },
  'Fire': {
    ivs: {'atk': 30, 'spa': 30, 'spe': 30},
    dvs: {'atk': 14, 'def': 12},
  },
  'Flying': {
    ivs: {'hp': 30, 'atk': 30, 'def': 30, 'spa': 30, 'spd': 30},
    dvs: {'atk': 12, 'def': 13},
  },
  'Ghost': {
    ivs: {'def': 30, 'spd': 30},
    dvs: {'atk': 13, 'def': 14},
  },
  'Grass': {
    ivs: {'atk': 30, 'spa': 30},
    dvs: {'atk': 14, 'def': 14},
  },
  'Ground': {
    ivs: {'spa': 30, 'spd': 30},
    dvs: {'atk': 12},
  },
  'Ice': {
    ivs: {'atk': 30, 'def': 30},
    dvs: {'def': 13},
  },
  'Poison': {
    ivs: {'def': 30, 'spa': 30, 'spd': 30},
    dvs: {'atk': 12, 'def': 14},
  },
  'Psychic': {
    ivs: {'atk': 30, 'spe': 30},
    dvs: {'def': 12},
  },
  'Rock': {
    ivs: {'def': 30, 'spd': 30, 'spe': 30},
    dvs: {'atk': 13, 'def': 12},
  },
  'Steel': {
    ivs: {'spd': 30},
    dvs: {'atk': 13},
  },
  'Water': {
    ivs: {'atk': 30, 'def': 30, 'spa': 30},
    dvs: {'atk': 14, 'def': 13},
  },
};

const TYPE_CHARTS: Readonly<TypeChart[]> = [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Types {
  // istanbul ignore next: constructor
  protected constructor() {}

  static get(gen: Generation = CURRENT): TypeChart {
    return TYPE_CHARTS[gen - 1];
  }

  static chart(gen: Generation = CURRENT): TypeChart {
    return Types.get(gen);
  }

  static hiddenPower(
      pivs: Readonly<Partial<StatsTable>>,
      gen: Generation = CURRENT): {type: Type, basePower: number}|undefined {
    if (gen < 2) {
      return undefined;
    }

    let t: Type;
    let basePower: number;

    const ivs: StatsTable = Stats.fillIVs(pivs);
    if (gen === 2) {
      const atkDV = Stats.itod(ivs.atk);
      const defDV = Stats.itod(ivs.def);
      const speDV = Stats.itod(ivs.spe);
      const spcDV = Stats.itod(ivs.spa);
      t = HIDDEN_POWER_TYPES[4 * (atkDV % 4) + (defDV % 4)];
      basePower = Math.floor(
          (5 *
               ((spcDV >> 3) + (2 * (speDV >> 3)) + (4 * (defDV >> 3)) +
                (8 * (atkDV >> 3))) +
           (spcDV % 4)) /
              2 +
          31);
    } else {
      let hpType = 0, hpPower = 0;
      let i = 1;

      let s: Stat;
      for (s in ivs) {
        hpType += i * (ivs[s] % 2);
        hpPower += i * (Math.floor(ivs[s] / 2) % 2);
        i *= 2;
      }
      t = HIDDEN_POWER_TYPES[Math.floor(hpType * 15 / 63)];
      basePower = (gen < 6) ? Math.floor(hpPower * 40 / 63) + 30 : 60;
    }

    return {type: t, basePower};
  }

  static hiddenPowerDVs(t: Type): Readonly<Partial<StatsTable>>|undefined {
    const hp = HIDDEN_POWERS[t];
    return hp && hp.dvs;
  }

  static hiddenPowerIVs(t: Type): Readonly<Partial<StatsTable>>|undefined {
    const hp = HIDDEN_POWERS[t];
    return hp && hp.ivs;
  }

  static category(t: Type): Category {
    return SPECIAL[t] ? 'Special' : 'Physical';
  }
}
