import {Items} from '../items';

describe('Items', () => {
  test('deleted', async () => {
    expect(await Items.getItem('Berry', 3)).not.toBeDefined();
    expect(await Items.getItem('Gold Berry', 3)).not.toBeDefined();
    expect(await Items.getItem('Pink Bow', 3)).not.toBeDefined();
    expect(await Items.getItem('Polkadot Bow', 3)).not.toBeDefined();

    expect((await Items.getItem('berry', 2))!.name).toBe('Berry');
    expect((await Items.getItem('berry', 2))!.isBerry).toBe(true);
    expect((await Items.getItem('goldberry', 2))!.name).toBe('Gold Berry');
    expect((await Items.getItem('goldberry', 2))!.isBerry).toBe(true);
    expect(await Items.getItem('Pink Bow', 2)).toBeDefined();
    expect(await Items.getItem('Polkadot Bow', 2)).toBeDefined();
  });

  test('getItem', async () => {
    expect(await Items.getItem('foo')).not.toBeDefined();

    expect(await Items.getItem('Leftovers', 2))
        .toEqual(await Items.getItem('Leftovers'));
    expect(await Items.getItem('Sitrus Berry', 3))
        .not.toEqual(await Items.getItem('Sitrus Berry', 4));
  });

  test('fields', async () => {
    expect((await Items.getItem('Sitrus Berry', 4))!.isBerry).toBe(true);
    expect((await Items.getItem('Heracronite'))!.megaStone)
        .toBe('Heracross-Mega');
    expect((await Items.getItem('Charizardite-X'))!.megaEvolves)
        .toBe('Charizard');
    expect((await Items.getItem('Pikanium Z'))!.zMove).toBe('Catastropika');
    expect((await Items.getItem('Fairium Z'))!.zMove).toBe(true);
    expect((await Items.getItem('Steelium Z'))!.zMoveType).toBe('Steel');
    expect((await Items.getItem('Lunalium Z'))!.zMoveUser).toEqual([
      'Lunala', 'Necrozma-Dawn-Wings'
    ]);
    expect((await Items.getItem('Meadow Plate'))!.onPlate).toBe('Grass');
    expect((await Items.getItem('Electric Memory'))!.onMemory).toBe('Electric');
    expect((await Items.getItem('Douse Drive'))!.onDrive).toBe('Water');
    expect((await Items.getItem('Electric Gem', 6))!.isGem).toBe(true);
  });

  test('previous', async () => {
    // Gen for items which were previously key items became held items.
    expect(await Items.getItem('Red Orb', 3)).not.toBeDefined();
    expect((await Items.getItem('Red Orb', 6))!.gen).toBe(6);
    expect(await Items.getItem('Old Amber', 2)).not.toBeDefined();
    expect((await Items.getItem('Old Amber', 5))!.gen).toBe(4);
  });

  test('aliases', async () => {
    expect((await Items.getItem('salac'))!.name).toBe('Salac Berry');
    expect(await Items.getItem('salac', 2)).not.toBeDefined();
    expect((await Items.getItem('lo', 4))!.name).toBe('Life Orb');
    expect(await Items.getItem('')).not.toBeDefined();
    expect(await Items.getItem('', 2)).not.toBeDefined();  // '' + 'berry'
  });
});
