import {Format} from '../format';

describe('Format', () => {
  test('constructor', () => {
    expect(new Format().gen).toBe(7);
    expect(new Format().tier).toBe('OU');
  });
  test('fromString', () => {
    expect(Format.fromString('')).not.toBeDefined();
    expect(Format.fromString('foo')).not.toBeDefined();

    expect(Format.fromString('gen4')!.gen).toBe(4);
    expect(Format.fromString('gen4')!.tier).toBe('OU');

    expect(Format.fromString('gen7foo')).not.toBeDefined();

    expect(Format.fromString('uu')!.gen).toBe(6);
    expect(Format.fromString('uu')!.tier).toBe('UU');
    expect(Format.fromString('uu')!.id).toBe('gen6uu');
  });
});
