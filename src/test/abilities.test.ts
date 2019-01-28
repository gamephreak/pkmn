import {Abilities} from '../abilities';

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

  test('get', () => {
    expect(Abilities.get('foo')).not.toBeDefined();
    expect(Abilities.get('Flash Fire (Activated)')!.isNonstandard).toBe(true);
    expect(Abilities.get('Beast Boost', 6)).not.toBeDefined();
    expect(Abilities.get('Beast Boost', 7)!.name).toBe('Beast Boost');
    expect(Abilities.get('Shield Dust', 3))
        .toEqual(Abilities.get('Shield Dust', 4));
    expect(Abilities.get('Lightning Rod', 3))
        .not.toEqual(Abilities.get('Lightning Rod', 4));

    expect(Abilities.get('ph')!.name).toBe('Poison Heal');
    expect(Abilities.get('stag')!.name).toBe('Shadow Tag');
  });

  test('cached', () => {
    const a = Abilities.get('Mummy', 6);
    const b = Abilities.get('Mummy', 6);
    const c = Abilities.get('Mummy');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect(b).toBeDefined();
    expect(b!.name).toBe('Mummy');
  });
});
