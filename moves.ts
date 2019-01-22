import {Aliases} from './aliases';
import {Data, DataTable, patch} from './data';
import * as adv from './data/adv/moves.json';
import * as bw from './data/bw/moves.json';
import * as dpp from './data/dpp/moves.json';
import * as gsc from './data/gsc/moves.json';
import * as rby from './data/rby/moves.json';
import * as sm from './data/sm/moves.json';
import * as xy from './data/xy/moves.json';
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
  readonly chance?: number;
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
  readonly dustproof?: boolean;
  readonly kingsrock?: boolean;
}

// TODO: verify through pkmnx testing!
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

const RBY: DataTable<Move> = patch({}, rby);
const GSC: DataTable<Move> = patch(RBY, gsc);
const ADV: DataTable<Move> = patch(GSC, adv);
const DPP: DataTable<Move> = patch(ADV, dpp);
const BW: DataTable<Move> = patch(DPP, bw);
const XY: DataTable<Move> = patch(BW, xy);
const SM: DataTable<Move> = patch(XY, sm);

const MOVES: Readonly<Array<DataTable<Move>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Moves {
  static forGen(gen: Generation): DataTable<Move> {
    return MOVES[gen - 1];
  }

  static getMove(m: ID|string, gen: Generation = CURRENT): Move|undefined {
    let id = toID(m);
    const moves = Moves.forGen(gen);

    const alias = Aliases.lookup(id);
    if (alias) return moves[alias];

    if (id.substr(0, 11) === 'hiddenpower') {
      const matches = /([a-z]*)([0-9]*)/.exec(id);
      id = matches![1] as ID;
    }

    return moves[id];
  }
}
