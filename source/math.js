export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;

export const precision = (n, digits) =>
  Math.round((n + Number.EPSILON) * (digits * 10)) / (digits * 10)

export const smoothstep = t => {
  if (t < 0) return 0;
  if (t >= 1) return 1;

  return t * t * (3 - 2 * t);
}

