import {readFileSync} from 'fs';

import {Team, Teams} from '../teams';

function readTeam(file: string) {
  return readFileSync(`${__dirname}/fixtures/teams/${file}`).toString();
}

// function readTeams(
// ts: Array<{format: string, name: string, file?: string, team?: string}>):
// string {
// let buf = '';
// for (const t of ts) {
// buf += `=== [${t.format}] ${t.name} ===\n\n` +
//(t.team ? t.team : readTeam(t.file!));
//}
// return buf;
//}

// const GEN4: string = readTeam('gen4ou-stall');
// const GEN1: string = readTeam('gen1ou-cloyster');


describe('Team', () => {
  test('importTeam + exportTeam', async () => {
    const team = readTeam('gen7ou-bo');
    expect(await (await Team.fromString(team))!.toString()).toEqual(team);
  });

  test('pack + unpack', async () => {
    const team = readTeam('gen7ou-bo');
    const u = (await Team.unpack(await (await Team.import(team))!.pack()))!;
    expect(await u.export()).toEqual(team);
  });

  test('toJSON + fromJSON', async () => {
    const team = readTeam('gen7ou-bo');
    const fj = (await Teams.unpackTeam((await Team.import(team))!.toJSON()))!;
    expect(await fj.export()).toEqual(team);

    expect(Team.fromJSON('{"foo": "bar"}')).not.toBeDefined();
  });
});

describe('Teams', () => {
  test('importTeams + exportTeams', async () => {
    const teams = readTeam('teams');
    const imported = await Teams.fromString(teams)!;
    expect(imported.length).toBe(2);

    expect(imported[0].gen()).toBe(7);
    expect(imported[0].tier()).toBe('OU');
    expect(imported[0].name).toBe('Rain');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen()).toBe(1);
    expect(imported[1].tier()).toBe('OU');
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(await Teams.toString(imported)).toEqual(teams);
  });

  test('including packed', async () => {
    const raw = readTeam('gen7ou-bo');
    const teams = await Teams.importTeams(readTeam('teams'));
    const team = (await Team.import(raw))!;
    const both = 'gen1ou]RBY/Cloyster|' + (await teams[1].pack()) + '\n' +
        (await Teams.exportTeams([teams[0]])) + '|' + (await team.pack());
    const imported = await Teams.importTeams(both);
    expect(imported.length).toBe(3);

    expect(imported[0].team.length).toBe(6);
    expect(imported[1].team.length).toBe(6);
    expect(imported[2].team.length).toBe(6);

    expect(imported[0].gen()).toBe(1);
    expect(imported[0].tier()).toBe('OU');
    expect(imported[0].name).toBe('Cloyster');
    expect(imported[0].folder).toBe('RBY');

    expect(await imported[2].export()).toBe(raw);

    const again = (await Teams.importTeams(await team.pack()));
    expect(await again[0].export()).toBe(raw);
  });
});
