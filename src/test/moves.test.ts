import {CURRENT, Generation} from '../gen';
import {Moves} from '../moves';

describe('Moves', () => {
  test('forGen', async () => {
    expect(Object.keys(await Moves.forGen(1)).length).toBe(165);
    // NOTE: 16 'Hidden Power X' moves included.
    expect(Object.keys(await Moves.forGen(2)).length).toBe(165 + 86 + 16);
    // NOTE: Honko seems to think 'Mega Drain' and 'Acid' were removed...
    expect(Object.keys(await Moves.forGen(3)).length).toBe(165 + 86 + 16 + 103);
    // NOTE: 2 CAP moves
    expect(Object.keys(await Moves.forGen(4)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 2);
    expect(Object.keys(await Moves.forGen(5)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 2 + 92);
    expect(Object.keys(await Moves.forGen(6)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 2 + 92 + 62);
    expect(Object.keys(await Moves.forGen(7)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 2 + 92 + 62 + 103);
  });

  test('get', async () => {
    expect(await Moves.get('foo')).not.toBeDefined();
    expect(await Moves.get('Thunderbolt', 1)).toBeDefined();

    // alias
    expect(await Moves.get('eq', 6)).toEqual(await Moves.get('Earthquake', 6));

    // hidden power
    expect((await Moves.get('Hidden Power [Bug]'))!.name)
        .toBe('Hidden Power Bug');
  });

  test('fields', async () => {
    expect((await Moves.get('Surf', 1))!.basePower).toBe(95);
    expect((await Moves.get('Surf'))!.basePower).toBe(90);
    expect((await Moves.get('Curse', 4))!.type).toBe('???');
    expect((await Moves.get('Curse', 5))!.type).toBe('Ghost');
    expect((await Moves.get('Struggle', 1))!.pp).toBe(10);
    expect((await Moves.get('Struggle', 2))!.pp).toBe(1);
    expect((await Moves.get('Bide', 3))!.accuracy).toBe(100);
    expect((await Moves.get('Bide', 4))!.accuracy).toBe(true);
    expect((await Moves.get('Psychic', 3))!.category).not.toBeDefined();
    expect((await Moves.get('Psychic', 4))!.category).toBe('Special');
    expect((await Moves.get('Psychic', 5))!.defensiveCategory)
        .not.toBeDefined();
    expect((await Moves.get('Psyshock', 5))!.defensiveCategory)
        .toBe('Physical');
    expect((await Moves.get('Rock Slide'))!.target).toBe('allAdjacentFoes');
    expect((await Moves.get('Extreme Speed'))!.priority).toBe(2);
    expect((await Moves.get('Acid Armor', 1))!.flags).not.toBeDefined();
    expect((await Moves.get('Recover'))!.flags!.heal).toBe(1);
    expect((await Moves.get('Will-O-Wisp'))!.status).toBe('brn');
    expect((await Moves.get('Stealth Rock'))!.sideCondition)
        .toBe('stealthrock');
    expect((await Moves.get('Confuse Ray'))!.volatileStatus).toBe('confusion');
    expect((await Moves.get('Amnesia', 1))!.boosts).toEqual({spa: 2, spd: 2});
    expect((await Moves.get('Amnesia', 2))!.boosts).toEqual({spa: 0, spd: 2});
    expect((await Moves.get('Karate Chop'))!.critRatio).toBe(2);
    expect((await Moves.get('Frost Breath'))!.critRatio).toBe(1);
    expect((await Moves.get('Frost Breath'))!.willCrit).toBe(true);
    expect((await Moves.get('Bloom Doom'))!.isZ).toBe('grassiumz');
    expect((await Moves.get('Acid'))!.isZ).not.toBeDefined();
    expect((await Moves.get('Acid'))!.zMovePower).toBe(100);
    expect((await Moves.get('Acid', 6))!.zMovePower).not.toBeDefined();
    expect((await Moves.get('Hypnosis'))!.zMoveBoosts).toEqual({spe: 1});
    expect((await Moves.get('Double Kick'))!.multihit).toBe(2);
    expect((await Moves.get('Rock Blast'))!.multihit).toEqual([2, 5]);
    expect((await Moves.get('Softboiled'))!.percentHealed).toBe(50);
    expect((await Moves.get('Hi Jump Kick'))!.recoil).toBe('crash');
    expect((await Moves.get('Struggle'))!.recoil).toBe('Struggle');
    expect((await Moves.get('Double Edge', 1))!.recoil).toBe(25);
    expect((await Moves.get('Double Edge'))!.recoil).toBe(33);
    expect((await Moves.get('Mind Blown'))!.recoil).toBe(true);
    expect((await Moves.get('Feint'))!.breaksProtect).toBe(true);
    expect((await Moves.get('Sacred Sword'))!.ignoreDefensive).toBe(true);

    // self
    expect((await Moves.get('Petal Dance'))!.self!.volatileStatus)
        .toBe('lockedmove');
    expect((await Moves.get('Glitzy Glow'))!.self!.sideCondition)
        .toBe('lightscreen');
    expect((await Moves.get('Overheat'))!.self!.boosts).toEqual({spa: -2});

    // secondaries
    expect((await Moves.get('Thunder Fang'))!.secondaries!.length).toBe(2);
    expect((await Moves.get('Psychic', 1))!.secondaries![0].chance).toBe(33);
    expect((await Moves.get('Psychic', 2))!.secondaries![0].chance).toBe(10);
    expect((await Moves.get('Psychic', 1))!.secondaries![0].boosts)
        .toEqual({spa: -1, spd: -1});
    expect((await Moves.get('Psychic', 2))!.secondaries![0].boosts)
        .toEqual({spa: 0, spd: -1});
    expect((await Moves.get('Fire Blast'))!.secondaries![0].status).toBe('brn');
    expect((await Moves.get('Hurricane'))!.secondaries![0].volatileStatus)
        .toBe('confusion');
  });

  test('cached', async () => {
    const a = Moves.get('Earthquake', 6);
    const b = Moves.get('Earthquake', 6);
    const c = Moves.get('Earthquake');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Earthquake');
  });
});
