import { Paper, Camera } from './source/draw.js';
import { lerp, smoothstep } from './source/math.js';

const canvas = document.createElement('canvas');

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

class Example extends Paper {
  offset = 0;
  direction = 1;

  overview = true;
  start;

  userCamera = new Camera(canvas);
  viewCamera = new Camera(canvas);

  constructor(canvas) {
    super(canvas, { origin: [0.5, 0.5] });

    // todo: respect anchor in active camera
    this.userCamera.anchor = [0.5, 0.5];
    this.userCamera.transform.scale = [0.25, 0.25];
    this.userCamera.transform.rotation = 45;

    this.activeCamera = this.viewCamera;
  }

  update() {
    if (this.offset > 150) this.direction = -1;
    if (this.offset < -150) this.direction = 1;

    this.offset = this.offset + 2 * this.direction;

    if (this.start) {
      const t = smoothstep((Date.now() - this.start) / 500);
      const from = this.overview ? this.userCamera : this.defaultCamera;
      const to = this.overview ? this.defaultCamera : this.userCamera;

      this.viewCamera.transform.translation = [
        lerp(from.transform.translation[0], to.transform.translation[0], t),
        lerp(from.transform.translation[1], to.transform.translation[1], t),
      ];
      this.viewCamera.transform.scale = [
        lerp(from.transform.scale[0], to.transform.scale[0], t),
        lerp(from.transform.scale[1], to.transform.scale[1], t),
      ];
      this.viewCamera.transform.rotation = lerp(from.transform.rotation, to.transform.rotation, t);
    }
  }

  draw() {
    this.circle(this.offset, 0, 100);
    this.rect(0, 0, 200, 1);
    this.rect(...this.userCamera.position, ...this.userCamera.size, this.userCamera.transform);
  }
}

const example = new Example(canvas);

window.example = example;

example.loop();

canvas.addEventListener('keydown', ({ code }) => {
  if (code === 'Space') {
    example.overview = !example.overview;
    example.start = Date.now();
    console.log('start', example.overview);
    return;
  }
});
