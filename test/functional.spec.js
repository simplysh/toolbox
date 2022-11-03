import { curry, prop, has, arity, unary, binary, VERSION } from '../source/functional.js';

suite(`functional #${VERSION}`, function() {
  suite('curry', function() {
    test('arguments can be supplied in any groups', function() {
      const sum = (a, b, c) => a + b + c;
      const result = curry(sum);

      expect(result(1, 2, 3)).to.equal(6);
      expect(result(1, 2)(3)).to.equal(6);
      expect(result(1)(2, 3)).to.equal(6);
      expect(result(1)(2)(3)).to.equal(6);
    });
  });

  suite('prop', function() {
    test('returns property value', function() {
      const object = { city: 'tokyo' };
      const result = prop('city', object);

      expect(result).to.equal('tokyo');
    });

    test('can be partially applied', function() {
      const object = { city: 'tokyo' };
      const city = prop('city');
      const result = city(object);

      expect(result).to.equal('tokyo');
    });
  });

  suite('has', function() {
    test('is true if property exists', function() {
      const object = { city: 'tokyo' };
      const result = has('city', object);

      expect(result).to.equal(true);
    });

    test('is false if property does not exist', function() {
      const object = { city: 'tokyo' };
      const result = has('country', object);

      expect(result).to.equal(false);
    });

    test('can be partially applied', function() {
      const object = { city: 'tokyo' };
      const hasCity = has('city');
      const result = hasCity(object);

      expect(result).to.equal(true);
    });
  });

  suite('arity', function() {
    test('can remove arguments', function() {
      const four = (a, b, c, d) => [a, b, c, d];
      const result = arity(0, four);

      expect(result.length).to.equal(0);
      expect(result(1, 2, 3, 4)).to.deep.equal(new Array(4).fill(undefined));
    });

    test('can limit number of arguments', function() {
      const four = (a, b, c, d) => [a, b, c, d];
      const result = arity(2, four);

      expect(result.length).to.equal(2);
      expect(result(1, 2, 3, 4)).to.deep.equal([1, 2, undefined, undefined]);
    });

    test('can be partially applied', function() {
      const four = (a, b, c, d) => [a, b, c, d];
      const unary = arity(1);
      const result = unary(four);

      expect(result.length).to.equal(1);
      expect(result(1, 2, 3, 4)).to.deep.equal([1, undefined, undefined, undefined]);
    });
  });

  suite('unary', function() {
    test('limits arguments to one', function() {
      const four = (a, b, c, d) => [a, b, c, d];
      const result = unary(four);

      expect(result.length).to.equal(1);
      expect(result(1, 2, 3, 4)).to.deep.equal([1, undefined, undefined, undefined]);
    });
  });

  suite('binary', function() {
    test('limits arguments to two', function() {
      const four = (a, b, c, d) => [a, b, c, d];
      const result = binary(four);

      expect(result.length).to.equal(2);
      expect(result(1, 2, 3, 4)).to.deep.equal([1, 2, undefined, undefined]);
    });
  });
});
