import {Statuses} from '../status';

describe('Statuses', () => {
  test('toString', () => {
    expect(Statuses.toString(undefined)).toBe('Healthy');
    expect(Statuses.toString('')).toBe('Healthy');
    expect(Statuses.toString('frz')).toBe('Frozen');
  });
});
