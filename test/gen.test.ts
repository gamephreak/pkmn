import {Generations} from '../gen';

describe('Generations', () => {
  test('toString', () => {
    expect(Generations.toString(2)).toBe('GSC');
    expect(Generations.toString(7)).toBe('SM');
  });
  test('fromString', () => {
    expect(Generations.fromString('RBY')).toBe(1);
    expect(Generations.fromString('ORAS')).toBe(6);
    expect(Generations.fromString('foo')).toBe(undefined);
  });
});
