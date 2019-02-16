import {Aliases} from './aliases';
import {cache} from './cache';
import {Data, DataTable} from './data';
import * as adv from './data/adv/items.json';
import * as bw from './data/bw/items.json';
import * as dpp from './data/dpp/items.json';
import * as gsc from './data/gsc/items.json';
import * as sm from './data/sm/items.json';
import * as xy from './data/xy/items.json';
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

const RBY: DataTable<Item> = {};
const GSC: DataTable<Item> = Data.patch('item', RBY, gsc);
const ADV: DataTable<Item> = Data.patch('item', GSC, adv);
const DPP: DataTable<Item> = Data.patch('item', ADV, dpp);
const BW: DataTable<Item> = Data.patch('item', DPP, bw);
const XY: DataTable<Item> = Data.patch('item', BW, xy);
const SM: DataTable<Item> = Data.patch('item', XY, sm);

const ITEMS: Readonly<Array<DataTable<Item>>> =
    [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Items {
  // istanbul ignore next: constructor
  protected constructor() {}

  static forGen(gen: Generation): DataTable<Item> {
    return ITEMS[gen - 1];
  }

  @cache
  static get(
      i: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT): Item
      |undefined {
    const id = toID(i);
    const items = Items.forGen(gen);

    const alias = Aliases.get(id);
    if (alias) return items[toID(alias)];

    const item = items[id];
    if (item) return item;

    const berry = id ? items[id + 'berry'] : undefined;
    if (berry) return berry;

    return item;
  }
}
