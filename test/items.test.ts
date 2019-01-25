import {Items} from '../items';

describe('Items', () => {
  test('deleted', async () => {
    expect(await Items.get('Berry', 3)).not.toBeDefined();
    expect(await Items.get('Gold Berry', 3)).not.toBeDefined();
    expect(await Items.get('Pink Bow', 3)).not.toBeDefined();
    expect(await Items.get('Polkadot Bow', 3)).not.toBeDefined();

    expect((await Items.get('berry', 2))!.name).toBe('Berry');
    expect((await Items.get('berry', 2))!.isBerry).toBe(true);
    expect((await Items.get('goldberry', 2))!.name).toBe('Gold Berry');
    expect((await Items.get('goldberry', 2))!.isBerry).toBe(true);
    expect(await Items.get('Pink Bow', 2)).toBeDefined();
    expect(await Items.get('Polkadot Bow', 2)).toBeDefined();
  });

  test('get', async () => {
    expect(await Items.get('foo')).not.toBeDefined();

    expect(await Items.get('Leftovers', 2))
        .toEqual(await Items.get('Leftovers'));
    expect(await Items.get('Sitrus Berry', 3))
        .not.toEqual(await Items.get('Sitrus Berry', 4));
  });

  test('fields', async () => {
    expect((await Items.get('Sitrus Berry', 4))!.isBerry).toBe(true);
    expect((await Items.get('Heracronite'))!.megaStone).toBe('Heracross-Mega');
    expect((await Items.get('Charizardite-X'))!.megaEvolves).toBe('Charizard');
    expect((await Items.get('Pikanium Z'))!.zMove).toBe('Catastropika');
    expect((await Items.get('Fairium Z'))!.zMove).toBe(true);
    expect((await Items.get('Steelium Z'))!.zMoveType).toBe('Steel');
    expect((await Items.get('Lunalium Z'))!.zMoveUser).toEqual([
      'Lunala', 'Necrozma-Dawn-Wings'
    ]);
    expect((await Items.get('Meadow Plate'))!.onPlate).toBe('Grass');
    expect((await Items.get('Electric Memory'))!.onMemory).toBe('Electric');
    expect((await Items.get('Douse Drive'))!.onDrive).toBe('Water');
    expect((await Items.get('Electric Gem', 6))!.isGem).toBe(true);
  });

  test('previous', async () => {
    // Gen for items which were previously key items became held items.
    expect(await Items.get('Red Orb', 3)).not.toBeDefined();
    expect((await Items.get('Red Orb', 6))!.gen).toBe(6);
    expect(await Items.get('Old Amber', 2)).not.toBeDefined();
    expect((await Items.get('Old Amber', 5))!.gen).toBe(4);
  });

  test('aliases', async () => {
    expect((await Items.get('salac'))!.name).toBe('Salac Berry');
    expect(await Items.get('salac', 2)).not.toBeDefined();
    expect((await Items.get('lo', 4))!.name).toBe('Life Orb');
    expect(await Items.get('')).not.toBeDefined();
    expect(await Items.get('', 2)).not.toBeDefined();  // '' + 'berry'
  });

  test('cached', async () => {
    const a = Items.get('Choice Band', 6);
    const b = Items.get('Choice Band', 6);
    const c = Items.get('Choice Band');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect((await b)).toBeDefined();
    expect((await b)!.name).toBe('Choice Band');
  });
});
