import {Aliases} from '../aliases';

describe('Aliases', () => {
  test('lookup', async () => {
    expect(await Aliases.lookup('foo')).not.toBeDefined();
    expect(await Aliases.lookup('Nattorei')).toBe('Ferrothorn');
    expect(await Aliases.lookup('eq')).toBe('Earthquake');
  });
});
