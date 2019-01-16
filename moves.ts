import {Data} from './data';
import {ID} from './id';
import {Type} from './type';

export interface Move extends Data {
  basePower: number;
  accuracy: number|true;
  pp: number;
  type: Type;
  category: Category;
  priority: number;
  target: Target;
  flags: Readonly<MoveFlags>;

  critRatio?: number;
  isZ?: ID;
  zMovePower?: number;
  multihit?: number|number[];
  percentHealed?: number;
  dropsStats?: number;
  recoil?: Recoil;
  defensiveCategory?: Category;
  useHighest?: boolean;
  breaksProtect?: boolean;
  ignoreBurn?: boolean;
  secondary?: boolean;
  ignoreDefensive?: boolean;
  willCrit?: boolean;
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

interface MoveFlags {
  /** Ignores a target's substitute. */
  authentic?: 1|0;
  /**
   * Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw
   * Ability.
   */
  bite?: 1|0;
  /** Has no effect on Pokemon with the Bulletproof Ability. */
  bullet?: 1|0;
  /** The user is unable to make a move between turns. */
  charge?: 1|0;
  /** Makes contact. */
  contact?: 1|0;
  /**
   * When used by a Pokemon, other Pokemon with the Dancer Ability can attempt
   * to execute the same move.
   */
  dance?: 1|0;
  /** Thaws the user if executed successfully while the user is frozen. */
  defrost?: 1|0;
  /** Can target a Pokemon positioned anywhere in a Triple Battle. */
  distance?: 1|0;
  /** Prevented from being executed or selected during Gravity's effect. */
  gravity?: 1|0;
  /** Prevented from being executed or selected during Heal Block's effect. */
  heal?: 1|0;
  /** Can be copied by Mirror Move. */
  mirror?: 1|0;
  /** Unknown effect. */
  mystery?: 1|0;
  /** Prevented from being executed or selected in a Sky Battle. */
  nonsky?: 1|0;
  /**
   * Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability,
   * and Pokemon holding Safety Goggles.
   */
  powder?: 1|0;
  /**
   * Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's
   * Shield.
   */
  protect?: 1|0;
  /**
   * Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher
   * Ability.
   */
  pulse?: 1|0;
  /**
   * Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist
   * Ability.
   */
  punch?: 1|0;
  /**
   * If this move is successful, the user must recharge on the following turn
   * and cannot make a move.
   */
  recharge?: 1|0;
  /**
   * Bounced back to the original user by Magic Coat or the Magic Bounce
   * Ability.
   */
  reflectable?: 1|0;
  /**
   * Can be stolen from the original user and instead used by another Pokemon
   * using Snatch.
   */
  snatch?: 1|0;
  /** Has no effect on Pokemon with the Soundproof Ability. */
  sound?: 1|0;
}
