export class Paper {
  canvas;
  context;
  world;

  constructor(canvas, { origin = [0.5, 0.5] } = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.world = {
      origin,
    };
  }

  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.stroke();
  }

  paint() {
    const { width, height } = this.canvas;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(
      width * this.world.origin[0],
      height * this.world.origin[1]
    );

    this.draw?.();

    this.context.restore();
  }

  frame() {
    this.update?.();
    this.paint();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.frame();
  }
}
