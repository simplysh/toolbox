export class Paper {
  canvas;
  context;
  world;

  defaultCamera;
  activeCamera;

  constructor(canvas, { origin = [0.0, 0.0] } = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    canvas.setAttribute('tabIndex', canvas.getAttribute('tabIndex') ?? -1);

    this.world = {
      origin,
    };

    this.activeCamera = this.defaultCamera = new Camera(canvas);
  }

  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.stroke();
  }

  rect(x, y, width, height, transform = new Transform()) {
    this.context.save();

    this.context.scale(...transform.scale);
    this.context.rotate(transform.rotation * Math.PI / 180);
    this.context.translate(...transform.translation);

    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.stroke();

    this.context.restore();
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
    this.context.scale(
      1 / this.activeCamera.transform.scale[0],
      1 / this.activeCamera.transform.scale[1]
    );
    this.context.rotate(-this.activeCamera.transform.rotation * Math.PI / 180);
    this.context.translate(...this.activeCamera.transform.translation);

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

export class Camera {
  _x;
  _y;
  width;
  height;
  anchor = [0, 0];

  transform = new Transform();

  get x() {
    return this._x - this.width * this.anchor[0];
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y - this.height * this.anchor[1];
  }

  set y(value) {
    this._y = value;
  }

  get size() {
    return [this.width, this.height];
  }

  get position() {
    return [this.x, this.y];
  }

  constructor(canvas, x = 0, y = 0) {
    this.width = canvas.width;
    this.height = canvas.height;
    this._x = x;
    this._y = y;
  }
}

export class Transform {
  scale;
  rotation;
  translation;

  constructor(
    translation = [0, 0],
    rotation = 0,
    scale = [1, 1]
  ) {
    this.scale = scale;
    this.rotation = rotation;
    this.translation = translation;
  }
}
