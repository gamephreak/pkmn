import {Aliases} from '../aliases';

describe('Aliases', () => {
  test('get', () => {
    expect(Aliases.get('foo')).not.toBeDefined();
    expect(Aliases.get('Nattorei')).toBe('Ferrothorn');
    expect(Aliases.get('eq')).toBe('Earthquake');
  });
});
