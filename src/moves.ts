import {Aliases} from './aliases';
import {cache, Data, DataTable, patch} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {BoostsTable} from './stats';
import {Status} from './status';
import {Type} from './types';

export type Category = 'Physical'|'Special'|'Status';
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
interface Flags {
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

interface SelfEffect {
  readonly sideCondition?: string;
  readonly volatileStatus?: string;
  readonly boosts?: Partial<BoostsTable>;
}

interface SecondaryEffect {
  readonly chance?: number;
  readonly boosts?: Partial<BoostsTable>;
  readonly self?: SelfEffect;
  readonly status?: Status;
  readonly volatileStatus?: string;
}

export interface Move extends Data {
  readonly basePower?: number;
  readonly type: Type;
  readonly pp: number;
  readonly accuracy: number|true;
  readonly category?: Category;
  readonly defensiveCategory?: Category;
  readonly target: Target;
  readonly priority?: number;
  readonly flags?: Readonly<Flags>;
  readonly status?: Status;
  readonly sideCondition?: string;
  readonly volatileStatus?: string;
  readonly boosts?: Partial<BoostsTable>;
  readonly self?: SelfEffect;
  readonly secondaries?: SecondaryEffect[];
  readonly critRatio?: number;
  readonly willCrit?: boolean;
  readonly isZ?: ID;
  readonly zMovePower?: number;
  readonly zMoveBoosts?: Partial<BoostsTable>;
  readonly multihit?: number|number[];
  readonly percentHealed?: number;
  readonly recoil?: Recoil;
  readonly breaksProtect?: boolean;
  readonly ignoreDefensive?: boolean;
}

const RBY: Promise<DataTable<Move>> =
    patch(Promise.resolve({}), import('./data/rby/moves.json'));
const GSC: Promise<DataTable<Move>> =
    patch(RBY, import('./data/gsc/moves.json'));
const ADV: Promise<DataTable<Move>> =
    patch(GSC, import('./data/adv/moves.json'));
const DPP: Promise<DataTable<Move>> =
    patch(ADV, import('./data/dpp/moves.json'));
const BW: Promise<DataTable<Move>> = patch(DPP, import('./data/bw/moves.json'));
const XY: Promise<DataTable<Move>> = patch(BW, import('./data/xy/moves.json'));
const SM: Promise<DataTable<Move>> = patch(XY, import('./data/sm/moves.json'));

const MOVES: Readonly<Array<Promise<DataTable<Move>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Moves {
  // istanbul ignore next: constructor
  protected constructor() {}

  static forGen(gen: Generation): Promise<DataTable<Move>> {
    return MOVES[gen - 1];
  }

  @cache
  static async get(
      m: ID|string,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT):
      Promise<Move|undefined> {
    let id = toID(m);
    const moves = await Moves.forGen(gen);

    const alias = await Aliases.get(id);
    if (alias) return moves[toID(alias)];

    if (id.substr(0, 11) === 'hiddenpower') {
      const matches = /([a-z]*)([0-9]*)/.exec(id);
      id = matches![1] as ID;
    }

    return moves[id];
  }
}
