import {toID} from '../id';

describe('id', () => {
  test('toID', () => {
    expect(toID('Nature\'s Madness')).toBe('naturesmadness');
    expect(toID('10,000,000 Volt Thunderbolt')).toBe('10000000voltthunderbolt');
    expect(toID({id: 'Foo', userid: 'bar'})).toBe('foo');
    expect(toID({idx: 'foo', userid: ' Bar '})).toBe('bar');
    expect(toID({idx: 'foo', userid: []})).toBe('');
    expect(toID(undefined)).toBe('');
    expect(toID(0)).toBe('0');
    expect(toID({id: 0})).toBe('');  // BUG: ???
  });
});
