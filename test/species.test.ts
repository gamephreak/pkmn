import {Species} from '../species';

describe('Species', () => {
  test('forGen', () => {
    expect(Object.keys(Species.forGen(1)).length).toBe(151);
    expect(Object.keys(Species.forGen(2)).length).toBe(251);
    // Deoxys (3) + Castform (3)
    expect(Object.keys(Species.forGen(3)).length).toBe(386 + 6);
    // Wormadam (2) + Cherrim (1) + Arceus (16) + Pichu (1) +
    // Rotom (5) + Giratina (1) + Shaymin (1) + CAP (19)
    expect(Object.keys(Species.forGen(4)).length).toBe(493 + 6 + 46);
    // Basculin (1) + Darmanitan (1) + *-Therian (3) + Keldeo (1) +
    // Kyurem (2) + Meloetta (1) + Genesect (4) + CAP (10)
    expect(Object.keys(Species.forGen(5)).length).toBe(649 + 6 + 46 + 23);
    // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
    // Floette (1) + Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) +
    // Hoopa (1) + Pikachu (6) + Mega (48) + CAP (12)
    expect(Object.keys(Species.forGen(6)).length).toBe(721 + 6 + 46 + 23 + 81);
    // Alola (18) + Totem (12) + Pikachu (8) + Eevee (1) +
    // Greninja (1) + Zygarde (2) + Oricorio (3) + Lycanroc (2) +
    // Wishiwashi (1) + Silvally (17) + Minior (1) + Mimikyu (1) +
    // Necrozma (3) + Magearna (1) + CAP (6)
    expect(Object.keys(Species.forGen(7)).length)
        .toBe(809 + 6 + 46 + 23 + 81 + 77);
  });

  test('getSpecies', () => {
    expect(Species.getSpecies('foo')).not.toBeDefined();

    // normal
    expect(Species.getSpecies('gengar')!.name).toBe('Gengar');
    expect(Species.getSpecies('Gastrodon-East')!.name).toBe('Gastrodon');

    // nidoran
    expect(Species.getSpecies('nidoran♀')!.name).toBe('Nidoran-F');
    expect(Species.getSpecies('nidoran♂')!.name).toBe('Nidoran-M');

    // alias
    expect(Species.getSpecies('cune')!.name).toBe('Suicune');
    expect(Species.getSpecies('mence')!.name).toBe('Salamence');

    // mega
    expect(Species.getSpecies('Mega Salamence')!.name).toBe('Salamence-Mega');
    expect(Species.getSpecies('M-Alakazam')!.name).toBe('Alakazam-Mega');

    // primal
    expect(Species.getSpecies('Primal Kyogre')!.name).toBe('Kyogre-Primal');
    expect(Species.getSpecies('p groudon')!.name).toBe('Groudon-Primal');
  });

  test('getSpeciesName', () => {
    expect(Species.getSpeciesName('foo')).not.toBeDefined();

    expect(Species.getSpeciesName('Gastrodon-East')).toBe('Gastrodon-East');
    expect(Species.getSpeciesName('sawsbuckwinter')).toBe('Sawsbuck-Winter');
    expect(Species.getSpeciesName('Gengar')).toBe('Gengar');
  });

  test('fields', () => {
    expect(Species.getSpecies('Clefable')!.type1).toBe('Fairy');
    expect(Species.getSpecies('Clefable', 3)!.type1).toBe('Normal');
    expect(Species.getSpecies('Gengar')!.type2).toBe('Poison');
    expect(Species.getSpecies('Pikachu')!.type2).not.toBeDefined();
    expect(Species.getSpecies('Mew')!.baseStats)
        .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
    expect(Species.getSpecies('Tauros', 1)!.baseStats)
        .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
    expect(Species.getSpecies('Pelipper', 6)!.baseStats.spa).toEqual(85);
    expect(Species.getSpecies('Pelipper')!.baseStats.spa).toEqual(95);
    expect(Species.getSpecies('Greninja', 6)!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean'});
    expect(Species.getSpecies('Greninja', 7)!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
    expect(Species.getSpecies('Snorlax', 2)!.tier).toBe('OU');
    expect(Species.getSpecies('Snorlax', 5)!.tier).toBe('UU');
    expect(Species.getSpecies('Chansey', 3)!.prevo).not.toBeDefined();
    expect(Species.getSpecies('Chansey', 4)!.prevo).toBe('happiny');
    expect(Species.getSpecies('Chansey', 2)!.evos).toEqual(['blissey']);
    expect(Species.getSpecies('Charizard-Mega-X')!.baseSpecies)
        .toBe('Charizard');
    expect(Species.getSpecies('Giratina-O')!.forme).toBe('Origin');
    expect(Species.getSpecies('Giratina-O')!.formeLetter).toBe('O');
    expect(Species.getSpecies('Giratina')!.baseForme).toBe('Altered');
    expect(Species.getSpecies('Shaymin')!.otherFormes).toEqual(['shayminsky']);
    expect(Species.getSpecies('Gastrodon-East')!.cosmeticForms).toEqual([
      'gastrodoneast'
    ]);
  });
});
