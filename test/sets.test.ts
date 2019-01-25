import {readFileSync} from 'fs';

import {Sets} from '../sets';

function readSet(file: string) {
  return readFileSync(`${__dirname}/fixtures/sets/${file}`).toString();
}

describe('Sets', () => {
  test('importSet + exportSet', async () => {
    let is = readSet('blissey.dpp.in');
    let os = readSet('blissey.dpp.out');
    expect(await Sets.toString((await Sets.fromString(is))!)).toEqual(os);

    is = readSet('marowak.gsc.in');
    // NOTE: we differ slightly from PS as we don't specify IV: 30 HP
    os = readSet('marowak.gsc.out');
    expect(await Sets.exportSet((await Sets.importSet(is, 2))!, false, 2))
        .toEqual(os);

    is = readSet('magnezone.sm.in');
    os = readSet('magnezone.sm.out');
    expect(await Sets.exportSet((await Sets.importSet(is))!)).toEqual(os);

    is = readSet('tauros.rby.in');
    os = readSet('tauros.rby.out');
    expect(await Sets.exportSet((await Sets.importSet(is))!)).toEqual(os);

    is = readSet('fake.in')!;
    os = is;
    expect(await Sets.exportSet((await Sets.importSet(is))!)).toEqual(os);

    expect(await Sets.importSet('')).not.toBeDefined();
  });

  test('pack + unpack', async () => {
    let is = readSet('m-alakazam.sm.in')!;
    let os = readSet('m-alakazam.sm.out')!;
    let u = (await Sets.unpack(await Sets.pack((await Sets.importSet(is))!)))!;
    expect(await Sets.exportSet(u)).toEqual(os);

    u = (await Sets.unpack(readSet('tangrowth.sm.in')))!;
    expect((await Sets.unpack(await Sets.pack(u)))!).toEqual(u);
    expect(await Sets.exportSet(u)).toEqual(readSet('tangrowth.sm.out'));

    is = readSet('magnezone.sm.in')!;
    os = readSet('magnezone.sm.out');
    u = (await Sets.unpack(await Sets.pack((await Sets.importSet(is, 7))!)))!;
    expect(await Sets.exportSet(u, false, 7)).toEqual(os);

    is = readSet('tauros.rby.in')!;
    os = readSet('tauros.rby.unpack.out');
    u = (await Sets.unpack(await Sets.pack((await Sets.importSet(is, 1))!)))!;
    expect(await Sets.exportSet(u)).toEqual(os);

    is = readSet('blissey.dpp.in')!;
    os = readSet('blissey.dpp.unpack.out');
    u = (await Sets.unpack(await Sets.pack((await Sets.importSet(is))!)))!;
    expect(await Sets.exportSet(u, true)).toEqual(os);

    is = readSet('fake.in')!;
    os = readSet('fake.out');
    u = (await Sets.unpack(await Sets.pack((await Sets.importSet(is))!)))!;
    expect(await Sets.exportSet(u)).toEqual(os);
  });

  test('toJSON + fromJSON', async () => {
    const is = readSet('m-alakazam.sm.in')!;
    const os = readSet('m-alakazam.sm.out')!;
    const fj = Sets.fromJSON(Sets.toJSON((await Sets.importSet(is))!))!;
    expect(await Sets.exportSet(fj)).toEqual(os);

    expect(Sets.fromJSON('foo')).not.toBeDefined();
  });
});
