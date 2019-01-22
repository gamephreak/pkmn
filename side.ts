import {Pokemon} from './p';

// TODO how do side conditions (spikes, etc) stack?
export interface Side {  // class
  // NOTE: volatiles and status go on POKEMON, not side
  pokemon: Pokemon[];
  active?: number;  // index into pokemon, not set during team previow
  conditions?: string[];
}
