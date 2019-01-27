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

  pack(gen?: Generation): Promise<string> {
    return Teams.packTeam(this, gen || this.gen());
  }

  static unpack(buf: string, gen?: Generation): Promise<Team|undefined> {
    return Teams.unpackTeam(buf, gen);
  }

  async export(fast?: boolean, gen?: Generation): Promise<string> {
    let buf = '';
    for (const s of this.team) {
      buf += await Sets.exportSet(s, fast, gen || this.gen());
    }
    return buf;
  }

  static import(buf: string, gen?: Generation): Promise<Team|undefined> {
    return Teams.importTeam(buf, gen);
  }

  toString(fast?: boolean, gen?: Generation): Promise<string> {
    return this.export(fast, gen);
  }

  static fromString(str: string, gen?: Generation): Promise<Team|undefined> {
    return Teams.importTeam(str, gen);
  }

  toJSON(): string {
    return JSON.stringify(this.team);
  }

  static fromJSON(json: string): Team|undefined {
    if (json.charAt(0) !== '[' || json.charAt(json.length - 1) !== ']') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    const team: PokemonSet[] = JSON.parse(json);
    return new Team(team);
  }
}

export class Teams {
  // istanbul ignore next
  protected constructor() {}

  static async packTeam(team: Team, gen?: Generation): Promise<string> {
    let buf = '';
    for (const s of team.team) {
      if (buf) buf += ']';
      buf += await Sets.packSet(s, gen);
    }
    return buf;
  }

  static async unpackTeam(buf: string, gen?: Generation):
      Promise<Team|undefined> {
    if (!buf) return undefined;
    if (buf.charAt(0) === '[' && buf.charAt(buf.length - 1) === ']') {
      return Promise.resolve(Team.fromJSON(buf));
    }

    const team: PokemonSet[] = [];
    let i = 0, j = 0;

    while (true) {
      const r = await _unpack(buf, i, j, gen);
      if (!r.set) return undefined;

      team.push(r.set);
      i = r.i;
      j = r.j;

      if (j < 0) break;
      i = j + 1;
    }

    return new Team(team);
  }

  static async importTeam(buf: string, gen?: Generation):
      Promise<Team|undefined> {
    const teams = await Teams.importTeams(buf, gen, true);
    return teams.length ? teams[0] : undefined;
  }

  static async importTeams(buf: string, gen?: Generation, one?: boolean):
      Promise<Readonly<Team[]>> {
    const lines = buf.split('\n');
    if (lines.length === 1 || (lines.length === 2 && !lines[1])) {
      const team: Team|undefined = await Teams.unpackTeam(lines[0], gen);
      return team ? [team] : [];
    }

    const teams: Team[] = [];

    let setLine = -1;
    let team: PokemonSet[] = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (line.substr(0, 3) === '===') {
        if (one && teams.length) return teams;
        team = [];
        line = line.substr(3, line.length - 6).trim();
        let format = 'gen' + (gen || CURRENT);
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
      } else if (line.includes('|')) {
        // packed format
        const t: Team|undefined = await unpackLine(line, gen);
        if (t) teams.push(t);
      } else if (setLine !== i) {
        const r = await _import(lines, i, gen);
        if (r.set) team.push(r.set);
        if (r.line === i) {
          continue;
        }
        // Reread the line to find out if we can process what _import couldn't
        setLine = r.line;
        i = setLine - 1;
      }
    }

    // If we made it here we read in some sets but there was no '===' marker
    // in the file so we assume only one (unnamed) team.
    if (team.length && !teams.length) {
      teams.push(new Team(team));
    }

    return teams;
  }

  static async exportTeams(
      teams: Readonly<Team[]>, fast?: boolean,
      gen?: Generation): Promise<string> {
    let buf = '';

    for (const team of teams) {
      buf += '=== ' + (team.format ? '[' + team.format + '] ' : '') +
          (team.folder ? '' + team.folder + '/' : '') + team.name + ' ===\n\n';
      buf += await team.export(fast, gen);
      buf += '\n';
    }
    return buf;
  }

  static toString(teams: Readonly<Team[]>, fast?: boolean, gen?: Generation):
      Promise<string> {
    return Teams.exportTeams(teams, fast, gen);
  }

  static fromString(str: string, gen?: Generation): Promise<Readonly<Team[]>> {
    return Teams.importTeams(str, gen);
  }
}

async function unpackLine(
    line: string, gen?: Generation): Promise<Team|undefined> {
  const pipeIndex = line.indexOf('|');
  // istanbul ignore if: can't happen
  if (pipeIndex < 0) return undefined;

  let bracketIndex = line.indexOf(']');
  if (bracketIndex > pipeIndex) bracketIndex = -1;

  let slashIndex = line.lastIndexOf('/', pipeIndex);
  // line.slice(slashIndex + 1, pipeIndex) will be ''
  if (slashIndex < 0) slashIndex = bracketIndex;

  let format =
      bracketIndex > 0 ? line.slice(0, bracketIndex) : 'gen' + (gen || CURRENT);
  if (format && format.slice(0, 3) !== 'gen') format = 'gen6' + format;

  const team: Team|undefined =
      await Teams.unpackTeam(line.slice(pipeIndex + 1), gen);
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
