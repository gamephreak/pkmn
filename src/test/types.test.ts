import {Stats} from '../stats';
import {Types} from '../types';

describe('Types', () => {
  test('chart', () => {
    expect(Types.get()['Fighting']!['Fighting']).toBe(1);
    expect(Types.chart()['Fighting']!['Normal']).toBe(2);
    expect(Types.chart()['Fighting']!['Flying']).toBe(0.5);
    expect(Types.chart()['Fighting']!['Ghost']).toBe(0);

    expect(Types.chart(1)['Dark']).not.toBeDefined();
    expect(Types.chart(1)['Steel']).not.toBeDefined();
    expect(Types.chart(2)['Dark']).toBeDefined();
    expect(Types.chart(2)['Steel']).toBeDefined();
    expect(Types.chart(5)['Fairy']).not.toBeDefined();
    expect(Types.chart(6)['Fairy']).toBeDefined();

    expect(Types.chart(1)['Ice']!['Fire']).toBe(1);
    expect(Types.chart(2)['Ice']!['Fire']).toBe(0.5);

    expect(Types.chart(1)['Ghost']!['Psychic']).toBe(0);
    expect(Types.chart(2)['Ghost']!['Psychic']).toBe(2);

    expect(Types.chart(1)['Poison']!['Bug']).toBe(2);
    expect(Types.chart(2)['Poison']!['Bug']).toBe(1);

    expect(Types.chart(1)['Bug']!['Poison']).toBe(2);
    expect(Types.chart(2)['Bug']!['Poison']).toBe(0.5);

    expect(Types.chart(5)['Ghost']!['Steel']).toBe(0.5);
    expect(Types.chart(5)['Dark']!['Steel']).toBe(0.5);
    expect(Types.chart(6)['Ghost']!['Steel']).toBe(1);
    expect(Types.chart(6)['Dark']!['Steel']).toBe(1);
  });

  test('category', () => {
    expect(Types.category('Ice')).toBe('Special');
    expect(Types.category('Dark')).toBe('Special');
    expect(Types.category('Fairy')).toBe('Special');
    expect(Types.category('Normal')).toBe('Physical');
    expect(Types.category('Steel')).toBe('Physical');
    expect(Types.category('???')).toBe('Physical');
  });

  test('hiddenPowerDVs', () => {
    expect(Types.hiddenPowerDVs('Ice')).toEqual({'def': 13});
    expect(Types.hiddenPowerDVs('Flying')).toEqual({'atk': 12, 'def': 13});
  });

  test('hiddenPowerIVs', () => {
    expect(Types.hiddenPowerIVs('Dragon')).toEqual({'atk': 30});
    expect(Types.hiddenPowerIVs('Ground')).toEqual({'spa': 30, 'spd': 30});
  });

  test('hiddenPower', () => {
    expect(Types.hiddenPower(Stats.dstois(Types.hiddenPowerDVs('Ice')!), 1))
        .not.toBeDefined();

    let hp = Types.hiddenPower(Stats.dstois(Types.hiddenPowerDVs('Ice')!), 2);
    expect(hp).toEqual({type: 'Ice', basePower: 70});
    hp = Types.hiddenPower(Stats.dstois(Types.hiddenPowerDVs('Grass')!), 2);
    expect(hp).toEqual({type: 'Grass', basePower: 70});

    hp = Types.hiddenPower(Types.hiddenPowerIVs('Flying')!, 4);
    expect(hp).toEqual({type: 'Flying', basePower: 70});
    hp = Types.hiddenPower(Types.hiddenPowerIVs('Steel')!, 5);
    expect(hp).toEqual({type: 'Steel', basePower: 70});

    expect(Types.hiddenPower({})).toEqual({type: 'Dark', basePower: 60});
  });
});
