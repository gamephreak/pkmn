import {Items} from '../items';

describe('Items', () => {
  test('deleted', () => {
    expect(Items.get('Berry', 3)).not.toBeDefined();
    expect(Items.get('Gold Berry', 3)).not.toBeDefined();
    expect(Items.get('Pink Bow', 3)).not.toBeDefined();
    expect(Items.get('Polkadot Bow', 3)).not.toBeDefined();

    expect(Items.get('berry', 2)!.name).toBe('Berry');
    expect(Items.get('berry', 2)!.isBerry).toBe(true);
    expect(Items.get('goldberry', 2)!.name).toBe('Gold Berry');
    expect(Items.get('goldberry', 2)!.isBerry).toBe(true);
    expect(Items.get('Pink Bow', 2)).toBeDefined();
    expect(Items.get('Polkadot Bow', 2)).toBeDefined();
  });

  test('get', () => {
    expect(Items.get('foo')).not.toBeDefined();

    expect(Items.get('Leftovers', 2)).toEqual(Items.get('Leftovers'));
    expect(Items.get('Sitrus Berry', 3))
        .not.toEqual(Items.get('Sitrus Berry', 4));
  });

  test('fields', () => {
    expect(Items.get('Sitrus Berry', 4)!.isBerry).toBe(true);
    expect(Items.get('Heracronite')!.megaStone).toBe('Heracross-Mega');
    expect(Items.get('Charizardite-X')!.megaEvolves).toBe('Charizard');
    expect(Items.get('Pikanium Z')!.zMove).toBe('Catastropika');
    expect(Items.get('Fairium Z')!.zMove).toBe(true);
    expect(Items.get('Steelium Z')!.zMoveType).toBe('Steel');
    expect(Items.get('Lunalium Z')!.zMoveUser).toEqual([
      'Lunala', 'Necrozma-Dawn-Wings'
    ]);
    expect(Items.get('Meadow Plate')!.onPlate).toBe('Grass');
    expect(Items.get('Electric Memory')!.onMemory).toBe('Electric');
    expect(Items.get('Douse Drive')!.onDrive).toBe('Water');
    expect(Items.get('Electric Gem', 6)!.isGem).toBe(true);
  });

  test('previous', () => {
    // Gen for items which were previously key items became held items.
    expect(Items.get('Red Orb', 3)).not.toBeDefined();
    expect(Items.get('Red Orb', 6)!.gen).toBe(6);
    expect(Items.get('Old Amber', 2)).not.toBeDefined();
    expect(Items.get('Old Amber', 5)!.gen).toBe(4);
  });

  test('aliases', () => {
    expect(Items.get('salac')!.name).toBe('Salac Berry');
    expect(Items.get('salac', 2)).not.toBeDefined();
    expect(Items.get('lo', 4)!.name).toBe('Life Orb');
    expect(Items.get('')).not.toBeDefined();
    expect(Items.get('', 2)).not.toBeDefined();  // '' + 'berry'
  });

  test('cached', () => {
    const a = Items.get('Choice Band', 6);
    const b = Items.get('Choice Band', 6);
    const c = Items.get('Choice Band');

    expect(b).toBe(a);
    expect(c).not.toBe(a);
    expect(b).toBeDefined();
    expect(b!.name).toBe('Choice Band');
  });
});
