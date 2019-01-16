import {CURRENT, Generation} from './gen';
import {Category} from './moves';
import {Stat, Stats, StatsTable} from './stats';

export type Type = '???'|'Normal'|'Grass'|'Fire'|'Water'|'Electric'|'Ice'|
    'Flying'|'Bug'|'Poison'|'Ground'|'Rock'|'Fighting'|'Psychic'|'Ghost'|
    'Dragon'|'Dark'|'Steel'|'Fairy';

export type TypeChart = {
  [type in Type]?: {[type in Type]?: number}
};

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

const HIDDEN_POWER_TYPES: Type[] = [
  'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'
];

const HIDDEN_POWERS:
    {[type in Type]?: {ivs: Partial<StatsTable>, dvs: Partial<StatsTable>}} = {
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


export class Types {
  static chart(gen: Generation = CURRENT): TypeChart {
    return {};  // TODO
  }

  static hiddenPower(pivs: Partial<StatsTable>, gen: Generation = CURRENT):
      {type: Type, basePower: number}|undefined {
    if (gen < 2) {
      return undefined;
    }

    let t: Type;
    let basePower: number;

    const ivs: StatsTable = Stats.fillIVs(pivs);
    if (gen === 2) {
      t = HIDDEN_POWER_TYPES[4 * (Stats.itod(ivs.atk) % 4) + (Stats.itod(ivs.def) % 4)];
      basePower = 31;  // TODO
    } else {
      let val = 0;
      let i = 1;

      let s: Stat;
      for (s in ivs) {
        val += i * (ivs[s] % 2);
        i *= 2;
      }
      t = HIDDEN_POWER_TYPES[Math.floor(val * 15 / 63)];
      basePower = 31;  // TODO
    }

    if (gen > 5) {
      basePower = 60;
    }
    return {type: t, basePower};
  }

  static hiddenPowerDVs(t: Type): Partial<StatsTable>|undefined {
    const hp = HIDDEN_POWERS[t];
    return hp && hp.dvs;
  }

  static hiddenPowerIVs(t: Type): Partial<StatsTable>|undefined {
    const hp = HIDDEN_POWERS[t];
    return hp && hp.ivs;
  }

  static category(t: Type): Category {
    return SPECIAL[t] ? 'Special' : 'Physical';
  }
}
