import {StatsTable} from './stats';

export type PokemonSet = {
  name: string,
  species: string,
  item: string,
  ability: string,
  moves: string[],
  nature: string,
  gender: string,
  evs: StatsTable,
  ivs: StatsTable,
  level: number,
  shiny?: boolean,
  happiness?: number,
  pokeball?: string,
  hpType?: string,
};
