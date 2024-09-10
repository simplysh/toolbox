import { Paper, Camera } from './source/draw.js';

const canvas = document.createElement('canvas');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

class Example extends Paper {
  offset = 0;
  direction = 1;

  camera = new Camera(canvas);

  constructor(canvas) {
    super(canvas, { origin: [0.5, 0.5] });

    this.camera.anchor = [0.5, 0.5];
    this.camera.transform.scale = [0.25, 0.25];
  }

  update() {
    if (this.offset > 150) this.direction = -1;
    if (this.offset < -150) this.direction = 1;

    this.offset = this.offset + 2 * this.direction;
  }

  draw() {
    this.circle(this.offset, 0, 100);
    this.rect(...this.camera.position, ...this.camera.size, this.camera.transform);
  }
}

const example = new Example(canvas);

window.example = example;

example.loop();
