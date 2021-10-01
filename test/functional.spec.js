import { curry, prop, VERSION } from '../functional.js';

suite(`functional #${VERSION}`, function() {
  suite('curry', function() {
    test('arguments can be supplied in any manner', function() {
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
      const object = { tokyo: 'san francisco' };
      const result = prop('tokyo', object);

      expect(result).to.equal('san francisco');
    });

    test('can be partially applied', function() {
      const object = { tokyo: 'san francisco' };
      const partial = prop('tokyo');
      const result = partial(object);

      expect(result).to.equal('san francisco');
    });
  });
});
