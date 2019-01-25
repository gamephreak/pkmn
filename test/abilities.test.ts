import {Abilities} from '../abilities';

describe('Abilities', () => {
  test('forGen', async () => {
    expect(Object.keys(await Abilities.forGen(1)).length).toBe(0);
    expect(Object.keys(await Abilities.forGen(2)).length).toBe(0);
    expect(Object.keys(await Abilities.forGen(3)).length).toBe(76 + 1);
    expect(Object.keys(await Abilities.forGen(4)).length).toBe(76 + 1 + 47 + 2);
    expect(Object.keys(await Abilities.forGen(5)).length)
        .toBe(76 + 1 + 47 + 2 + 41);
    expect(Object.keys(await Abilities.forGen(6)).length)
        .toBe(76 + 1 + 47 + 2 + 41 + 27);
    expect(Object.keys(await Abilities.forGen(7)).length)
        .toBe(76 + 1 + 47 + 2 + 41 + 27 + 42);
  });

  test('getAbility', async () => {
    expect(await Abilities.getAbility('foo')).not.toBeDefined();
    expect(
        (await Abilities.getAbility('Flash Fire (Activated)'))!.isNonstandard)
        .toBe(true);
    expect(await Abilities.getAbility('Beast Boost', 6)).not.toBeDefined();
    expect((await Abilities.getAbility('Beast Boost', 7))!.name)
        .toBe('Beast Boost');
    expect(await Abilities.getAbility('Shield Dust', 3))
        .toEqual(await Abilities.getAbility('Shield Dust', 4));
    expect(await Abilities.getAbility('Lightning Rod', 3))
        .not.toEqual(await Abilities.getAbility('Lightning Rod', 4));

    expect((await Abilities.getAbility('ph'))!.name).toBe('Poison Heal');
    expect((await Abilities.getAbility('stag'))!.name).toBe('Shadow Tag');
  });

  test('cached', async () => {
    const a = Abilities.getAbility('Mummy', 6);
    const b = Abilities.getAbility('Mummy', 6);
    const c = Abilities.getAbility('Mummy');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Mummy');
  });
});
