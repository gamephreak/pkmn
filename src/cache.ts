import {CURRENT, Generation} from './gen';
import {ID} from './id';

const HOP = Object.prototype.hasOwnProperty;

export function cache<T>(
    target: {}, key: string,
    descriptor: TypedPropertyDescriptor<
        (k: ID|string|undefined, gen?: Generation) => T>) {
  const fn = descriptor.value;
  // istanbul ignore if: types
  if (!fn) return;
  const c: {[kg: string]: T} = {};

  descriptor.value = function(k: ID|string|undefined, gen?: Generation): T {
    const g: Generation = gen || CURRENT;
    const kg = `${k}|${g}`;
    return HOP.call(c, kg) ? c[kg] : (c[kg] = fn.apply(this, [k, g]));
  };

  return descriptor;
}
