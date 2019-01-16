import {Abilities, Ability} from '../abilities';

describe('Abilities', () => {
  test('forGen', () => {
    expect(Object.keys(Abilities.forGen(1)).length).toBe(0);
    expect(Object.keys(Abilities.forGen(2)).length).toBe(0);
    expect(Object.keys(Abilities.forGen(3)).length).toBe(76 + 1);
    expect(Object.keys(Abilities.forGen(4)).length).toBe(76 + 1 + 47 + 2);
    expect(Object.keys(Abilities.forGen(5)).length).toBe(76 + 1 + 47 + 2 + 41);
    expect(Object.keys(Abilities.forGen(6)).length)
        .toBe(76 + 1 + 47 + 2 + 41 + 27);
    expect(Object.keys(Abilities.forGen(7)).length)
        .toBe(76 + 1 + 47 + 2 + 41 + 27 + 42);
  });

  test('getAbility', () => {
    expect(Abilities.getAbility('foo')).toBe(undefined);
    expect(Abilities.getAbility('Flash Fire (Activated)')!.isNonstandard)
        .toBe(true);
    expect(Abilities.getAbility('Beast Boost', 6)).toBe(undefined);
    expect(Abilities.getAbility('Beast Boost', 7)!.name).toBe('Beast Boost');
    expect(Abilities.getAbility('Shield Dust', 3))
        .toEqual(Abilities.getAbility('Shield Dust', 4));
    expect(Abilities.getAbility('Lightning Rod', 3))
        .not.toEqual(Abilities.getAbility('Lightning Rod', 4));
  });
});
