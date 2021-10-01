export function curryN(len, carry, fn) {
  // if we consumed all the arguments, call the function
  if (len === 0) return fn(...carry);

  // allow the remainder of the arguments to be curried
  return function(...args) {
    // todo: arity
    return curryN(len - args.length, [...carry, ...args], fn);
  }
}

// todo: test this
export const curry = fn => curryN(fn.length, [], fn);

export const prop = curry((key, object) => object[key]);

export const VERSION = '0.1.1';

