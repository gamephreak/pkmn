import {Species} from '../species';

describe('Species', () => {
  test('forGen', async () => {
    expect(Object.keys(await Species.forGen(1)).length).toBe(151);
    expect(Object.keys(await Species.forGen(2)).length).toBe(251);
    // Deoxys (3) + Castform (3)
    expect(Object.keys(await Species.forGen(3)).length).toBe(386 + 6);
    // Wormadam (2) + Cherrim (1) + Arceus (16) + Pichu (1) +
    // Rotom (5) + Giratina (1) + Shaymin (1)
    expect(Object.keys(await Species.forGen(4)).length).toBe(493 + 6 + 27);
    // Basculin (1) + Darmanitan (1) + *-Therian (3) + Keldeo (1) +
    // Kyurem (2) + Meloetta (1) + Genesect (4)
    expect(Object.keys(await Species.forGen(5)).length).toBe(649 + 6 + 27 + 13);
    // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
    // Floette (1) + Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) +
    // Hoopa (1) + Pikachu (6) + Mega (48)
    expect(Object.keys(await Species.forGen(6)).length)
        .toBe(721 + 6 + 27 + 13 + 69);
    // Alola (18) + Totem (12) + Pikachu (8) + Eevee (1) +
    // Greninja (1) + Zygarde (2) + Oricorio (3) + Lycanroc (2) +
    // Wishiwashi (1) + Silvally (17) + Minior (1) + Mimikyu (1) +
    // Necrozma (3) + Magearna (1) - LGPE Starters/Melmetal (4)
    expect(Object.keys(await Species.forGen(7)).length)
        .toBe(809 - 2 + 6 + 27 + 13 + 69 + 71 - 2);
  });

  test('get', async () => {
    expect((await Species.get(undefined))).not.toBeDefined();
    expect(await Species.get('foo')).not.toBeDefined();

    // normal
    expect((await Species.get('gengar'))!.name).toBe('Gengar');
    expect((await Species.get('Gastrodon-East'))!.name).toBe('Gastrodon');

    // nidoran
    expect((await Species.get('nidoran♀'))!.name).toBe('Nidoran-F');
    expect((await Species.get('nidoran♂'))!.name).toBe('Nidoran-M');

    // alias
    expect((await Species.get('cune'))!.name).toBe('Suicune');
    expect((await Species.get('mence'))!.name).toBe('Salamence');

    // mega
    expect((await Species.get('Mega Salamence'))!.name).toBe('Salamence-Mega');
    expect((await Species.get('M-Alakazam'))!.name).toBe('Alakazam-Mega');

    // primal
    expect((await Species.get('Primal Kyogre'))!.name).toBe('Kyogre-Primal');
    expect((await Species.get('p groudon'))!.name).toBe('Groudon-Primal');
  });

  test('getName', async () => {
    expect(await Species.getName('foo')).not.toBeDefined();

    expect(await Species.getName('Gastrodon-East')).toBe('Gastrodon-East');
    expect(await Species.getName('sawsbuckwinter')).toBe('Sawsbuck-Winter');
    expect(await Species.getName('Gengar')).toBe('Gengar');
  });

  test('fields', async () => {
    expect((await Species.get('Clefable'))!.type1).toBe('Fairy');
    expect((await Species.get('Clefable', 3))!.type1).toBe('Normal');
    expect((await Species.get('Gengar'))!.type2).toBe('Poison');
    expect((await Species.get('Pikachu'))!.type2).not.toBeDefined();
    expect((await Species.get('Mew'))!.baseStats)
        .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
    expect((await Species.get('Tauros', 1))!.baseStats)
        .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
    expect((await Species.get('Pelipper', 6))!.baseStats.spa).toEqual(85);
    expect((await Species.get('Pelipper'))!.baseStats.spa).toEqual(95);
    expect((await Species.get('Greninja', 6))!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean'});
    expect((await Species.get('Greninja', 7))!.abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
    expect((await Species.get('Snorlax', 2))!.tier).toBe('OU');
    expect((await Species.get('Snorlax', 5))!.tier).toBe('UU');
    expect((await Species.get('Chansey', 3))!.prevo).not.toBeDefined();
    expect((await Species.get('Chansey', 4))!.prevo).toBe('happiny');
    expect((await Species.get('Chansey', 2))!.evos).toEqual(['blissey']);
    expect((await Species.get('Charizard-Mega-X'))!.baseSpecies)
        .toBe('Charizard');
    expect((await Species.get('Giratina-O'))!.forme).toBe('Origin');
    expect((await Species.get('Giratina-O'))!.formeLetter).toBe('O');
    expect((await Species.get('Giratina'))!.baseForme).toBe('Altered');
    expect((await Species.get('Shaymin'))!.otherFormes).toEqual(['shayminsky']);
    expect((await Species.get('Gastrodon-East'))!.cosmeticForms).toEqual([
      'gastrodoneast'
    ]);
  });

  test('cached', async () => {
    const a = Species.get('Gengar', 6);
    const b = Species.get('Gengar', 6);
    const c = Species.get('Gengar');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Gengar');

    const d = Species.getName('Gastrodon-East', 6);
    const e = Species.getName('Gastrodon-East', 6);
    const f = Species.getName('Gastrodon-East');

    expect(e).toBe(d);
    expect(f).not.toBe(d);
    expect((await e)).toBeDefined();
    expect((await e)!).toBe('Gastrodon-East');
  });
});
