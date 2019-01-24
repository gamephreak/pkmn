import {readFileSync} from 'fs';

import {Sets} from '../sets';

function readSet(file: string) {
  return readFileSync(`${__dirname}/fixtures/sets/${file}`).toString();
}


describe('Sets', () => {
  test('importSet + exportSet', () => {
    let is = readSet('blissey.dpp.in');
    let os = readSet('blissey.dpp.out');
    expect(Sets.toString(Sets.fromString(is)!)).toEqual(os);

    is = readSet('marowak.gsc.in');
    // NOTE: we differ slightly from PS as we don't specify IV: 30 HP
    os = readSet('marowak.gsc.out');
    expect(Sets.exportSet(Sets.importSet(is, 2)!)).toEqual(os);

    is = readSet('magnezone.sm.in');
    os = readSet('magnezone.sm.out');
    expect(Sets.exportSet(Sets.importSet(is)!)).toEqual(os);
  });

  test('pack + unpack', () => {
    let is = readSet('m-alakazam.sm.in')!;
    let os = is;
    let u = Sets.unpack(Sets.pack(Sets.importSet(is)!))!;
    expect(Sets.exportSet(u)).toEqual(os);

    is = readSet('magnezone.sm.in')!;
    os = readSet('magnezone.sm.out');
    u = Sets.unpack(Sets.pack(Sets.importSet(is)!))!;
    expect(Sets.exportSet(u)).toEqual(os);
  });

  test('toJSON + fromJSON', () => {
    const s = readSet('m-alakazam.sm.in')!;
    const fj = Sets.fromJSON(Sets.toJSON(Sets.importSet(s)!))!;
    expect(Sets.exportSet(fj)).toEqual(s);

    expect(Sets.fromJSON('foo')).not.toBeDefined();
  });
});
