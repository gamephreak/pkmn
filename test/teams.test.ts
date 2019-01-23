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
const TEAMS: string = readTeams([
  {format: 'gen7ou', name: 'SM/BO', team: GEN7},
  {format: 'gen7ou', name: 'SM/Stall', file: 'gen7ou-stall'},
  {format: 'gen4ou', name: 'DPP/Stall', team: GEN4},
  {format: 'gen2ou', name: 'GSC/No Lax', file: 'gen2ou-nolax'}
]);

describe('Teams', () => {
  test.skip('import', () => {
    const teams = Teams.importTeams(TEAMS);
    expect(teams.length).toBe(4);
  });
});
