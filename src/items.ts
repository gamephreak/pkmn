import {Aliases} from './aliases';
import {cache, Data, DataTable, patch} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {Type} from './types';

export interface Item extends Data {
  readonly isBerry?: boolean;
  readonly megaStone?: string;
  readonly megaEvolves?: string;
  readonly zMove?: string|true;
  readonly zMoveFrom?: string;
  readonly zMoveType?: Type;
  readonly zMoveUser?: string[];
  readonly onPlate?: string;
  readonly onMemory?: string;
  readonly onDrive?: string;
  readonly isGem?: boolean;
}

const RBY: Promise<DataTable<Item>> = Promise.resolve({});
const GSC: Promise<DataTable<Item>> =
    patch(RBY, import('./data/gsc/items.json'));
const ADV: Promise<DataTable<Item>> =
    patch(GSC, import('./data/adv/items.json'));
const DPP: Promise<DataTable<Item>> =
    patch(ADV, import('./data/dpp/items.json'));
const BW: Promise<DataTable<Item>> = patch(DPP, import('./data/bw/items.json'));
const XY: Promise<DataTable<Item>> = patch(BW, import('./data/xy/items.json'));
const SM: Promise<DataTable<Item>> = patch(XY, import('./data/sm/items.json'));

const ITEMS: Readonly<Array<Promise<DataTable<Item>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Items {
  // istanbul ignore next
  protected constructor() {}

  static forGen(gen: Generation): Promise<DataTable<Item>> {
    return ITEMS[gen - 1];
  }

  @cache
  static async get(
      i: ID|string, /* istanbul ignore next */ gen: Generation = CURRENT):
      Promise<Item|undefined> {
    const id = toID(i);
    const items = await Items.forGen(gen);

    const alias = await Aliases.get(id);
    if (alias) return items[toID(alias)];

    const item = items[id];
    if (item) return item;

    const berry = id ? items[id + 'berry'] : undefined;
    if (berry) return berry;

    return item;
  }
}
