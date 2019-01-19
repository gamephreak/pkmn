import {ID, toID} from './id';
export type Tier =  // TODO new tiers..., official vs. unofficial
    'Uber'|'OU'|'UUBL'|'UU'|'RUBL'|'RU'|'NUBL'|'NU'|'PUBL'|'PU'|'LC'|'AG'|'NFE'|
    'Unreleased'|'Illegal'|'CAP'|'CAP NFE'|'CAP LC'|'LC Uber';

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
export const LC: Tier = 'LC';

export const STANDARD: Tier = OU;

const TIERS: Readonly<{[id: string]: Tier}> = {
  'uber': UBER,
  'ou': OU,
  'uubl': UUBL,
  'uu': UU,
  'rubl': RUBL,
  'ru': RU,
  'nubl': NUBL,
  'nu': NU,
  'publ': PUBL,
  'pu': PU,
  'lc': LC
};

export class Tiers {
  static fromString(t: string): Tier|undefined {
    return TIERS[toID(t)];
  }
}
