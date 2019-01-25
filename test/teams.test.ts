import {readFileSync} from 'fs';

import {Team, Teams} from '../teams';

function readTeam(file: string) {
  return readFileSync(`${__dirname}/fixtures/teams/${file}`).toString();
}

function readTeams(
    ts: Array<{format: string, name: string, file?: string, team?: string}>):
    string {
  let buf = '';
  for (const t of ts) {
    buf += `=== [${t.format}] ${t.name} ===\n\n` +
        (t.team ? t.team : readTeam(t.file!));
  }
  return buf;
}

const GEN7: string = readTeam('gen7ou-bo');
const GEN4: string = readTeam('gen4ou-stall');
const GEN1: string = readTeam('gen1ou-cloyster');
// const TEAMS: string = readTeams([
//{format: 'gen7ou', name: 'SM/BO', team: GEN7},
//{format: 'gen7ou', name: 'SM/Stall', file: 'gen7ou-stall'},
//{format: 'gen4ou', name: 'DPP/Stall', team: GEN4},
//{format: 'gen2ou', name: 'GSC/No Lax', file: 'gen2ou-nolax'}
//]);

// TODO
describe('Team', () => {
  test.skip('importTeam + exportTeam', async () => {
    expect(await (await Teams.importTeam(GEN7))!.exportTeam()).toEqual(GEN7);
  });

  test.skip('pack + unpack', () => {});
  test.skip('toJSON', () => {});
});

// TODO
describe('Teams', () => {
  test('importTeams + exportTeams', async () => {
    const teams = readTeam('teams');
    const imported = await Teams.importTeams(teams)!;
    expect(imported.length).toBe(2);

    expect(imported[0].gen()).toBe(7);
    expect(imported[0].tier()).toBe('OU');
    expect(imported[0].name).toBe('Rain');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen()).toBe(1);
    expect(imported[1].tier()).toBe('OU');
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(await Teams.exportTeams(imported)).toEqual(teams);
  });
});
