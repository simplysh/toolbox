import { Paper } from './source/draw.js';

const canvas = document.createElement('canvas');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

class Example extends Paper {
  offset = 0;
  direction = 1;

  constructor(canvas, options) {
    super(canvas, options);
  }

  update() {
    if (this.offset > 150) this.direction = -1;
    if (this.offset < -150) this.direction = 1;

    this.offset = this.offset + 2 * this.direction;
  }

  draw() {
    this.circle(this.offset, 0, 100);
  }
}

const example = new Example(canvas);

window.example = example;

example.loop();
