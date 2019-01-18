import {Data, DataTable, patch} from './data';
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
  readonly megaStone?: string;
  readonly megaEvolves?: string;
  readonly zMove?: string|true;
  readonly zMoveFrom?: string;
  readonly zMoveType?: Type;
  readonly zMoveUser?: string[];

  // TODO
  readonly onPlate?: string;
  readonly onMemory?: string;
  readonly onDrive?: string;
  readonly isGem?: boolean;
}

const RBY: DataTable<Item> = {};
const GSC: DataTable<Item> = patch(RBY, gsc);
const ADV: DataTable<Item> = patch(GSC, adv);
const DPP: DataTable<Item> = patch(ADV, dpp);
const BW: DataTable<Item> = patch(DPP, bw);
const XY: DataTable<Item> = patch(BW, xy);
const SM: DataTable<Item> = patch(XY, sm);

const ITEMS: Array<DataTable<Item>> = [RBY, GSC, ADV, DPP, BW, XY, SM];

export class Items {
  static forGen(gen: Generation): DataTable<Item> {
    return ITEMS[gen - 1];
  }

  static getItem(i: ID|string, gen: Generation = CURRENT): Item|undefined {
    return Items.forGen(gen)[toID(i)];
  }
}
