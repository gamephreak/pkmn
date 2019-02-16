import {Abilities, Ability} from './abilities';
import {cache} from './cache';
import {CURRENT, Generation} from './gen';
import {ID, toID} from './id';
import {Item, Items} from './items';
import {Move, Moves} from './moves';

export type Effect = Ability|Move|Item;

export class Effects {
  @cache
  static get(
      e: ID|string|undefined,
      /* istanbul ignore next: @cache */ gen: Generation = CURRENT): Effect
      |undefined {
    if (!e) return undefined;

    if (e.startsWith('move:')) {
      return Moves.get(e.slice(5), gen);
    } else if (e.startsWith('item:')) {
      return Items.get(e.slice(5), gen);
    } else if (e.startsWith('ability:')) {
      return Abilities.get(e.slice(8), gen);
    }

    const id = toID(e);
    let effect: Effect|undefined = Moves.get(id, gen);
    if (effect) return effect;
    effect = Items.get(id, gen);
    return effect ? effect : Abilities.get(id, gen);
  }

  static toString(e: Effect) {
    return `${e.kind}: ${e.name}`;
  }
}