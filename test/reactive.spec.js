import { reactive, VERSION } from '../source/reactive.js';

const wait = delay => new Promise((resolve) => setTimeout(resolve, delay));
const defer = async (check) => {
  const initial = check();

  let retries = 10;
  do {
    const now = check();
    if (now !== initial) return now;

    await wait(100);
  } while (--retries);

  throw new Error('Timed out waiting for change.');
}

suite(`reactive #${VERSION}`, function() {
  suite('text directive', function() {
    setup(function() {
      const span = document.createElement('span');
      span.setAttribute('id', 'text-test');
      document.body.appendChild(span);
    });
    teardown(function() {
      try {
        document.body.removeChild(document.getElementById('text-test'));
        document.body.removeChild(document.getElementById('text-test-dynamic'));
      } catch(ignore) {}
    });

    test('is set when initialised', function() {
      const state = { city: 'Tokyo' };
      const span = document.getElementById('text-test');
      span.setAttribute('data-text', 'city');

      expect(span.innerHTML).to.equal('');

      const result = reactive(state);
      expect(span.innerHTML).to.equal('Tokyo');
    });

    test('reacts to state change', function() {
      const state = { city: 'Tokyo' };
      const span = document.getElementById('text-test');
      span.setAttribute('data-text', 'city');

      expect(span.innerHTML).to.equal('');

      const result = reactive(state);
      expect(span.innerHTML).to.equal('Tokyo');

      result.city = 'Kyoto';
      expect(span.innerHTML).to.equal('Kyoto');
    });

    test('is set when inserted', function() {
      const state = { city: 'Nara' };
      const result = reactive(state);

      const span = document.createElement('span');
      span.setAttribute('data-text', 'city');
      span.setAttribute('id', 'text-test-dynamic');
      document.body.appendChild(span);

      expect(defer(() => span.innerHTML)).to.eventually.equal('Nara');
    });

    test('can be any expression', function() {
      const state = { name: 'Yuki', city: 'Sapporo' };
      const span = document.getElementById('text-test');
      span.setAttribute('data-text', '`Hello! I am ${name}, from ${city}.`');

      expect(span.innerHTML).to.equal('');

      const result = reactive(state);
      expect(span.innerHTML).to.equal('Hello! I am Yuki, from Sapporo.');
    });
  });
});
