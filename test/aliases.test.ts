import {Aliases} from '../aliases';

describe('Aliases', () => {
  test('lookup', () => {
    expect(Aliases.lookup('foo')).toBe(undefined);
    expect(Aliases.lookup('Nattorei')).toBe('Ferrothorn');
    expect(Aliases.lookup('eq')).toBe('Earthquake');
  });
});
