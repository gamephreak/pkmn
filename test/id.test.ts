import {toID} from '../id';

describe('id', () => {
  test('toID', () => {
    expect(toID('Nature\'s Madness')).toBe('naturesmadness');
    expect(toID('10,000,000 Volt Thunderbolt')).toBe('10000000voltthunderbolt');
  });
});
