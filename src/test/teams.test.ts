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


// TODO
describe('Team', () => {
  test('importTeam + exportTeam', async () => {
    const team = readTeam('gen7ou-bo');
    expect(await (await Team.import(team))!.export()).toEqual(team);
  });

  test.skip('pack + unpack', () => {});
  test.skip('toJSON', () => {});
});

// TODO
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
});
