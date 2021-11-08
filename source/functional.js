export function curryN(len, carry, fn) {
  // if we consumed all the arguments, call the function
  if (len === 0) return fn(...carry);

  // allow the remainder of the arguments to be curried
  return function(...args) {
    // todo: arity
    return curryN(len - args.length, [...carry, ...args], fn);
  }
}

export const curry = fn => curryN(fn.length, [], fn);

export const arity = curry((n, fn) => {
  switch (n) {
    case 0: return function() { return fn(); };
    case 1: return function(a0) { return fn(a0); };
    case 2: return function(a0, a1) { return fn(a0, a1); };
    case 3: return function(a0, a1, a2) { return fn(a0, a1, a2); };
    case 4: return function(a0, a1, a2, a3) { return fn(a0, a1, a2, a3); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn(a0, a1, a2, a3, a4); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn(a0, a1, a2, a3, a4, a5); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn(a0, a1, a2, a3, a4, a5, a6); };
    default: return fn;
  }
});

export const unary = arity(1);
export const binary = arity(2);

export const prop = curry((key, object) => object[key]);
export const has = curry((key, object) => object.hasOwnProperty(key));

export const VERSION = '0.2.0';

