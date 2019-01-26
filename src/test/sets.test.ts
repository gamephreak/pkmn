import {readFileSync} from 'fs';

import {Sets} from '../sets';

function imported(s: string) {
  return s.split('\n').map(x => x.trim()).filter(x => x).join('\n');
}

function exported(s: string) {
  return s.split('\n')
             .map((x) => x.trim())
             .filter(x => x)
             .map(x => x + '  ')
             .join('\n') +
      '\n\n';
}

describe('Sets', () => {
  describe('importSet + exportSet', () => {
    test('blissey', async () => {
      const blissey = `
        Blissey @ Leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - Wish
        - Toxic
        - Protect
        - Seismic Toss`;

      expect(await Sets.toString((await Sets.fromString(imported(blissey)))!))
          .toEqual(exported(blissey));
    });

    test('marowak (gen 2)', async () => {
      const marowakIn = imported(`
        Marowak (M) @ Leftovers
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);
      // NOTE: we differ slightly from PS as we don't specify IV: 30 HP
      const marowakOut = exported(`
        Marowak (M) @ Leftovers
        Happiness: 0
        IVs: 26 Atk / 26 Def
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);

      expect(
          await Sets.exportSet((await Sets.importSet(marowakIn, 2))!, false, 2))
          .toEqual(marowakOut);
    });

    test('magnezone', async () => {
      const magnezoneIn = imported(`
        Maggy (Magnezone) @ No Item
        Trait: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        ~ Thunderbolt
        ~
        ~ Flash Cannon
        ~ Hidden Power [Flying]
        ~ Volt Switch`);
      const magnezoneOut = exported(`
        Maggy (Magnezone)
        Ability: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious Nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        - Thunderbolt
        - Flash Cannon
        - Hidden Power [Flying]
        - Volt Switch`);

      expect(await Sets.exportSet((await Sets.importSet(magnezoneIn))!))
          .toEqual(magnezoneOut);
    });

    test('tauros (rby)', async () => {
      const tauros = `
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`;

      expect(await Sets.exportSet((await Sets.importSet(imported(tauros)))!))
          .toEqual(exported(tauros));
    });

    test('fake', async () => {
      const fake = `
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Hidden Power [Fake]`;

      expect(await Sets.exportSet((await Sets.importSet(imported(fake)))!))
          .toEqual(exported(fake));
    });

    test('nothing', async () => {
      expect(await Sets.importSet('')).not.toBeDefined();
    });
  });

  describe('pack + unpack', () => {
    test('m-alakazam', async () => {
      const malakazam = `
        Alakazam-Mega (F) @ Alakazite
        Ability: Magic Guard
        EVs: 252 SpA / 252 Spe
        Timid Nature
        IVs: 0 Atk
        - Psychic
        - Focus Blast
        - Shadow Ball
        - Recover`;

      const u = (await Sets.unpack(
          await Sets.pack((await Sets.importSet(imported(malakazam)))!)))!;
      expect(await Sets.exportSet(u)).toEqual(exported(malakazam));
    });

    test('tangrowth (packed in)', async () => {
      const tangrowthIn = 'Tangrowth||assaultvest|H|gigadrain,knockoff' +
          ',powerwhip,earthquake|Sassy|248,,8,,252,||,30,30,,,|||,ice,';
      const tangrowthOut = exported(`
        Tangrowth @ Assault Vest
        Ability: Regenerator
        EVs: 248 HP / 8 Def / 252 SpD
        Sassy Nature
        IVs: 30 Atk / 30 Def
        - Giga Drain
        - Knock Off
        - Power Whip
        - Earthquake`);

      const u = (await Sets.unpack(tangrowthIn))!;
      expect((await Sets.unpack(await Sets.pack(u)))!).toEqual(u);
      expect(await Sets.exportSet(u)).toEqual(tangrowthOut);
    });

    test('magnezone', async () => {
      const magnezoneIn = imported(`
        Maggy (Magnezone) @ No Item
        Trait: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        ~ Thunderbolt
        ~
        ~ Flash Cannon
        ~ Hidden Power [Flying]
        ~ Volt Switch`);
      const magnezoneOut = exported(`
        Maggy (Magnezone)
        Ability: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious Nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        - Thunderbolt
        - Flash Cannon
        - Hidden Power [Flying]
        - Volt Switch`);

      const u = (await Sets.unpack(
          await Sets.pack((await Sets.importSet(magnezoneIn, 7))!)))!;
      expect(await Sets.exportSet(u, false, 7)).toEqual(magnezoneOut);
    });

    test('tauros', async () => {
      const taurosIn = imported(`
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);
      const taurosOut = exported(`
        Tauros
        Ability: Intimidate
        EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 SpD / 252 Spe
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);

      const u = (await Sets.unpack(
          await Sets.pack((await Sets.importSet(taurosIn, 1))!)))!;
      expect(await Sets.exportSet(u)).toEqual(taurosOut);
    });

    test('blissey (after unpack)', async () => {
      const blisseyIn = imported(`
        Blissey @ Leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - Wish
        - Toxic
        - Protect
        - Seismic Toss`);
      const blisseyOut = exported(`
        Blissey @ leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - wish
        - toxic
        - protect
        - seismictoss`);

      const u = (await Sets.unpack(
          await Sets.pack((await Sets.importSet(blisseyIn))!)))!;
      expect(await Sets.exportSet(u, true)).toEqual(blisseyOut);
    });

    test('fake', async () => {
      const fakeIn = imported(`
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Fake Move 4`);
      const fakeOut = exported(`
        Fakey (fake) @ fake
        Ability: fake
        - fakemove1
        - fakemove2
        - fakemove3
        - fakemove4`);

      // clang-format off
      const u = (await Sets.unpack(
          await Sets.pack((await Sets.importSet(fakeIn))!)))!;
      // clang-format on
      expect(await Sets.exportSet(u)).toEqual(fakeOut);
    });
  });

  test('toJSON + fromJSON', async () => {
    const malakazam = `
      Alakazam-Mega (F) @ Alakazite
      Ability: Magic Guard
      EVs: 252 SpA / 252 Spe
      Timid Nature
      IVs: 0 Atk
      - Psychic
      - Focus Blast
      - Shadow Ball
      - Recover`;

    const fj = Sets.fromJSON(
        Sets.toJSON((await Sets.importSet(imported(malakazam)))!))!;
    expect(await Sets.exportSet(fj)).toEqual(exported(malakazam));

    expect(Sets.fromJSON('foo')).not.toBeDefined();
  });
});
