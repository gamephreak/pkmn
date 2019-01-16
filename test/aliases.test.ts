import {Aliases} from '../aliases';

describe('Aliases', () => {
  test('lookup', () => {
    expect(Aliases.lookup('foo')).not.toBeDefined();
    expect(Aliases.lookup('Nattorei')).toBe('Ferrothorn');
    expect(Aliases.lookup('eq')).toBe('Earthquake');
  });
});
