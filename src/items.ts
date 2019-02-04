import {Aliases} from './aliases';
import {cache} from './cache';
import {Data, DataTable} from './data';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {Type} from './types';

export interface Item extends Data {
  readonly isBerry?: boolean;
  readonly isChoice?: boolean;
  readonly isGem?: boolean;
  readonly megaEvolves?: string;
  readonly megaStone?: string;
  readonly onDrive?: string;
  readonly onMemory?: string;
  readonly onPlate?: string;
  readonly zMove?: string|true;
  readonly zMoveFrom?: string;
  readonly zMoveType?: Type;
  readonly zMoveUser?: string[];
}

const RBY: Promise<DataTable<Item>> = Promise.resolve({});
const GSC: Promise<DataTable<Item>> =
    Data.patch(RBY, import('./data/gsc/items.json'));
const ADV: Promise<DataTable<Item>> =
    Data.patch(GSC, import('./data/adv/items.json'));
const DPP: Promise<DataTable<Item>> =
    Data.patch(ADV, import('./data/dpp/items.json'));
const BW: Promise<DataTable<Item>> =
    Data.patch(DPP, import('./data/bw/items.json'));
const XY: Promise<DataTable<Item>> =
    Data.patch(BW, import('./data/xy/items.json'));
const SM: Promise<DataTable<Item>> =
    Data.patch(XY, import('./data/sm/items.json'));

const ITEMS: Readonly<Array<Promise<DataTable<Item>>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Items {
  // istanbul ignore next: constructor
  protected constructor() {}

  static forGen(gen: Generation): Promise<DataTable<Item>> {
    return ITEMS[gen - 1];
  }

  @cache
  static async get(
      i: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT):
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
