export type Status = 'frz'|'par'|'brn'|'slp'|'psn'|'tox'|'fnt';

const STATUSES: Readonly<{[s in Status]: string}> = {
  frz: 'Frozen',
  par: 'Paralyzed',
  brn: 'Burned',
  slp: 'Asleep',
  psn: 'Poisoned',
  tox: 'Badly Poisoned',
  fnt: 'Fainted'
};

export class Statuses {
  // istanbul ignore next: constructor
  protected constructor() {}

  static toString(s: Status|''|undefined): string {
    return s ? STATUSES[s] : 'Healthy';
  }
}
