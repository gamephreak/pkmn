import {Data} from '../data';

describe('Data', () => {
  test('patch', () => {
    const obj = {'foo': 1, 'bar': 2};
    const diff = {'foo': {'exists': false}, 'bar': 3};
    expect(Data.patch(obj, diff)).toEqual({'bar': 3});
  });
});
