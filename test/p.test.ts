import {Pokemon} from '../p';

test('toID', () => {
  const p = new Pokemon(
      'Illuminate', 335, 404,
      {hp: 404, atk: 300, def: 300, spa: 300, spd: 300, spe: 300},
      'Choice Band');
  expect(p.approxhp).toBe('0.83');
});
