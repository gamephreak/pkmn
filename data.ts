import {extend} from './extend';
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
}

export type DataTable<T extends Data> = Readonly<{[id: string]: T}>;

// tslint:disable-next-line:no-any
export function patch(obj: any, diff: any) {
  const patched = extend(true, {}, obj, diff);
  for (const k of Object.keys(patched)) {
    const v = patched[k];
    if (v && typeof v.exists === 'boolean' && !v.exists) {
      delete patched[k];
    }
  }
  return patched;
}
