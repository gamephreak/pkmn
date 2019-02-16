import {Effects} from '../effect';

describe('Effects', () => {
  test('get', () => {
    expect(Effects.get('')).not.toBeDefined();
    expect(Effects.get('foo')).not.toBeDefined();

    expect(Effects.get('move: Thunderbolt')!.name).toBe('Thunderbolt');
    expect(Effects.get('move: Foo')).not.toBeDefined();
    expect(Effects.get('eq')!.name).toBe('Earthquake');

    expect(Effects.get('ability: Flash Fire')!.name).toBe('Flash Fire');
    expect(Effects.get('ability: Foo')).not.toBeDefined();
    expect(Effects.get('illuminatE')!.name).toBe('Illuminate');


    expect(Effects.get('item: Choice Band')!.name).toBe('Choice Band');
    expect(Effects.get('item: Foo')).not.toBeDefined();
    expect(Effects.get('sash')!.name).toBe('Focus Sash');

    expect(Effects.get('item: Metronome')!.name).toBe('Metronome');
    expect(Effects.get('item: Metronome')!.kind).toBe('item');
    expect(Effects.get('Metronome')!.kind).toBe('move');
  });

  test('toString', () => {
    expect(Effects.toString(Effects.get('Water Gun')!)).toBe('move: Water Gun');
    expect(Effects.toString(Effects.get('Anger Point')!))
        .toBe('ability: Anger Point');
    expect(Effects.toString(Effects.get('Zoom Lens')!)).toBe('item: Zoom Lens');
  });
});
