import {Generation} from './gen';
import {ID} from './id';

export interface Data {
  id: ID;
  name: string;
  num: number;
  gen: Generation;
  desc?: string;
  shortDesc?: string;
  isNonstandard?: string;
  exists?: boolean;
}
