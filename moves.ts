import {Data} from './data';
import {Generation} from './gen';
import {ID, toID} from './id';
import {Type} from './type';

export interface Move extends Data {
  readonly basePower: number;
  readonly accuracy: number|true;
  readonly pp: number;
  readonly type: Type;
  readonly category: Category;
  readonly priority: number;
  readonly target: Target;
  readonly flags: Readonly<MoveFlags>;
  readonly critRatio?: number;
  readonly isZ?: ID;
  readonly zMovePower?: number;
  readonly multihit?: number|number[];
  readonly percentHealed?: number;
  readonly dropsStats?: number;
  readonly recoil?: Recoil;
  readonly defensiveCategory?: Category;
  readonly useHighest?: boolean;
  readonly breaksProtect?: boolean;
  readonly ignoreBurn?: boolean;
  readonly secondary?: boolean;
  readonly ignoreDefensive?: boolean;
  readonly willCrit?: boolean;
}

type Category = 'Physical'|'Special'|'Status';
type Target =
    // single-target
    'normal'|'any'|'adjacentAlly'|'adjacentFoe'|'adjacentAllyOrSelf'|
    // single-target, automatic
    'self'|'randomNormal'|
    // spread
    'allAdjacent'|'allAdjacentFoes'|
    // side and field
    'allySide'|'foeSide'|'all';
type Recoil = boolean|number|'crash'|'Struggle';

type Flag = 1|0;
interface MoveFlags {
  /** Ignores a target's substitute. */
  authentic?: Flag;
  /**
   * Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw
   * Ability.
   */
  bite?: Flag;
  /** Has no effect on Pokemon with the Bulletproof Ability. */
  bullet?: Flag;
  /** The user is unable to make a move between turns. */
  charge?: Flag;
  /** Makes contact. */
  contact?: Flag;
  /**
   * When used by a Pokemon, other Pokemon with the Dancer Ability can attempt
   * to execute the same move.
   */
  dance?: Flag;
  /** Thaws the user if executed successfully while the user is frozen. */
  defrost?: Flag;
  /** Can target a Pokemon positioned anywhere in a Triple Battle. */
  distance?: Flag;
  /** Prevented from being executed or selected during Gravity's effect. */
  gravity?: Flag;
  /** Prevented from being executed or selected during Heal Block's effect. */
  heal?: Flag;
  /** Can be copied by Mirror Move. */
  mirror?: Flag;
  /** Unknown effect. */
  mystery?: Flag;
  /** Prevented from being executed or selected in a Sky Battle. */
  nonsky?: Flag;
  /**
   * Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability,
   * and Pokemon holding Safety Goggles.
   */
  powder?: Flag;
  /**
   * Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's
   * Shield.
   */
  protect?: Flag;
  /**
   * Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher
   * Ability.
   */
  pulse?: Flag;
  /**
   * Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist
   * Ability.
   */
  punch?: Flag;
  /**
   * If this move is successful, the user must recharge on the following turn
   * and cannot make a move.
   */
  recharge?: Flag;
  /**
   * Bounced back to the original user by Magic Coat or the Magic Bounce
   * Ability.
   */
  reflectable?: Flag;
  /**
   * Can be stolen from the original user and instead used by another Pokemon
   * using Snatch.
   */
  snatch?: Flag;
  /** Has no effect on Pokemon with the Soundproof Ability. */
  sound?: Flag;
}

export class Moves {
  static forGen(gen: Generation): Readonly<Move[]> {
    return [];  // TODO
  }

  static getMove(m: ID|string, gen?: Generation): Move|undefined {
    const id = toID(m);

    return undefined;  // TODO
  }
}
