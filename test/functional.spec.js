import { prop, VERSION } from '../functional.js';

suite(`functional #${VERSION}`, function() {
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
