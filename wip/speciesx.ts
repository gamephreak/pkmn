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

/**
 * Describes a possible way to get a pokemon. Is not exhaustive!
 * sourcesBefore covers all sources that do not have exclusive
 * moves (like catching wild pokemon).
 *
 * First character is a generation number, 1-7.
 * Second character is a source ID, one of:
 *
 * - E = egg, 3rd char+ is the father in gen 2-5, empty in gen 6-7
 *   because egg moves aren't restricted to fathers anymore
 * - S = event, 3rd char+ is the index in .eventPokemon
 * - D = Dream World, only 5D is valid
 * - V = Virtual Console transfer, only 7V is valid
 *
 * Designed to match MoveSource where possible.
 */
type PokemonSource = string;

/**
 * Keeps track of how a pokemon with a given set might be obtained.
 *
 * `sources` is a list of possible PokemonSources, and a nonzero
 * sourcesBefore means the Pokemon is compatible with all possible
 * PokemonSources from that gen or earlier.
 *
 * `limitedEgg` tracks moves that can only be obtained from an egg with
 * another father in gen 2-5. If there are multiple such moves,
 * potential fathers need to be checked to see if they can actually
 * learn the move combination in question.
 */
type PokemonSources = {
  readonly sources: PokemonSource[];
  readonly sourcesBefore: number;
  readonly babyOnly?: string;
  readonly sketchMove?: string;
  readonly hm?: string;
  readonly restrictiveMoves?: string[];
  readonly limitedEgg?: Array<string|'self'>;
  readonly isHidden?: boolean;
  readonly fastCheck?: true;
};

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
}
