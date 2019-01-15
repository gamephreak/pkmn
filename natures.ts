import {ID, toID} from './id';
import {Stat} from './stats';

export const NATURES: {[name: string]: {plus?: Stat, minus?: Stat}} = {
  'Adamant': {plus: 'atk', minus: 'spa'},
  'Bashful': {},
  'Bold': {plus: 'def', minus: 'atk'},
  'Brave': {plus: 'atk', minus: 'spe'},
  'Calm': {plus: 'spd', minus: 'atk'},
  'Careful': {plus: 'spd', minus: 'spa'},
  'Docile': {},
  'Gentle': {plus: 'spd', minus: 'def'},
  'Hardy': {},
  'Hasty': {plus: 'spe', minus: 'def'},
  'Impish': {plus: 'def', minus: 'spa'},
  'Jolly': {plus: 'spe', minus: 'spa'},
  'Lax': {plus: 'def', minus: 'spd'},
  'Lonely': {plus: 'atk', minus: 'def'},
  'Mild': {plus: 'spa', minus: 'def'},
  'Modest': {plus: 'spa', minus: 'atk'},
  'Naive': {plus: 'spe', minus: 'spd'},
  'Naughty': {plus: 'atk', minus: 'spd'},
  'Quiet': {plus: 'spa', minus: 'spe'},
  'Quirky': {},
  'Rash': {plus: 'spa', minus: 'spd'},
  'Relaxed': {plus: 'def', minus: 'spe'},
  'Sassy': {plus: 'spd', minus: 'spe'},
  'Serious': {},
  'Timid': {plus: 'spe', minus: 'atk'},
};

const NAMES: {[id: string]: string} = {};
for (const n of Object.keys(NATURES)) {
  NAMES[toID(n) as string] = n;
}

export function fromID(id: ID) {
  const k = id as string;
  return NAMES[k];
}
