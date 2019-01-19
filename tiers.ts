import {extend} from './extend';
import {ID, toID} from './id';

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
}
