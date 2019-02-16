import {CURRENT, Generation} from '../gen';
import {Moves} from '../moves';

describe('Moves', () => {
  test('forGen', () => {
    expect(Object.keys(Moves.forGen(1)).length).toBe(165);
    // NOTE: 16 'Hidden Power X' moves included.
    expect(Object.keys(Moves.forGen(2)).length).toBe(165 + 86 + 16);
    // NOTE: Honko seems to think 'Mega Drain' and 'Acid' were removed...
    expect(Object.keys(Moves.forGen(3)).length).toBe(165 + 86 + 16 + 103);
    expect(Object.keys(Moves.forGen(4)).length).toBe(165 + 86 + 16 + 103 + 113);
    expect(Object.keys(Moves.forGen(5)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 92);
    expect(Object.keys(Moves.forGen(6)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 92 + 62);
    // NOTE: 14 moves are from LGPE
    expect(Object.keys(Moves.forGen(7)).length)
        .toBe(165 + 86 + 16 + 103 + 113 + 92 + 62 + 103 - 14);
  });

  test('get', () => {
    expect(Moves.get('foo')).not.toBeDefined();
    expect(Moves.get('Thunderbolt', 1)).toBeDefined();

    // alias
    expect(Moves.get('eq', 6)).toEqual(Moves.get('Earthquake', 6));

    // hidden power
    expect(Moves.get('Hidden Power [Bug]')!.name).toBe('Hidden Power Bug');
  });

  test('fields', () => {
    expect(Moves.get('Tackle')!.kind).toBe('move');
    expect(Moves.get('Surf', 1)!.basePower).toBe(95);
    expect(Moves.get('Surf')!.basePower).toBe(90);
    expect(Moves.get('Curse', 4)!.type).toBe('???');
    expect(Moves.get('Curse', 5)!.type).toBe('Ghost');
    expect(Moves.get('Struggle', 1)!.pp).toBe(10);
    expect(Moves.get('Struggle', 2)!.pp).toBe(1);
    expect(Moves.get('Bide', 3)!.accuracy).toBe(100);
    expect(Moves.get('Bide', 4)!.accuracy).toBe(true);
    expect(Moves.get('Psychic', 3)!.category).not.toBeDefined();
    expect(Moves.get('Psychic', 4)!.category).toBe('Special');
    expect(Moves.get('Psychic', 5)!.defensiveCategory).not.toBeDefined();
    expect(Moves.get('Psyshock', 5)!.defensiveCategory).toBe('Physical');
    expect(Moves.get('Rock Slide')!.target).toBe('allAdjacentFoes');
    expect(Moves.get('Extreme Speed')!.priority).toBe(2);
    expect(Moves.get('Acid Armor', 1)!.flags).not.toBeDefined();
    expect(Moves.get('Recover')!.flags!.heal).toBe(1);
    expect(Moves.get('Will-O-Wisp')!.status).toBe('brn');
    expect(Moves.get('Stealth Rock')!.sideCondition).toBe('stealthrock');
    expect(Moves.get('Confuse Ray')!.volatileStatus).toBe('confusion');
    expect(Moves.get('Amnesia', 1)!.boosts).toEqual({spa: 2, spd: 2});
    expect(Moves.get('Amnesia', 2)!.boosts).toEqual({spa: 0, spd: 2});
    expect(Moves.get('Karate Chop')!.critRatio).toBe(2);
    expect(Moves.get('Frost Breath')!.critRatio).toBe(1);
    expect(Moves.get('Frost Breath')!.willCrit).toBe(true);
    expect(Moves.get('Bloom Doom')!.isZ).toBe('grassiumz');
    expect(Moves.get('Acid')!.isZ).not.toBeDefined();
    expect(Moves.get('Acid')!.zMovePower).toBe(100);
    expect(Moves.get('Acid', 6)!.zMovePower).not.toBeDefined();
    expect(Moves.get('Hypnosis')!.zMoveBoosts).toEqual({spe: 1});
    expect(Moves.get('Double Kick')!.multihit).toBe(2);
    expect(Moves.get('Rock Blast')!.multihit).toEqual([2, 5]);
    expect(Moves.get('Softboiled')!.percentHealed).toBe(50);
    expect(Moves.get('Hi Jump Kick')!.recoil).toBe('crash');
    expect(Moves.get('Struggle')!.recoil).toBe('Struggle');
    expect(Moves.get('Double Edge', 1)!.recoil).toBe(25);
    expect(Moves.get('Double Edge')!.recoil).toBe(33);
    expect(Moves.get('Mind Blown')!.recoil).toBe(true);
    expect(Moves.get('Feint')!.breaksProtect).toBe(true);
    expect(Moves.get('Sacred Sword')!.ignoreDefensive).toBe(true);
    expect(Moves.get('Fissure')!.ohko).toBe(true);

    // self
    expect(Moves.get('Petal Dance')!.self!.volatileStatus).toBe('lockedmove');
    expect(Moves.get('Overheat')!.self!.boosts).toEqual({spa: -2});

    // secondaries
    expect(Moves.get('Thunder Fang')!.secondaries!.length).toBe(2);
    expect(Moves.get('Psychic', 1)!.secondaries![0].chance).toBe(33);
    expect(Moves.get('Psychic', 2)!.secondaries![0].chance).toBe(10);
    expect(Moves.get('Psychic', 1)!.secondaries![0].boosts)
        .toEqual({spa: -1, spd: -1});
    expect(Moves.get('Psychic', 2)!.secondaries![0].boosts)
        .toEqual({spa: 0, spd: -1});
    expect(Moves.get('Fire Blast')!.secondaries![0].status).toBe('brn');
    expect(Moves.get('Hurricane')!.secondaries![0].volatileStatus)
        .toBe('confusion');
  });

  test('cached', () => {
    const a = Moves.get('Earthquake', 6);
    const b = Moves.get('Earthquake', 6);
    const c = Moves.get('Earthquake');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect(b).toBeDefined();
    expect(b!.name).toBe('Earthquake');
  });
});
