import {Data} from '../data';

describe('Data', () => {
  test('patch', () => {
    const obj = {'foo': {'baz': 5}, 'bar': {'qux': 6}};
    const diff = {'foo': {'exists': false}, 'bar': {'quux': 7}};
    expect(Data.patch('move', obj, diff)).toEqual({
      'bar': {'kind': 'move', 'qux': 6, 'quux': 7}
    });
  });
});
