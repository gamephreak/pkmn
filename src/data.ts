import {extend} from './extend';
import {Generation} from './gen';
import {ID} from './id';

type Kind = 'ability'|'item'|'move'|'species';

export interface Data {
  readonly id: ID;
  readonly kind: Kind;
  readonly name: string;
  readonly num: number;
  readonly gen: Generation;
  readonly desc?: string;
  readonly shortDesc?: string;
  readonly isUnreleased?: boolean;
}

export type DataTable<T extends Data> = Readonly<{[id: string]: T}>;

export class Data {
  // tslint:disable-next-line:no-any
  static patch(kind: Kind, obj: any, diff: any) {
    const patched = extend(true, {}, obj, diff);
    for (const k of Object.keys(patched)) {
      const v = patched[k];
      v.kind = kind;
      if (v && typeof v.exists === 'boolean' && !v.exists) {
        delete patched[k];
      }
    }
    return patched;
  }
}
