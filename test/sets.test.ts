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
    expect(Sets.exportSet(Sets.importSet(is, 2)!, false, 2)).toEqual(os);

    is = readSet('magnezone.sm.in');
    os = readSet('magnezone.sm.out');
    expect(Sets.exportSet(Sets.importSet(is)!)).toEqual(os);

    is = readSet('tauros.rby.in');
    os = readSet('tauros.rby.out');
    expect(Sets.exportSet(Sets.importSet(is)!)).toEqual(os);

    is = readSet('fake.in')!;
    os = is;
    expect(Sets.exportSet(Sets.importSet(is)!)).toEqual(os);

    expect(Sets.importSet('')).not.toBeDefined();
  });

  test('pack + unpack', () => {
    let is = readSet('m-alakazam.sm.in')!;
    let os = readSet('m-alakazam.sm.out')!;
    let u = Sets.unpack(Sets.pack(Sets.importSet(is)!))!;
    expect(Sets.exportSet(u)).toEqual(os);

    u = Sets.unpack(readSet('tangrowth.sm.in'))!;
    expect(Sets.unpack(Sets.pack(u))!).toEqual(u);
    expect(Sets.exportSet(u)).toEqual(readSet('tangrowth.sm.out'));

    is = readSet('magnezone.sm.in')!;
    os = readSet('magnezone.sm.out');
    u = Sets.unpack(Sets.pack(Sets.importSet(is, 7)!))!;
    expect(Sets.exportSet(u, false, 7)).toEqual(os);

    is = readSet('tauros.rby.in')!;
    os = readSet('tauros.rby.unpack.out');
    u = Sets.unpack(Sets.pack(Sets.importSet(is, 1)!))!;
    expect(Sets.exportSet(u)).toEqual(os);

    is = readSet('blissey.dpp.in')!;
    os = readSet('blissey.dpp.unpack.out');
    u = Sets.unpack(Sets.pack(Sets.importSet(is)!))!;
    expect(Sets.exportSet(u, true)).toEqual(os);

    is = readSet('fake.in')!;
    os = readSet('fake.out');
    u = Sets.unpack(Sets.pack(Sets.importSet(is)!))!;
    expect(Sets.exportSet(u)).toEqual(os);
  });

  test('toJSON + fromJSON', () => {
    const is = readSet('m-alakazam.sm.in')!;
    const os = readSet('m-alakazam.sm.out')!;
    const fj = Sets.fromJSON(Sets.toJSON(Sets.importSet(is)!))!;
    expect(Sets.exportSet(fj)).toEqual(os);

    expect(Sets.fromJSON('foo')).not.toBeDefined();
  });
});
