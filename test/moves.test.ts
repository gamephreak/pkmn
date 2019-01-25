import {Moves} from '../moves';

describe('Moves', () => {
  test.skip('TODO', () => {
    expect(true).toBe(false);  // TODO
  });

  test('cached', async () => {
    const a = Moves.getMove('Earthquake', 6);
    const b = Moves.getMove('Earthquake', 6);
    const c = Moves.getMove('Earthquake');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Earthquake');
  });
});
