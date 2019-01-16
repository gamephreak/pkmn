import {Item, Items} from '../items';

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
  });
});
