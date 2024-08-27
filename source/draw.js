export class Camera {
  width;
  height;

  scale = [1, 1];
  rotation = 0;
  translation = [0, 0];

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

export class Paper {
  canvas;
  context;
  world;

  defaultCamera;
  activeCamera;

  constructor(canvas, { origin = [0.5, 0.5] } = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.world = {
      origin,
    };

    this.activeCamera = this.defaultCamera = new Camera(canvas.width, canvas.height);
  }

  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.stroke();
  }

  paint() {
    const { width, height } = this.canvas;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // world transform
    this.context.save();
    this.context.translate(
      width * this.world.origin[0],
      height * this.world.origin[1]
    );

    // camera transform
    this.context.scale(1 / this.activeCamera.scale[0], 1 / this.activeCamera.scale[1]);
    this.context.rotate(-this.activeCamera.rotation * Math.PI / 180);
    this.context.translate(...this.activeCamera.translation);

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
