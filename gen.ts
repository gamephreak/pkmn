import {ID, toID} from './id';

export type Generation = 1|2|3|4|5|6|7;

// Canonical
export const RBY: Generation = 1;
export const GSC: Generation = 2;
export const ADV: Generation = 3;
export const DPP: Generation = 4;
export const BW: Generation = 5;
export const XY: Generation = 6;
export const SM: Generation = 7;

// Smogon
export const RB: Generation = RBY;
export const GS: Generation = GSC;
export const RS: Generation = ADV;
export const DP: Generation = DPP;

// Aliases
export const RSE: Generation = ADV;
export const HGSS: Generation = DPP;
export const BW2: Generation = BW;
export const B2W2: Generation = BW;
export const ORAS: Generation = XY;
export const USM: Generation = SM;
export const USUM: Generation = SM;

export const CURRENT: Generation = SM;

const NAMES: Readonly<string[]> =
    ['RBY', 'GSC', 'ADV', 'DPP', 'BW', 'XY', 'SM'];
const LOOKUP: Readonly<{[id: string]: Generation}> = {
  'rby': RBY,
  'gsc': GSC,
  'adv': ADV,
  'dpp': DPP,
  'bw': BW,
  'xy': XY,
  'sm': SM,

  'rb': RB,
  'gs': GS,
  'rs': RS,
  'dp': DP,

  'rse': RSE,
  'hgss': HGSS,
  'bw2': BW2,
  'b2w2': B2W2,
  'oras': ORAS,
  'usm': USM,
  'usum': USUM
};

export class Generations {
  // istanbul ignore next
  private constructor() {}

  static toString(gen: Generation): string {
    return NAMES[gen - 1];
  }

  static fromString(s: string): Generation|undefined {
    return LOOKUP[toID(s)];
  }
}
