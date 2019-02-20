import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {STANDARD, Tier, Tiers} from './tiers';

export type GameType = 'Singles'|'Doubles'|'Triples'|'Rotation';

export class Format {
  readonly id: ID;
  readonly gameType: GameType;

  constructor(
      readonly gen: Generation = CURRENT, readonly tier: Tier = STANDARD) {
    this.gen = gen;
    this.tier = tier;
    this.gameType = 'Singles';
    this.id = toID(`gen${gen}${tier}`);
  }

  toString(): string {
    // TODO  Uber -> Ubers, AG -> Anything Goes
    return this.id;
  }

  static fromString(s: string): Format|undefined {
    if (!s) return undefined;

    // BUG: this will break in ~10 years when gen10 gets released...
    if (s.slice(0, 3) === 'gen') {
      const gen = Number(s[3]) as Generation;
      const rest = s.slice(4);
      if (!rest) return new Format(gen);

      const tier: Tier|undefined = Tiers.fromString(s.slice(4));
      return tier ? new Format(gen, tier) : undefined;
    } else {
      const tier: Tier|undefined = Tiers.fromString(s);
      return tier ? new Format(6, tier) : undefined;
    }
  }
}
