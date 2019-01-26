import {Generation} from '../gen';
import {Natures} from '../natures';
import {Stat, Stats, StatsTable} from '../stats';

describe('Stats', () => {
  test('fromString', () => {
    expect(Stats.fromString('foo')).not.toBeDefined();
    expect(Stats.fromString('Atk')).toBe('atk');
    expect(Stats.fromString('Spc')).toBe('spa');
    expect(Stats.fromString('SpDef')).toBe('spd');
    expect(Stats.fromString('SAtk')).toBe('spa');
  });

  test('display', () => {
    expect(Stats.display('foo')).toBe('foo');
    expect(Stats.display('Atk')).toBe('Atk');
    expect(Stats.display('Spc')).toBe('SpA');
    expect(Stats.display('SpDef')).toBe('SpD');
    expect(Stats.display('SAtk', 7, true)).toBe('Special Attack');
    expect(Stats.display('SAtk', 1, true)).toBe('Special');
  });

  test('fillIVs', () => {
    expect(Stats.fillIVs({atk: 10, def: 12, spd: 15}))
        .toEqual({hp: 31, atk: 10, def: 12, spe: 31, spa: 31, spd: 15});
  });

  test('fillEVs', () => {
    expect(Stats.fillEVs({spa: 200, spe: 252}))
        .toEqual({hp: 0, atk: 0, def: 0, spe: 252, spa: 200, spd: 0});
    expect(Stats.fillEVs({spa: 200, def: 240}, 1))
        .toEqual({hp: 252, atk: 252, def: 240, spe: 252, spa: 200, spd: 252});
  });

  test('dstois', () => {
    expect(Stats.dstois({atk: 10, def: 12, spd: 15}))
        .toEqual({atk: 20, def: 24, spd: 30});
  });

  test('istods', () => {
    expect(Stats.istods({hp: 26, atk: 12, spe: 31}))
        .toEqual({hp: 13, atk: 6, spe: 15});
  });

  test('boost', () => {
    expect(Stats.boost('atk', 3)).toBe(2.5);
    expect(Stats.boost('def', 4)).toBe(3);
    expect(Stats.boost('spc', 10)).toBe(4);
    expect(Stats.boost('spd', -5)).toBe(2 / 7);
    expect(Stats.boost('spa', 0)).toBe(1);
    expect(Stats.boost('spe', -100)).toBe(0.25);

    expect(Stats.boost('atk', 3, 1)).toBe(2.5);
    expect(Stats.boost('def', 4, 1)).toBe(3);
    expect(Stats.boost('spd', -5, 1)).toBe(0.28);
    expect(Stats.boost('spd', -4, 1)).toBe(0.33);
    expect(Stats.boost('spe', -100, 1)).toBe(0.25);

    expect(Stats.boost('accuracy', 3)).toBe(2);
    expect(Stats.boost('evasion', 4)).toBe(3 / 7);
    expect(Stats.boost('evasion', 10)).toBe(1 / 3);
    expect(Stats.boost('accuracy', -5)).toBe(3 / 8);
    expect(Stats.boost('evasion', -6)).toBe(3);
    expect(Stats.boost('accuracy', -100)).toBe(1 / 3);

    expect(Stats.boost('accuracy', 3, 2)).toBe(2);
    expect(Stats.boost('evasion', 4, 2)).toBe(0.43);
    expect(Stats.boost('evasion', 10, 2)).toBe(0.33);
    expect(Stats.boost('accuracy', -5, 2)).toBe(0.36);
    expect(Stats.boost('evasion', 0, 2)).toBe(1);
    expect(Stats.boost('accuracy', -100, 2)).toBe(0.33);

    // Weird GSC multiplier
    expect(Stats.boost('accuracy', 4, 2)).toBe(2.33);
    expect(Stats.boost('accuracy', 4, 4)).toBe(2.5);
    expect(Stats.boost('evasion', -4, 2)).toBe(2.33);
    expect(Stats.boost('evasion', -4, 3)).toBe(2.5);
  });

  test('modify', () => {
    expect(Stats.modify(300, 4)).toBe(1200);
    expect(Stats.modify(300, 4, 2)).toBe(999);
    expect(Stats.modify(2, 0.25)).toBe(0.5);
    expect(Stats.modify(2, 0.25, 1)).toBe(1);
  });

  test('getHPDV', () => {
    expect(Stats.getHPDV({'spa': Stats.dtoi(15), 'spe': Stats.dtoi(15)}))
        .toBe(15);
    expect(Stats.getHPDV({
      'atk': Stats.dtoi(5),
      'def': Stats.dtoi(15),
      'spa': Stats.dtoi(13),
      'spe': Stats.dtoi(13)
    })).toBe(15);
    expect(Stats.getHPDV({
      'def': Stats.dtoi(3),
      'spa': Stats.dtoi(11),
      'spe': Stats.dtoi(10)
    })).toBe(13);
  });

  test('calc', () => {
    const rby: StatsTable =
        {hp: 403, atk: 298, def: 298, spa: 298, spd: 298, spe: 298};
    const adv: StatsTable =
        {hp: 404, atk: 328, def: 299, spa: 269, spd: 299, spe: 299};

    for (let gen = 1; gen <= 7; gen++) {
      let stat: Stat;
      for (stat in rby) {
        const s = Stats.calc(
            stat, 100, 31, 252, 100, Natures.fromString('Adamant'),
            gen as Generation);
        if (gen < 3) {
          expect(s).toBe(rby[stat]);
        } else {
          expect(s).toBe(adv[stat]);
        }
      }
    }

    // Shedinja
    expect(Stats.calc('hp', 1, 31, 252, 100, Natures.fromString('Jolly'), 5))
        .toBe(1);
    // no nature
    expect(Stats.calc('atk', 100, 31, 252, 100)).toBe(299);
  });
});
