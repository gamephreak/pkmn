import {toID} from './id';
import {Stat, StatsTable} from './stats';

export type PokemonSet = {
  readonly name: string;
  readonly species: string;
  readonly item: string;
  readonly ability: string;
  readonly moves: string[];
  readonly nature: string;
  readonly evs: StatsTable;
  readonly ivs: StatsTable;
  readonly gender?: string;
  readonly level?: number;
  readonly shiny?: boolean;
  readonly happiness?: number;
  readonly pokeball?: string;
  readonly hpType?: string;
};

export class Sets {
  static pack(s: PokemonSet): string {
    return Sets.packSet(s);
  }

  static packSet(s: PokemonSet, buf = ''): string {
    if (buf) buf += ']';

    // name
    buf += (s.name || s.species);

    // species
    const id = toID(s.species || s.name);
    buf += '|' + (toID(s.name || s.species) === id ? '' : id);

    // item
    buf += '|' + toID(s.item);

    /* TODO
    // ability
     let template = dexes['base'].getTemplate(s.species || s.name);
     let abilities = template.abilities;
     id = toID(s.ability);
     if (abilities) {
     if (id === toID(abilities['0'])) {
     buf += '|';
    } else if (id === toID(abilities['1'])) {
     buf += '|1';
    } else if (id === toID(abilities['H'])) {
     buf += '|H';
    } else {
     buf += '|' + id;
    }
    } else {
     buf += '|' + id;
    } */

    // moves
    let hasHP = false;
    buf += '|';
    if (s.moves) {
      for (let j = 0; j < s.moves.length; j++) {
        const moveid = toID(s.moves[j]);
        if (j && !moveid) continue;
        buf += (j ? ',' : '') + moveid;
        if (moveid.substr(0, 11) === 'hiddenpower' && moveid.length > 11) {
          hasHP = true;
        }
      }
    }

    // nature
    buf += '|' + (s.nature || '');

    // evs
    let evs = '|';
    if (s.evs) {
      evs = '|' + (s.evs['hp'] || '') + ',' + (s.evs['atk'] || '') + ',' +
          (s.evs['def'] || '') + ',' + (s.evs['spa'] || '') + ',' +
          (s.evs['spd'] || '') + ',' + (s.evs['spe'] || '');
    }
    if (evs === '|,,,,,') {
      buf += '|';
    } else {
      buf += evs;
    }

    // gender
    /* TODO
     if (s.gender && s.gender !== template.gender) {
     buf += '|' + s.gender;
    } else {
     buf += '|';
    }*/

    const getIV = (set: PokemonSet, s: Stat): string => {
      return set.ivs[s] === 31 || set.ivs[s] === undefined ?
          '' :
          set.ivs[s].toString();
    };

    // ivs
    let ivs = '|';
    if (s.ivs) {
      ivs = '|' + getIV(s, 'hp') + ',' + getIV(s, 'atk') + ',' +
          getIV(s, 'def') + ',' + getIV(s, 'spa') + ',' + getIV(s, 'spd') +
          ',' + getIV(s, 'spe');
    }
    if (ivs === '|,,,,,') {
      buf += '|';
    } else {
      buf += ivs;
    }

    // shiny
    if (s.shiny) {
      buf += '|S';
    } else {
      buf += '|';
    }

    // level
    if (s.level && s.level !== 100) {
      buf += '|' + s.level;
    } else {
      buf += '|';
    }

    // happiness
    if (s.happiness !== undefined && s.happiness !== 255) {
      buf += '|' + s.happiness;
    } else {
      buf += '|';
    }

    if (s.pokeball || (s.hpType && !hasHP)) {
      buf += ',' + (s.hpType || '');
      buf += ',' + toID(s.pokeball);
    }

    return buf;
  }

  static exportSet(s: PokemonSet): string {
    return '';  // TODO
  }

  static unpack(buf: string): PokemonSet|undefined {
    return Sets.unpackSet(buf);
  }

  static unpackSet(buf: string): PokemonSet|undefined {
    return _unpack(buf).set;
  }

