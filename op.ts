export class ObservedPokemon {
  constructor(
      public approxhp: string, public item?: string, public ability?: string) {
    this.approxhp = approxhp;
    this.item = item;
    this.ability = ability;
  }
}
