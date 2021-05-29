import { div, span, button, canvas, input, svg, circle, VERSION } from '../dom.js';

suite(`dom #${VERSION}`, function() {
  test('can create empty', function () {
    const result = div();

    expect(result.outerHTML).to.equal('<div></div>');
  });

  test('can work with just attributes', function () {
    const result = canvas({ width: 50, height: 20 });

    expect(result.outerHTML).to.equal('<canvas width="50" height="20"></canvas>');
  });

  test('can be nested', function () {
    const result = div({ className: 'foo' }, [div({ className: 'bar' })]);

    expect(result.outerHTML).to.equal('<div class="foo"><div class="bar"></div></div>');
  });

  test('works with single dom child', function () {
    const one = document.createElement('span');
    one.innerText = 'Wrap me!';

    const result = div(one);

    expect(result.outerHTML)
      .to.equal('<div><span>Wrap me!</span></div>');
  });

  test('works with single dom array', function () {
    const one = document.createElement('span');
    one.innerText = 'Wrap me!';

    const result = div([one]);

    expect(result.outerHTML)
      .to.equal('<div><span>Wrap me!</span></div>');
  });

  test('accepts attributes and dom children', function () {
    const one = document.createElement('span');
    const two = document.createElement('span');

    one.innerText = 'Press';
    two.innerText = 'Me!';

    const result = button({ type: 'button' }, [one, two]);

    expect(result.outerHTML)
      .to.equal('<button type="button"><span>Press</span><span>Me!</span></button>');
  });
test('undefined attributes are ignored', function () { const result = span({ id: void 0 }, 'Hallo Welt!');

    expect(result.outerHTML).to.equal('<span>Hallo Welt!</span>');
  });

  test('works with just text!', function () {
    const result = span('Hello!');

    expect(result.outerHTML).to.equal('<span>Hello!</span>');
  });

  test('works with just numbers!', function () {
    const result = span(27);

    expect(result.outerHTML).to.equal('<span>27</span>');
  });

  test('accepts object syntax for classes', function () {
    const result = span({ className: { present: true, 'not-present': false } });

    expect(result.outerHTML).to.equal('<span class="present"></span>');
  });

  test('will convert classes to string', function () {
    const result = span({ className: { toString() { return 'converted' } } });

    expect(result.outerHTML).to.equal('<span class="converted"></span>');
  });

  test('accepts object syntax for style', function () {
    const result = div({ style: { position: 'absolute', 'left': '50%' } });

    expect(result.outerHTML).to.equal('<div style="position: absolute; left: 50%;"></div>');
  });

  test('style will add pixels for relevant unitless numbers', function () {
    const result = div({ style: { left: 25, top: 50, zIndex: 100 } });

    expect(result.outerHTML).to.equal('<div style="left: 25px; top: 50px; z-index: 100;"></div>');
  });

  test('display booleans toggle block and none', function() {
    const block = div({ style: { display: 'ok'.length === 2 } });
    const none = div({ style: { display: 3 > 5 } });

    expect(block.outerHTML).to.equal('<div style="display: block;"></div>');
    expect(none.outerHTML).to.equal('<div style="display: none;"></div>');
  });

  test('input is text by default', function () {
    const result = input();

    expect(result.outerHTML).to.equal('<input type="text">');
  });

  test('input type can be changed', function () {
    const result = input({ type: 'number' });

    expect(result.outerHTML).to.equal('<input type="number">');
  });

  test('creates svg root correctly', function () {
    const result = svg();

    expect(result.outerHTML).to.equal('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    expect(result).to.be.an.instanceof(SVGElement);
  });

  test('creates svg circle correctly', function () {
    const result = circle();

    expect(result.outerHTML).to.equal('<circle></circle>');
    expect(result).to.be.an.instanceof(SVGElement);
  });
});
