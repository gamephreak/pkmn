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
  readonly isUnreleased?: boolean;
}

export type DataTable<T extends Data> = Readonly<{[id: string]: T}>;

// tslint:disable-next-line:no-any
export async function patch(obj: Promise<any>, diff: Promise<any>) {
  const patched = extend(true, {}, await obj, await diff);
  for (const k of Object.keys(patched)) {
    const v = patched[k];
    if (v && typeof v.exists === 'boolean' && !v.exists) {
      delete patched[k];
    }
  }
  return patched;
}
