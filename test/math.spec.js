import { lerp } from '../source/math.js';

suite('math', function() {
  suite('lerp', function() {
    test('can interpolate between two values', function() {
      const result = lerp(2, 8, 0.5);

      expect(result).equal(5);
    });
  });
});
