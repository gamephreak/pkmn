import {Aliases} from '../aliases';

describe('Aliases', () => {
  test('get', async () => {
    expect(await Aliases.get('foo')).not.toBeDefined();
    expect(await Aliases.get('Nattorei')).toBe('Ferrothorn');
    expect(await Aliases.get('eq')).toBe('Earthquake');
  });
});
