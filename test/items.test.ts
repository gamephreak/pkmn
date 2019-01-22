import {Items} from '../items';

describe('Items', () => {
  test('getItem', () => {
    expect(Items.getItem('foo')).not.toBeDefined();

    expect(Items.getItem('Berry', 3)).not.toBeDefined();
    expect(Items.getItem('Gold Berry', 3)).not.toBeDefined();
    expect(Items.getItem('Pink Bow', 3)).not.toBeDefined();
    expect(Items.getItem('Polkadot Bow', 3)).not.toBeDefined();

    expect(Items.getItem('berry', 2)!.name).toBe('Berry');
    expect(Items.getItem('berry', 2)!.isBerry).toBe(true);
    expect(Items.getItem('goldberry', 2)!.name).toBe('Gold Berry');
    expect(Items.getItem('goldberry', 2)!.isBerry).toBe(true);
    expect(Items.getItem('Pink Bow', 2)).toBeDefined();
    expect(Items.getItem('Polkadot Bow', 2)).toBeDefined();

    expect(Items.getItem('Leftovers', 2)).toEqual(Items.getItem('Leftovers'));
    expect(Items.getItem('Sitrus Berry', 3))
        .not.toEqual(Items.getItem('Sitrus Berry', 4));

    expect(Items.getItem('Sitrus Berry', 4)!.isBerry).toBe(true);
    expect(Items.getItem('Heracronite')!.megaStone).toBe('Heracross-Mega');
    expect(Items.getItem('Charizardite-X')!.megaEvolves).toBe('Charizard');
    expect(Items.getItem('Pikanium Z')!.zMove).toBe('Catastropika');
    expect(Items.getItem('Fairium Z')!.zMove).toBe(true);
    expect(Items.getItem('Steelium Z')!.zMoveType).toBe('Steel');
    expect(Items.getItem('Lunalium Z')!.zMoveUser).toEqual([
      'Lunala', 'Necrozma-Dawn-Wings'
    ]);

    // Gen for items which were previously key items became held items.
    expect(Items.getItem('Red Orb', 3)).not.toBeDefined();
    expect(Items.getItem('Red Orb', 6)!.gen).toBe(6);
    expect(Items.getItem('Old Amber', 2)).not.toBeDefined();
    expect(Items.getItem('Old Amber', 5)!.gen).toBe(4);

    expect(Items.getItem('salac')!.name).toBe('Salac Berry');
    expect(Items.getItem('salac', 2)).not.toBeDefined();
    expect(Items.getItem('lo', 4)!.name).toBe('Life Orb');
    expect(Items.getItem('')).not.toBeDefined();
    expect(Items.getItem('', 2)).not.toBeDefined();  // '' + 'berry'
  });
});
