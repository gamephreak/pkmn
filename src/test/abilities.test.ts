import {Abilities} from '../abilities';

describe('Abilities', () => {
  test('forGen', async () => {
    expect(Object.keys(await Abilities.forGen(1)).length).toBe(0);
    expect(Object.keys(await Abilities.forGen(2)).length).toBe(0);
    expect(Object.keys(await Abilities.forGen(3)).length).toBe(76);
    expect(Object.keys(await Abilities.forGen(4)).length).toBe(76 + 47);
    expect(Object.keys(await Abilities.forGen(5)).length).toBe(76 + 47 + 41);
    expect(Object.keys(await Abilities.forGen(6)).length)
        .toBe(76 + 47 + 41 + 27);
    expect(Object.keys(await Abilities.forGen(7)).length)
        .toBe(76 + 47 + 41 + 27 + 42);
  });

  test('get', async () => {
    expect(await Abilities.get('foo')).not.toBeDefined();
    expect(await Abilities.get('Beast Boost', 6)).not.toBeDefined();
    expect((await Abilities.get('Beast Boost', 7))!.name).toBe('Beast Boost');
    expect(await Abilities.get('Shield Dust', 3))
        .toEqual(await Abilities.get('Shield Dust', 4));
    expect(await Abilities.get('Lightning Rod', 3))
        .not.toEqual(await Abilities.get('Lightning Rod', 4));

    expect((await Abilities.get('ph'))!.name).toBe('Poison Heal');
    expect((await Abilities.get('stag'))!.name).toBe('Shadow Tag');
  });

  test('cached', async () => {
    const a = Abilities.get('Mummy', 6);
    const b = Abilities.get('Mummy', 6);
    const c = Abilities.get('Mummy');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Mummy');
  });
});
