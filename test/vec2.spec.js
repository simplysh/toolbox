import vec2, { Vec2, VERSION } from '../source/vec2.js';

suite(`vec2 #${VERSION}`, function() {
  test('has accessors', function () {
    const result = vec2(2, 7);

    expect(result).to.have.property('x');
    expect(result).to.have.property('y');
    expect(result).to.have.property('xy');
  });

  test('can be created from instance', function() {
    const instance = vec2(9, 1);
    const result = vec2(instance);

    expect(result.x).to.equal(9);
    expect(result.y).to.equal(1);
  });

  test('can be created from pojo', function() {
    const result = vec2({ x: 4, y: 2 });

    expect(result.x).to.equal(4);
    expect(result.y).to.equal(2);
  });

  test('can create empty', function () {
    const result = vec2();

    expect(result.x).to.equal(0);
    expect(result.y).to.equal(0);
  });

  test('can be created from single value', function () {
    const result = vec2(5);

    expect(result.x).to.equal(5);
    expect(result.y).to.equal(5);
  });

  test('will parse strings', function () {
    const result = vec2('128', '256');

    expect(result.x).to.equal(128);
    expect(result.y).to.equal(256);
  });

  test('can be created from both components', function () {
    const result = vec2(3, 5);

    expect(result.x).to.equal(3);
    expect(result.y).to.equal(5);
  });

  test('can be created from array', function () {
    const result = vec2([1, 2]);

    expect(result.x).to.equal(1);
    expect(result.y).to.equal(2);
  });

  test('can be created from 1-item array', function () {
    const result = vec2([8]);

    expect(result.x).to.equal(8);
    expect(result.y).to.equal(8);
  });

  test('can be created from empty array', function () {
    const result = vec2([]);

    expect(result.x).to.equal(0);
    expect(result.y).to.equal(0);
  });

  test('has length property', function () {
    const result = vec2(5, 0);

    expect(result.len).to.equal(5);
  });

  test('can be normalised', function () {
    const a = vec2(0, 5);
    const result = a.nor();

    expect(a.xy).to.deep.equal([0, 5]);
    expect(result.xy).to.deep.equal([0, 1]);
  })

  test('can be negated', function () {
    const a = vec2(2, -7);
    const result = a.neg();

    expect(a.xy).to.deep.equal([2, -7]);
    expect(result.xy).to.deep.equal([-2, 7]);
  })


  test('has array accessor', function () {
    const result = vec2(7, 2);

    expect(result.xy).to.deep.equal([7, 2]);
  });

  test('is mutable', function () {
    const result = vec2(7, 2);

    result.y = 5;

    expect(result.y).to.equal(5);
    expect(result.xy).to.deep.equal([7, 5]);
  });

  test('can be constructed from event', function () {
    const result = Vec2.fromEvent(new MouseEvent('click'));

    expect(result.xy).to.deep.equal([0, 0]);
  });

  test('can be constructed from node offset', function () {
    const result = Vec2.fromOffset(document.createElement('div'));

    expect(result.xy).to.deep.equal([0, 0]);
  });

  test('has convenience semantic accessors', function () {
    const result = vec2(800, 600);

    expect(result).to.have.property('width');
    expect(result).to.have.property('height');
    expect(result).to.have.property('get');

    expect(result.width).to.equal(800);
    expect(result.height).to.equal(600);
    expect(result.get()).to.deep.equal({ x: 800, y: 600 });
  });

  test('getter accepts index', function () {
    const result = vec2(800, 600);

    expect(result).to.have.property('get');

    expect(result.get(0)).to.deep.equal(800);
    expect(result.get(1)).to.deep.equal(600);
    expect(result.get(1, 0, 1)).to.deep.equal([600, 800, 600]);
  });

  test('can get into named members', function () {
    const result = vec2(800, 600);

    expect(result.get('width')).to.deep.equal({ width: 800 });
    expect(result.get('width', 'height')).to.deep.equal({ width: 800, height: 600 });
  });

  test('can wrap function', function () {
    const fn = (a, b) => [a + b, b];
    const decorated = Vec2.wrap(fn);
    const result = decorated(2, 7);

    expect(result.x).to.equal(9);
    expect(result.y).to.equal(7);
  })

  test('has convenience members', function () {
    expect(Vec2.ZERO.x).to.equal(0);
    expect(Vec2.ZERO.y).to.equal(0);
    expect(Vec2.UNIT.x).to.equal(1);
    expect(Vec2.UNIT.y).to.equal(1);
  });

  test('has distance method', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 1);
    const result = a.distanceTo(b);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 1]);
    expect(result).to.equal(3);
  });

  test('has sub method', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 1);
    const c = b.sub(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 1]);
    expect(c.xy).to.deep.equal([3, 0]);
  });

  test('has add method', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 3);
    const c = b.add(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 3]);
    expect(c.xy).to.deep.equal([7, 4]);
  });

  test('can add vector to x', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 3);
    const c = b.addX(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 3]);
    expect(c.xy).to.deep.equal([7, 3]);
  });

  test('can add number to x', function () {
    const a = vec2(2, 1);
    const b = a.addX(9);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([11, 1]);
  });

  test('can add vector to y', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 3);
    const c = b.addY(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 3]);
    expect(c.xy).to.deep.equal([5, 4]);
  });

  test('can add number to y', function () {
    const a = vec2(2, 1);
    const b = a.addY(9);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([2, 10]);
  });

  test('can subtract vector from x', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 3);
    const c = b.subX(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 3]);
    expect(c.xy).to.deep.equal([3, 3]);
  });

  test('can subtract number from x', function () {
    const a = vec2(2, 1);
    const b = a.subX(9);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([-7, 1]);
  });

  test('can subtract vector from y', function () {
    const a = vec2(2, 1);
    const b = vec2(5, 3);
    const c = b.subY(a);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([5, 3]);
    expect(c.xy).to.deep.equal([5, 2]);
  });

  test('can subtract number from y', function () {
    const a = vec2(2, 1);
    const b = a.subY(9);

    expect(a.xy).to.deep.equal([2, 1]);
    expect(b.xy).to.deep.equal([2, -8]);
  });

  test('has mul method', function () {
    const a = vec2(2, 3);
    const b = vec2(5, 1);
    const c = b.mul(a);

    expect(a.xy).to.deep.equal([2, 3]);
    expect(b.xy).to.deep.equal([5, 1]);
    expect(c.xy).to.deep.equal([10, 3]);
  });

  test('has div method', function () {
    const a = vec2(10, 6);
    const b = vec2(5, 2);
    const c = a.div(b);

    expect(a.xy).to.deep.equal([10, 6]);
    expect(b.xy).to.deep.equal([5, 2]);
    expect(c.xy).to.deep.equal([2, 3]);
  });

  test('has cross method', function () {
    const a = vec2(2, 5);
    const result = a.cross();

    expect(a.xy).to.deep.equal([2, 5]);
    expect(result.xy).to.deep.equal([5, -2]);
  });

  test('can cross counter-clockwise', function () {
    const a = vec2(2, 5);
    const result = a.cross(true);

    expect(a.xy).to.deep.equal([2, 5]);
    expect(result.xy).to.deep.equal([-5, 2]);
  });

  test('has abs method', function () {
    const a = vec2(2, -7);
    const c = a.abs();

    expect(a.xy).to.deep.equal([2, -7]);
    expect(c.xy).to.deep.equal([2, 7]);
  });

  test('has pixel helper methods', function () {
    const result = vec2(5, 1);

    expect(result.xpx).to.equal('5px');
    expect(result.ypx).to.equal('1px');
    expect(result.xypx).to.equal('5px, 1px');
  });

  test('can interpolate 2 vectors', function () {
    const a = vec2(4, 8);
    const b = vec2(6, 2);
    const result = Vec2.interpolate(a, b, 0.5);

    expect(result.xy).to.deep.equal([5, 5]);
  });
});
