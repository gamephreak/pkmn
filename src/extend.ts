/* tslint:disable:no-conditional-assignment no-any */
// jQuery JavaScript Library v2.0.3
// Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
const class2Type: {[c: string]: string} = {
  '[object Boolean]': 'boolean',
  '[object Number]': 'number',
  '[object String]': 'string',
  '[object Function]': 'function',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object RegExp]': 'regexp',
  '[object Object]': 'object',
  '[object Error]': 'error'
};

const coreToString = class2Type.toString;
const coreHasOwn = class2Type.hasOwnProperty;

function isFunction(obj: any) {
  return getType(obj) === 'function';
}

function isWindow(obj: any) {
  return obj != null && obj === obj.window;
}

function getType(obj: any) {
  // istanbul ignore if: N/A
  if (obj == null) {
    return String(obj);
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
      class2Type[coreToString.call(obj)] ||
          /* istanbul ignore next */ 'object' :
      typeof obj;
}

function isPlainObject(obj: any) {
  if (getType(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
    return false;
  }

  // istanbul ignore next
  try {
    if (obj.constructor &&
        !coreHasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

export function extend(this: any, ...args: any[]) {
  let options, name, src, copy, copyIsArray, clone;
  let target = args[0] || {};
  let i = 1;
  let deep = false;
  const length = args.length;

  if (typeof target === 'boolean') {
    deep = target;
    target = args[1] || {};
    i = 2;
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {};
  }

  if (length === i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    if ((options = args[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        // istanbul ignore if
        if (target === copy) {
          continue;
        }

        if (deep && copy &&
            (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);

        } else /* istanbul ignore next */ if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}
