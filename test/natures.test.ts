import {Nature, Natures} from '../natures';

describe('Natures', () => {
  test('fromString', () => {
    const adamant = Natures.fromString('ADAMANT')!;
    expect(adamant.name).toBe('Adamant');
    expect(adamant.plus).toBe('atk');
    expect(adamant.minus).toBe('spa');
    expect(adamant.toString()).toBe('Adamant');

    const serious = Natures.fromString('Serious')!;
    expect(serious.plus).toBe(undefined);
    expect(serious.minus).toBe(undefined);

    expect(Natures.fromString('foo')).toBe(undefined);
  });
});
