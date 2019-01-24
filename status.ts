export type Status = 'frz'|'par'|'brn'|'slp'|'psn'|'tox';

const STATUSES: Readonly<{[s in Status]: string}> = {
  frz: 'Frozen',
  par: 'Paralyzed',
  brn: 'Burned',
  slp: 'Asleep',
  psn: 'Poisoned',
  tox: 'Badly Poisoned'
};

export class Statuses {
  // istanbul ignore next
  private constructor() {}

  static toString(s: Status|''|undefined): string {
    return s ? STATUSES[s] : 'Healthy';
  }
}
