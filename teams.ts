import {CURRENT, Generation} from './gen';
import {_import, _unpack, PokemonSet, Sets} from './sets';
import {Tier, Tiers} from './tiers';

export class Team {
  constructor(
      readonly team: Readonly<PokemonSet[]>, readonly format?: string,
      readonly name?: string, readonly folder?: string) {
    this.team = team;
    this.format = format;
    this.name = name;
    this.folder = folder;
  }

  gen(): Generation|undefined {
    if (!this.format) return undefined;
    // BUG: this will break in ~10 years when gen10 gets released...
    return (this.format.slice(0, 3) !== 'gen' ? 6 : Number(this.format[3])) as
        Generation;
  }

  tier(): Tier|undefined {
    if (!this.format) return undefined;
    // BUG: this will break in ~10 years when gen10 gets released...
    return this.format.slice(0, 3) === 'gen' ?
        Tiers.fromString(this.format.slice(4)) :
        Tiers.fromString(this.format);
  }

  pack(): string {
    return this.packTeam();
  }

  packTeam(): string {
    let buf = '';
    for (const s of this.team) {
      buf += Sets.packSet(s, buf);
    }
    return buf;
  }

  exportTeam(gen?: Generation): string {
    let buf = '';
    for (const s of this.team) {
      buf += Sets.exportSet(s, gen || this.gen()) + '\n';
    }
    return buf.trim();
  }

  toString(gen?: Generation): string {
    return this.exportTeam(gen);
  }

  toJSON(): string {
    return JSON.stringify(this.team);
  }
}

export class Teams {
  static unpack(buf: string): Team|undefined {
    return Teams.unpackTeam(buf);
  }

  static unpackTeam(buf: string): Team|undefined {
    if (!buf) return undefined;
    if (buf.charAt(0) === '[' && buf.charAt(buf.length - 1) === ']') {
      return Teams.fromJSON(buf);
    }

    const team: PokemonSet[] = [];
    let i = 0, j = 0;

    while (true) {
      const r = _unpack(buf, i, j);
      if (!r.set) return undefined;

      team.push(r.set);
      i = r.i;
      j = r.j;

      if (j < 0) break;
      i = j + 1;
    }

    return new Team(team);
  }

  static importTeam(buf: string,  gen?: Generation): Team|undefined {
    return undefined;  // TODO use same pattern as _import but for team
  }

  static importTeams(buf: string): Team[] {
    const lines = buf.split('\n');
    if (lines.length === 1 || (lines.length === 2 && !lines[1])) {
      const team: Team|undefined = Teams.unpackTeam(lines[0]);
      return team ? [team] : [];
    }

    const teams: Team[] = [];

    let setImport: number = -1;
    let team: PokemonSet[] = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (line.substr(0, 3) === '===') {
        line = line.substr(3, line.length - 6).trim();
        let format = 'gen7';
        const bracketIndex = line.indexOf(']');
        if (bracketIndex >= 0) {
          format = line.substr(1, bracketIndex - 1);
          if (format && format.slice(0, 3) !== 'gen') format = 'gen6' + format;
          line = line.substr(bracketIndex + 1).trim();
        }

        const slashIndex = line.lastIndexOf('/');
        let folder = '';
        if (slashIndex > 0) {
          folder = line.slice(0, slashIndex);
          line = line.slice(slashIndex + 1);
        }

        teams.push(new Team(team, format, line, folder));
        if (i) team = [];
      } else if (line.includes('|')) {
        // packed format
        const t: Team|undefined = unpackLine(line);
        if (t) teams.push(t);
      } else if (setImport !== i) {
        const r = _import(lines, i);
        if (r.set) team.push(r.set);
        if (r.line === i) {
          continue;
        }
        // Reread the line to find out if we can process what _import couldn't
        setImport = r.line;
        i = setImport - 1;
      }
    }

    return teams;
  }

  static exportTeams(teams: Readonly<Team[]>, gen?: Generation): string {
    let buf = '';

    for (const team of teams) {
      buf += '=== ' + (team.format ? '[' + team.format + '] ' : '') +
          (team.folder ? '' + team.folder + '/' : '') + team.name + ' ===\n\n';
      buf += team.exportTeam(gen);
      buf += '\n';
    }
    return buf;
  }

  static fromJSON(json: string): Team|undefined {
    if (json.charAt(0) !== '[' || json.charAt(json.length - 1) !== ']') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    const team: PokemonSet[] = JSON.parse(json);
    return new Team(team);
  }

  static fromString(str: string): Team|undefined {
    return Teams.importTeam(str);
  }
}

function unpackLine(line: string): Team|undefined {
  const pipeIndex = line.indexOf('|');
  if (pipeIndex < 0) return undefined;

  let bracketIndex = line.indexOf(']');
  if (bracketIndex > pipeIndex) bracketIndex = -1;

  let slashIndex = line.lastIndexOf('/', pipeIndex);
  // line.slice(slashIndex + 1, pipeIndex) will be ''
  if (slashIndex < 0) slashIndex = bracketIndex;

  let format = bracketIndex > 0 ? line.slice(0, bracketIndex) : 'gen7';
  if (format && format.slice(0, 3) !== 'gen') format = 'gen6' + format;

  const team: Team|undefined = Teams.unpackTeam(line.slice(pipeIndex + 1));
  return !team ?
      team :
      new Team(
          team.team,
          format,
          line.slice(slashIndex + 1, pipeIndex),
          line.slice(
              bracketIndex + 1, slashIndex > 0 ? slashIndex : bracketIndex + 1),
      );
}
