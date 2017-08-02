const colorMap = {
  neutral: 75,
  anger: 0, // red
  disgust: 120, // green
  fear: 300, // purple
  joy: 60, // yellow
  sadness: 240 // blue
};

const Leaf = function (parent, opts) { // eslint-disable-line func-names
  this.point = this.closest = parent.end; // eslint-disable-line
  this.size = opts.baseLeafSize + opts.addedLeafSize * Math.random(); // eslint-disable-line
  this.time = -Math.PI / 2;
  this.speed = 0.03 + 0.03 * Math.random(); // eslint-disable-line

  this.moment = opts.history.length ? opts.history.shift() : {};
  this.emoName = Object.keys(this.moment).length ?
    (Object.keys(this.moment.summary).sort((a, b) =>
       this.moment.summary[b] - this.moment.summary[a]))[0]
    : 'neutral';
  /* eslint-disable no-mixed-operators */
  this.emoHue = colorMap[this.emoName] + 10 * (Math.random() * 2 + -1);
  /* eslint-disable no-mixed-operators */
  this.emoLuminance = this.emoName !== 'neutral' ? 50 : 100;
  this.emoAlpha = this.emoName !== 'neutral' ? 0.625 : 0;

  this.color = `hsla(${this.emoHue}, 100%, ${this.emoLuminance}%, ${this.emoAlpha})`;
};

Leaf.prototype.update = function () { // eslint-disable-line func-names
  this.time += this.speed;
};

Leaf.prototype.render = function (ctx) { // eslint-disable-line func-names
  ctx.fillStyle = this.color;
  const size = (Math.sin(this.time) / 2 + 0.5) * this.size * this.point.screen.scale; // eslint-disable-line
  ctx.fillRect(
    this.point.screen.x - size / 2, // eslint-disable-line
    this.point.screen.y - size / 2, // eslint-disable-line
    size, size
  );
};

export default Leaf;
