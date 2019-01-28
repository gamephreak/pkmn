import {readFileSync} from 'fs';

import {Team, Teams} from '../teams';

function readTeam(file: string) {
  return readFileSync(`${__dirname}/fixtures/${file}`).toString();
}

const TEAM: string = readTeam('team');
const TEAMS: string = readTeam('teams');

describe('Team', () => {
  test('importTeam + exportTeam', async () => {
    expect(await (await Team.fromString(TEAM))!.toString()).toEqual(TEAM);
  });

  test('pack + unpack', async () => {
    const u =
        (await Team.import((await (await Team.import(TEAM))!.pack()) + '\n'))!;
    expect(await u.export()).toEqual(TEAM);
  });

  test('toJSON + fromJSON', async () => {
    const fj = (await Teams.unpackTeam((await Team.import(TEAM))!.toJSON()))!;
    expect(await fj.export()).toEqual(TEAM);

    expect(Team.fromJSON('{"foo": "bar"}')).not.toBeDefined();
  });
});

describe('Teams', () => {
  test('importTeams + exportTeams', async () => {
    const imported = await Teams.fromString(TEAMS)!;
    expect(imported.length).toBe(2);

    expect(imported[0].gen()).toBe(6);
    expect(imported[0].tier()).toBe('OU');
    expect(imported[0].name).toBe('Bulky Offense');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen()).toBe(1);
    expect(imported[1].tier()).toBe('OU');
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(await Teams.toString(imported))
        .toEqual(TEAMS.replace(/\[ou\]/, '[gen6ou]'));
    expect(await Teams.importTeam('')).not.toBeDefined();

    expect(await Teams.importTeam(TEAMS)).toEqual(imported[0]);
  });

  test('unpack', async () => {
    expect(await Teams.unpackTeam('')).not.toBeDefined();
    expect(await Teams.unpackTeam('foo')).not.toBeDefined();
  });

  test('including packed', async () => {
    const raw = readTeam('team');
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
