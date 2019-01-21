import {extend} from '../extend';

describe('extend', () => {
  test('generic', () => {
    const a = {
      a: 1,
      b: 'b',
      c: [3, 4, 5],
      d: {a: 1, b: 'b', c: [7, 8, 9], d: {a: 1}},
      e: {x: [{x: [{x: 0, y: [2]}]}]}
    };

    const b = {
      b: 'c',
      c: [6],
      d: {a: 2, c: [6], d: {a: 2, b: 3}},
      e: {x: [{x: [{y: [3, 4]}]}]},
      f: 2
    };

    const expected = {
      a: 1,
      b: 'c',
      c: [6, 4, 5],
      d: {a: 2, b: 'b', c: [6, 8, 9], d: {a: 2, b: 3}},
      e: {x: [{x: [{x: 0, y: [3, 4]}]}]},
      f: 2
    };

    const actual = extend(true, {}, a, b);

    expect(actual).toEqual(expected);
  });

  test('specific', () => {
    const rby = {
      'psychic':
          {'secondaries': [{'chance': 33, 'boosts': {'spd': -1, 'spa': -1}}]}
    };

    const gsc = {
      'psychic':
          {'secondaries': [{'chance': 10, 'boosts': {'spa': -1, 'spd': 0}}]}
    };

    expect(extend(true, {}, rby, gsc)).toEqual(gsc);
  });
});
