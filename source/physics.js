export default function* spring(
  { friction, tension, mass = 1 },
  start,
  end = start
) {
  let current = start;
  let target = end;
  let velocity = 0;

  const step = 8;

  while (true) {
    const springForce = -tension * 0.000001 * (current - target);
    const dampingForce = -friction * 0.001 * velocity;
    const acceleration = (springForce + dampingForce) / mass;

    velocity = velocity + acceleration * step;
    current = current + velocity * step;

    target = (yield current) || target;
  }
}
