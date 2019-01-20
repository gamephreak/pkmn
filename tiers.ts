import {extend} from './extend';
import {ID, toID} from './id';
import {Species} from './species';

export type Tier = 'AG'|'Uber'|'OU'|'UUBL'|'UU'|'RUBL'|'RU'|'NUBL'|'NU'|'PUBL'|
    'PU'|'NFE'|'LC Uber'|'LC'|'Unreleased'|'Illegal'|'CAP'|'CAP NFE'|'CAP LC';

export const UBER: Tier = 'Uber';
export const OU: Tier = 'OU';
export const UUBL: Tier = 'UUBL';
export const UU: Tier = 'UU';
export const RUBL: Tier = 'RUBL';
export const RU: Tier = 'RU';
export const NUBL: Tier = 'NUBL';
export const NU: Tier = 'NU';
export const PUBL: Tier = 'PUBL';
export const PU: Tier = 'PU';
export const NFE: Tier = 'NFE';
export const LC_UBER: Tier = 'LC Uber';
export const LC: Tier = 'LC';

export const AG: Tier = 'AG';
export const UNRELEASED: Tier = 'Unreleased';
export const ILLEGAL: Tier = 'Illegal';

export const CAP: Tier = 'CAP';
export const CAP_NFE: Tier = 'CAP NFE';
export const CAP_LC: Tier = 'CAP LC';

export const STANDARD: Tier = OU;

const OFFICIAL: Readonly<{[id: string]: Tier}> = {
  ou: OU,
  uu: UU,
  ru: RU,
  nu: NU,
  pu: PU,
  lc: LC,
};

const BANLISTS: Readonly<{[id: string]: Tier}> = {
  uber: UBER,
  uubl: UUBL,
  rubl: RUBL,
  nubl: NUBL,
  publ: PUBL,
  lcuber: LC_UBER,
};

const OTHER: Readonly<{[id: string]: Tier}> = {
  ag: AG,
  nfe: NFE,
  unreleased: UNRELEASED,
  illegal: ILLEGAL,
};

const NON_STANDARD: Readonly<{[id: string]: Tier}> = {
  cap: CAP,
  capnfe: CAP_NFE,
  caplc: CAP_LC
};

const TIERS: Readonly<{[id: string]: Tier}> =
    extend(true, {}, OFFICIAL, BANLISTS, OTHER, NON_STANDARD);

const ALLOWED: Readonly<{[tier in Tier]: Readonly<{[tier in Tier]?: 1}>}> = {
  'AG': {
    'AG': 1,
    'Uber': 1,
    'OU': 1,
    'UUBL': 1,
    'UU': 1,
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'Uber': {
    'Uber': 1,
    'OU': 1,
    'UUBL': 1,
    'UU': 1,
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'OU': {
    'OU': 1,
    'UUBL': 1,
    'UU': 1,
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'UUBL': {
    'UUBL': 1,
    'UU': 1,
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'UU': {
    'UU': 1,
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'RUBL': {
    'RUBL': 1,
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'RU': {
    'RU': 1,
    'NUBL': 1,
    'NU': 1,
    'PUBL': 1,
    'PU': 1,
    'NFE': 1,
    'LC Uber': 1,
    'LC': 1
  },
  'NUBL':
      {'NUBL': 1, 'NU': 1, 'PUBL': 1, 'PU': 1, 'NFE': 1, 'LC Uber': 1, 'LC': 1},
  'NU': {'NU': 1, 'PUBL': 1, 'PU': 1, 'NFE': 1, 'LC Uber': 1, 'LC': 1},
  'PUBL': {'PUBL': 1, 'PU': 1, 'NFE': 1, 'LC Uber': 1, 'LC': 1},
  'PU': {'PU': 1, 'NFE': 1, 'LC Uber': 1, 'LC': 1},
  'NFE': {'NFE': 1, 'LC Uber': 1, 'LC': 1},
  'LC Uber': {'LC Uber': 1, 'LC': 1},
  'LC': {'LC': 1},
  'Unreleased': {},
  'Illegal': {},
  // BUG: TBH, I have no clue how these work?
  'CAP': {'CAP': 1, 'CAP NFE': 1, 'CAP LC': 1},
  'CAP NFE': {'CAP NFE': 1, 'CAP LC': 1},
  'CAP LC': {'CAP LC': 1}
};

export class Tiers {
  static fromString(t: string): Tier|undefined {
    return TIERS[toID(t)];
  }

  static official(t: Tier): boolean {
    return !!OFFICIAL[t];
  }

  static isNonstandard(t: Tier): boolean {
    return !!NON_STANDARD[t];
  }

  static isAllowed(s: Species, t: Tier): boolean {
    return !!s.tier && !!ALLOWED[t][s.tier];
  }
}