  static importSet(buf: string): PokemonSet|undefined {
    return undefined;  // TODO
  }

  static toJSON(s: PokemonSet): string {
    return JSON.stringify(s);
  }

  static fromJSON(json: string): PokemonSet|undefined {
    if (json.charAt(0) !== '{' || json.charAt(json.length - 1) !== '}') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    return JSON.parse(json);
  }

  static toString(s: PokemonSet): string {
    return Sets.exportSet(s);
  }

  static fromString(str: string): PokemonSet|undefined {
    return Sets.importSet(str);
  }
}

export function _unpack(
    buf: string, i = 0, j = 0): {set?: PokemonSet, i: number, j: number} {
  // name
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const name: string = buf.substring(i, j);
  i = j + 1;

  // species
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const species: string = buf.substring(i, j) || name;
  i = j + 1;

  // item
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const item: string = buf.substring(i, j);
  i = j + 1;

  // ability
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const ability: string = buf.substring(i, j);
  /* TODO
    var template = Dex.getTemplate(set.species);
    ability = (template.abilities && ability in {'':1, 0:1, 1:1, H:1} ?
    template.abilities[ability || '0'] : ability);

    let template = dexes['base'].getTemplate(s.species);
    ability = (template.abilities && ['', '0', '1', 'H'].includes(ability) ?
      template.abilities[ability || '0'] : ability);
   */
  i = j + 1;

  // moves
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const moves: string[] = buf.substring(i, j).split(',', 24).filter(x => x);
  i = j + 1;

  // nature
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const nature: string = buf.substring(i, j);
  i = j + 1;

  // evs
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const evs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
  if (j !== i) {
    const evstr = buf.substring(i, j);
    if (evstr.length > 5) {
      const s = evstr.split(',');
      evs.hp = Number(s[0]) || evs.hp;
      evs.atk = Number(s[1]) || evs.atk;
      evs.def = Number(s[2]) || evs.def;
      evs.spa = Number(s[3]) || evs.spa;
      evs.spd = Number(s[4]) || evs.spd;
      evs.spe = Number(s[5]) || evs.spe;
    }
  }
  i = j + 1;

  // gender
  let gender: string|undefined = undefined;
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  if (i !== j) gender = buf.substring(i, j);
  i = j + 1;

  // ivs
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  const ivs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
  if (j !== i) {
    const s = buf.substring(i, j).split(',', 6);
    ivs.hp = s[0] === '' ? 31 : Number(s[0]) || ivs.hp;
    ivs.atk = s[1] === '' ? 31 : Number(s[1]) || ivs.atk;
    ivs.def = s[2] === '' ? 31 : Number(s[2]) || ivs.def;
    ivs.spa = s[3] === '' ? 31 : Number(s[3]) || ivs.spa;
    ivs.spd = s[4] === '' ? 31 : Number(s[4]) || ivs.spd;
    ivs.spe = s[5] === '' ? 31 : Number(s[5]) || ivs.spe;
  }
  i = j + 1;

  // shiny
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  let shiny: boolean|undefined = undefined;
  if (i !== j) shiny = true;
  i = j + 1;

  // level
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  let level: number|undefined = undefined;
  // tslint:disable-next-line:ban
  if (i !== j) level = parseInt(buf.substring(i, j), 10);
  i = j + 1;

  // happiness
  j = buf.indexOf(']', i);
  let misc;
  if (j < 0) {
    if (i < buf.length) misc = buf.substring(i).split(',', 3);
  } else {
    if (i !== j) misc = buf.substring(i, j).split(',', 3);
  }

  let happiness: number|undefined = undefined;
  let hpType: string|undefined = undefined;
  let pokeball: string|undefined = undefined;
  if (misc) {
    happiness = (misc[0] ? Number(misc[0]) : 255);
    hpType = misc[1];
    pokeball = misc[2];
  }

  return {
    set: {
      name,
      species,
      item,
      ability,
      moves,
      nature,
      evs,
      ivs,
      gender,
      level,
      shiny,
      happiness,
      pokeball,
      hpType
    },
    i,
    j
  };
}
