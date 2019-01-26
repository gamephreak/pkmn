import {patch} from '../data';

describe('Data', () => {
  test('patch', async () => {
    const obj = {'foo': 1, 'bar': 2};
    const diff = {'foo': {'exists': false}, 'bar': 3};
    expect(await patch(Promise.resolve(obj), Promise.resolve(diff))).toEqual({
      'bar': 3
    });
  });
});
