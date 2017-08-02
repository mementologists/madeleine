import Leaf from './leaf';
import Point from './point';

const Line = function (parent, opts) { // eslint-disable-line func-names
  this.iteration = parent.iteration + 1;
  this.start = parent.end;
  this.angle = {
    a: parent.angle.a + this.iteration * opts.angleVariationIterationMultiplier * (opts.baseAngleVariation + opts.addedAngleVariation * Math.random()), // eslint-disable-line
    b: parent.angle.b + this.iteration * opts.angleVariationIterationMultiplier * (opts.baseAngleVariation + opts.addedAngleVariation * Math.random()) // eslint-disable-line
  };
  this.size = (opts.baseSizeMultiplier + opts.addedSizeMultiplier * Math.random()) * parent.size; // eslint-disable-line

  this.color = 'hsla(hue,80%,50%,alp)'
    .replace('hue', (1 - this.iteration / opts.maxIterations) * 40) // eslint-disable-line
    .replace('alp', 1 - (this.iteration / opts.maxIterations) * 0.9); // eslint-disable-line

  const sinA = Math.sin(this.angle.a);
  const sinB = Math.sin(this.angle.b);
  const cosA = Math.cos(this.angle.a);
  const cosB = Math.cos(this.angle.b);

  this.speed = {
    x: opts.speed * cosA * sinB,
    y: opts.speed * sinA * sinB,
    z: opts.speed * cosB
  };

  this.end = this.closest = new Point( // eslint-disable-line
    this.start.x,
    this.start.y,
    this.start.z
  );

  this.done = false;
  this.time = 0;
};

Line.prototype.update = function (opts, lines) { // eslint-disable-line func-names
  if (!this.done) {
    this.end.x += this.speed.x;
    this.end.y += this.speed.y;
    this.end.z += this.speed.z;
    this.time += 0.1;

    if (Math.random() < this.size * opts.splitSizeProbabilityMultiplier || this.time > this.size) { // eslint-disable-line
      if (this.iteration < opts.maxIterations) {
        lines.push(new Line(this, opts));
        lines.push(new Line(this, opts));
      } else {
        lines.push(new Leaf(this, opts)); // eslint-disable-line
      }

      this.done = true;
    }
  }

  if (this.start.hasntCalculatedScreen) {
    this.start.calculateScreen(opts);
  }
  this.end.calculateScreen(opts);

  this.closest = this.start;
  if (this.end.transformed.z < this.start.transformed.z) {
    this.closest = this.end;
  }
};

Line.prototype.render = function (ctx) { // eslint-disable-line func-names
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.size * this.start.screen.scale;
  ctx.beginPath();
  ctx.moveTo(this.start.screen.x, this.start.screen.y);
  ctx.lineTo(this.end.screen.x, this.end.screen.y);
  ctx.stroke();

  this.start.hasntCalculatedScreen = this.end.hasntCalculatedScreen = true; // eslint-disable-line
};

export default Line;
