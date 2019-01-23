import {Team, Teams} from '../teams';

const TEAM = `Hippowdon (M) @ Leftovers
Ability: Sand Stream
EVs: 252 HP / 24 Atk / 192 Def / 40 SpD
Impish Nature
- Stealth Rock
- Slack Off
- Earthquake
- Ice Fang

Tentacruel (M) @ Leftovers
Ability: Liquid Ooze
EVs: 252 HP / 120 Def / 138 SpD
Calm Nature
- Toxic Spikes
- Rapid Spin
- Surf
- Hidden Power [Electric]

Skarmory (M) @ Shed Shell
Ability: Keen Eye
EVs: 252 HP / 200 Def / 42 SpD / 16 Spe
Impish Nature
- Whirlwind
- Spikes
- Roost
- Brave Bird

Blissey @ Leftovers
Ability: Natural Cure
EVs: 252 Def / 40 SpA / 218 SpD
Calm Nature
- Wish
- Protect
- Flamethrower
- Toxic

Celebi @ Leftovers
Ability: Natural Cure
EVs: 252 HP / 216 Def / 8 SpD / 34 Spe
Bold Nature
- Recover
- Perish Song
- Grass Knot
- U-turn

Spiritomb (M) @ Leftovers
Ability: Pressure
EVs: 252 HP / 100 Def / 158 SpD
Calm Nature
- Shadow Ball
- Rest
- Sleep Talk
- Hidden Power [Fighting]`;

const TEAMS = '=== [gen4ou] Obi (Stall) ===\n' + TEAM;

describe('Teams', () => {
  test('import/export', () => {
    const teams = Teams.importTeams(TEAMS);
    expect(teams.length).toBe(1);
    const team = teams[0];
    expect(team.gen()).toBe(4);
    expect(team.tier()).toBe('OU');
    expect(team.exportTeam()).toEqual(TEAM);
  });
});
