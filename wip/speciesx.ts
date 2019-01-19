import {Gender, Species} from './species';
import {StatsTable} from './stats';

/**
 * Describes a possible way to get a move onto a pokemon.
 *
 * First character is a generation number, 1-7.
 * Second character is a source ID, one of:
 *
 * - L = start or level-up, 3rd char+ is the level
 * - M = TM/HM
 * - T = tutor
 * - E = egg
 * - S = event, 3rd char+ is the index in .eventPokemon
 * - D = Dream World, only 5D is valid
 * - V = Virtual Console transfer, only 7V is valid
 * - C = NOT A REAL SOURCE, see note, only 3C/4C is valid
 *
 * C marks certain moves learned by a pokemon's prevo. It's used to
 * work around the chainbreeding checker's shortcuts for performance;
 * it lets the pokemon be a valid father for teaching the move, but
 * is otherwise ignored by the learnset checker (which will actually
 * check prevos for compatibility).
 */
type MoveSource = string;

type EventInfo = {
  readonly generation: number;
  readonly level?: number;
  readonly shiny?: true | 1;
  readonly gender?: Gender;
  readonly nature?: string;
  readonly ivs?: Partial<StatsTable>;
  readonly perfectIVs?: number;
  readonly isHidden?: boolean;
  readonly abilities?: string[];
  readonly moves?: string[];
  readonly pokeball?: string;
  readonly from?: string;
};

export interface Speciesx extends Species {
  readonly eggGroups: string[];
  readonly evoLevel?: number;
  readonly maleOnlyHidden?: boolean;
  readonly unreleasedHidden?: boolean;
  readonly eventOnly: boolean;
  readonly eventPokemon?: EventInfo[];
  readonly learnset?: {[k: string]: MoveSource[]}
}
