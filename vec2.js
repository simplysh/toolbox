const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1;
const isNumber = value => typeof value === 'number' && isFinite(value);
const isString = value => typeof value === 'string';
const unwrap = array => Array.isArray(array) && array.length === 1 ? array[0] : array;

class Vec2 {
  get(...indices) {
    if (indices.length) {
      if (indices.every(isNumber)) {
        return unwrap(indices.map(index => this.xy[index]));
      }
      if (indices.every(isString)) {
        return indices.reduce((accumulator, value, index) =>
          ({ ...accumulator, [value]: this.xy[index % 2] }), {});
      }
    }

    return this.get('x', 'y');
  }

  get len() {
    return Math.hypot(this.x, this.y);
  }

  get xy() {
    return [this.x, this.y];
  }

  get width() {
    return this.x;
  }

  get height() {
    return this.y;
  }

  get xpx() {
    return `${this.x}px`;
  }

  get ypx() {
    return `${this.y}px`;
  }

  get xypx() {
    return `${this.xpx}, ${this.ypx}`;
  }

  nor() {
    return new Vec2(this.x / this.len, this.y / this.len);
  }

  cross(ccw = false) {
    if(ccw) {
      return new Vec2(-this.y, this.x);
    }

    return new Vec2(this.y, -this.x);
  }

  distanceTo(...args) {
    const other = new Vec2(...args);

    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  sub(...args) {
    const other = new Vec2(...args);

    return new Vec2(this.x - other.x, this.y - other.y);
  }

  add(...args) {
    const other = new Vec2(...args);

    return new Vec2(this.x + other.x, this.y + other.y);
  }

  addX(value) {
    return new Vec2(
      this.x + (value.hasOwnProperty('x') ? value.x : value),
      this.y,
    );
  }

  addY(value) {
    return new Vec2(
      this.x,
      this.y + (value.hasOwnProperty('y') ? value.y : value),
    );
  }

  mul(...args) {
    const other = new Vec2(...args);

    return new Vec2(this.x * other.x, this.y * other.y);
  }

  abs() {
    return new Vec2(Math.abs(this.x), Math.abs(this.y));
  }

  constructor(...args) {
    switch (args.length) {
      case 0:
        this.x = 0;
        this.y = 0;

        break;
      case 1:
        [this.x = 0, this.y = this.x] = args[0] instanceof Vec2
          ? args[0].xy
          : args[0].hasOwnProperty('x')
            ? [args[0]['x'], args[0]['y']]
            : [].concat(args[0]).map(parseFloat);

        break;
      default:
        [this.x = 0, this.y = this.x] = args.map(parseFloat);

        break;
    }
  }
}

Vec2.fromEvent = event => {
  return event.touches && event.touches.length
    ? new Vec2(event.touches[0].pageX, event.touches[0].pageY)
    : new Vec2(event.pageX, event.pageY);
}

Vec2.fromOffset = node => new Vec2(node.offsetLeft, node.offsetTop);

Vec2.interpolate = (a, b, t) => new Vec2(lerp(a.x, b.x, t), lerp(a.y, b.y, t));

Vec2.wrap = fn => (...args) => new Vec2(fn(...args));

Vec2.ZERO = new Vec2(0);
Vec2.UNIT = new Vec2(1);

const vec2 = (...args) => new Vec2(...args);

export { Vec2, vec2 as default };

export const VERSION = '1.1.1';
