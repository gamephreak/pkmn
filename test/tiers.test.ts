import {Species} from '../species';
import {Tiers} from '../tiers';

describe('Tiers', () => {
  test('fromString', () => {
    expect(Tiers.fromString('lc uber')).toBe('LC Uber');
    expect(Tiers.fromString('unreleased')).toBe('Unreleased');
    expect(Tiers.fromString('foo')).not.toBeDefined();
  });

  test('isOfficial', () => {
    expect(Tiers.isOfficial('LC')).toBe(true);
    expect(Tiers.isOfficial('UUBL')).toBe(false);
  });

  test('isNonstandard', () => {
    expect(Tiers.isNonstandard('OU')).toBe(false);
    expect(Tiers.isNonstandard('CAP NFE')).toBe(true);
  });

  test('isAllowed', () => {
    expect(Tiers.isAllowed(Species.getSpecies('Gengar')!, 'OU')).toBe(true);
    expect(Tiers.isAllowed(Species.getSpecies('Ekans')!, 'UU')).toBe(true);
    expect(Tiers.isAllowed(Species.getSpecies('Kyogre')!, 'PU')).toBe(false);
    expect(Tiers.isAllowed(Species.getSpecies('Syclar')!, 'CAP')).toBe(true);
    expect(Tiers.isAllowed(Species.getSpecies('Voodoom')!, 'OU')).toBe(false);
  });
});
