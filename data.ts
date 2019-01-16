import {CURRENT, Generation} from './gen';
import {ID} from './id';

export interface Data {
  readonly id: ID;
  readonly name: string;
  readonly num: number;
  readonly gen: Generation;
  readonly desc?: string;
  readonly shortDesc?: string;
  readonly isNonstandard?: string;
  readonly exists?: boolean;
}

export type DataTable<T extends Data> = Readonly<{[id: string]: T}>;
