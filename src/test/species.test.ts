import {Species} from '../species';

describe('Species', () => {
  test('forGen', () => {
    expect(Object.keys(Species.forGen(1)).length).toBe(151);
    expect(Object.keys(Species.forGen(2)).length).toBe(251);
    // Deoxys (3) + Castform (3)
    expect(Object.keys(Species.forGen(3)).length).toBe(386 + 6);
    // Wormadam (2) + Cherrim (1) + Arceus (16) + Pichu (1) +
    // Rotom (5) + Giratina (1) + Shaymin (1)
    expect(Object.keys(Species.forGen(4)).length).toBe(493 + 6 + 27);
    // Basculin (1) + Darmanitan (1) + *-Therian (3) + Keldeo (1) +
    // Kyurem (2) + Meloetta (1) + Genesect (4)
    expect(Object.keys(Species.forGen(5)).length).toBe(649 + 6 + 27 + 13);
    // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
    // Floette (1) + Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) +
    // Hoopa (1) + Pikachu (6) + Mega (48)
    expect(Object.keys(Species.forGen(6)).length).toBe(721 + 6 + 27 + 13 + 69);
    // Alola (18) + Totem (12) + Pikachu (8) + Eevee (1) +
    // Greninja (1) + Zygarde (2) + Oricorio (3) + Lycanroc (2) +
    // Wishiwashi (1) + Silvally (17) + Minior (1) + Mimikyu (1) +
    // Necrozma (3) + Magearna (1) - LGPE Starters/Melmetal (4)
    expect(Object.keys(Species.forGen(7)).length)
        .toBe(809 - 2 + 6 + 27 + 13 + 69 + 71 - 2);
  });

  test('get', () => {
    expect(Species.get(undefined)).not.toBeDefined();
    expect(Species.get('foo')).not.toBeDefined();

    // normal
    expect(Species.get('gengar')!.name).toBe('Gengar');
    expect(Species.get('Gastrodon-East')!.name).toBe('Gastrodon');

    // nidoran
    expect(Species.get('nidoran♀')!.name).toBe('Nidoran-F');
    expect(Species.get('nidoran♂')!.name).toBe('Nidoran-M');

    // alias
    expect(Species.get('cune')!.name).toBe('Suicune');
    expect(Species.get('mence')!.name).toBe('Salamence');

    // mega
    expect(Species.get('Mega Salamence')!.name).toBe('Salamence-Mega');
    expect(Species.get('M-Alakazam')!.name).toBe('Alakazam-Mega');

    // primal
    expect(Species.get('Primal Kyogre')!.name).toBe('Kyogre-Primal');
    expect(Species.get('p groudon')!.name).toBe('Groudon-Primal');
  });

  test('getName', () => {
    expect(Species.getName('foo')).not.toBeDefined();

    expect(Species.getName('Gastrodon-East')).toBe('Gastrodon-East');
    expect(Species.getName('sawsbuckwinter')).toBe('Sawsbuck-Winter');
    expect(Species.getName('Gengar')).toBe('Gengar');
  });

  test('fields', () => {
    expect(Species.get('Clefable')!.type1).toBe('Fairy');
    expect(Species.get('Clefable', 3)!.type1).toBe('Normal');
    expect(Species.get('Gengar')!.type2).toBe('Poison');
    expect(Species.get('Pikachu')!.type2).not.toBeDefined();
    expect(Species.get('Mew')!.baseStats)
        .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
    expect(Species.get('Tauros', 1)!.baseStats)
        .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
    expect(Species.get('Pelipper', 6)!.baseStats.spa).toEqual(85);
    expect(Species.get('Pelipper')!.baseStats.spa).toEqual(95);
    expect(Species.get('Greninja', 6)!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean'});
    expect(Species.get('Greninja', 7)!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
    expect(Species.get('Snorlax', 2)!.tier).toBe('OU');
    expect(Species.get('Snorlax', 5)!.tier).toBe('UU');
    expect(Species.get('Chansey', 3)!.prevo).not.toBeDefined();
    expect(Species.get('Chansey', 4)!.prevo).toBe('happiny');
    expect(Species.get('Chansey', 2)!.evos).toEqual(['blissey']);
    expect(Species.get('Charizard-Mega-X')!.baseSpecies).toBe('Charizard');
    expect(Species.get('Giratina-O')!.forme).toBe('Origin');
    expect(Species.get('Giratina-O')!.formeLetter).toBe('O');
    expect(Species.get('Giratina')!.baseForme).toBe('Altered');
    expect(Species.get('Shaymin')!.otherFormes).toEqual(['shayminsky']);
    expect(Species.get('Gastrodon-East')!.cosmeticForms).toEqual([
      'gastrodoneast'
    ]);
    expect(Species.get('Garchomp-Mega')!.isMega).toBe(true);
    expect(Species.get('Yanmega')!.isMega).not.toBeDefined();
    expect(Species.get('Kyogre-Primal')!.isPrimal).toBe(true);
  });

  test('cached', () => {
    const a = Species.get('Gengar', 6);
    const b = Species.get('Gengar', 6);
    const c = Species.get('Gengar');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect(b).toBeDefined();
    expect(b!.name).toBe('Gengar');
  });
});
