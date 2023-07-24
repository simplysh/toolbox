export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;

export const precision = (n, digits) =>
  Math.round((n + Number.EPSILON) * (digits * 10)) / (digits * 10)

