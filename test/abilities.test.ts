import {Abilities, Ability} from '../abilities';

describe('Abilities', () => {
  test('forGen', () => {
    expect(Object.keys(Abilities.forGen(1)).length).toBe(0);
    expect(Object.keys(Abilities.forGen(2)).length).toBe(0);
    expect(Object.keys(Abilities.forGen(3)).length).toBe(77);
    expect(Object.keys(Abilities.forGen(4)).length).toBe(126);  // 124
    expect(Object.keys(Abilities.forGen(5)).length).toBe(167);  // 165
    expect(Object.keys(Abilities.forGen(6)).length).toBe(194);  // 192
    expect(Object.keys(Abilities.forGen(7)).length).toBe(236);  // 234

    const dpp = Abilities.forGen(4);
    let ns = 0;
    for (const k in dpp) {
      if (dpp[k].isNonstandard) {
        ns++;
      }
    }
    expect(ns).toBe(2);
  });

  test('getAbility', () => {
    expect(Abilities.getAbility('foo')).toBe(undefined);
    expect(Abilities.getAbility('Beast Boost', 6)).toBe(undefined);
    expect(Abilities.getAbility('Beast Boost', 7)!.name).toBe('Beast Boost');
    expect(Abilities.getAbility('Flash Fire', 3))
        .toEqual(Abilities.getAbility('Flash Fire', 4));
    expect(Abilities.getAbility('Lightning Rod', 3))
        .not.toEqual(Abilities.getAbility('Lightning Rod', 5));
  });
});
