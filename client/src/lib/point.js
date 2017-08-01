
const Point = function (x, y, z) { // eslint-disable-line func-names
  this.x = x;
  this.y = y;
  this.z = z;

  this.screen = {};
  this.transformed = {};
  this.hasntCalculatedScreen = true;
};

Point.prototype.calculateScreen = function (opts) { // eslint-disable-line func-names
  let x = this.x;
  let y = this.y;
  let z = this.z;
  // rotate around Y
  if (opts.rotate) {
    const X = x;
    x = x * opts.rotYcos - z * opts.rotYsin; // eslint-disable-line
    z = z * opts.rotYcos + X * opts.rotYsin; // eslint-disable-line
  }
  // translate
  x += opts.translations.x;
  y += opts.translations.y;
  z += opts.translations.z;
  // I only need the z for now
  this.transformed.z = z;

  this.screen.scale = opts.focalLength / z;
  this.screen.x = opts.vanishPoint.x + x * this.screen.scale; // eslint-disable-line
  this.screen.y = opts.vanishPoint.y + y * this.screen.scale; // eslint-disable-line

  this.hasntCalculatedScreen = false;
};

export default Point;
