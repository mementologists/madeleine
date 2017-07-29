import React from 'react';
/* eslint-disable */

const TreeView = ({ array, backgroundColor }) => {
  const draw = (c) => {
    // Shout out to Matei Copot @towc
    let w = c.width = window.innerWidth; // eslint-disable-line 
    let h = c.height = window.innerHeight; // eslint-disable-line
    const ctx = c.getContext('2d');

    const opts = {
      speed: 1,
      splitSizeProbabilityMultiplier: 1 / 1000, // basically hieight of tree. low denominator makes a bush. ~100
      maxIterations: 8, // leaf count 2^n-1
      startSize: 20, // trunk size
      baseSizeMultiplier: 0.7, // branches per iteration diff sizes
      addedSizeMultiplier: 0.2,
      baseAngleVariation: -Math.PI / 16, // don't change. will break tree look
      addedAngleVariation: Math.PI / 8,
      angleVariationIterationMultiplier: 0.8, // lower make the canopy less full

      baseLeafSize: 20,
      addedLeafSize: 15,

      rotYVel: 0.01,
      focalLength: 250,
      vanishPoint: {
        x: w / 2,
        y: h / 2
      },
      translations: {
        x: 0,
        y: 200,
        z: 400
      }
    };

    let rotY = 0;
    let rotYsin = 0;
    let rotYcos = 1;

    const lines = [];

    const Line = function (parent) {
      this.iteration = parent.iteration + 1;
      this.start = parent.end;
      this.angle = {
        a: parent.angle.a + this.iteration * opts.angleVariationIterationMultiplier * (opts.baseAngleVariation + opts.addedAngleVariation * Math.random()), // eslint-disable-line
        b: parent.angle.b + this.iteration * opts.angleVariationIterationMultiplier * (opts.baseAngleVariation + opts.addedAngleVariation * Math.random()), // eslint-disable-line
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
    Line.prototype.update = function () {
      if (!this.done) {
        this.end.x += this.speed.x;
        this.end.y += this.speed.y;
        this.end.z += this.speed.z;
        this.time += 0.1;

        if (Math.random() < this.size * opts.splitSizeProbabilityMultiplier || this.time > this.size) { // eslint-disable-line
          if (this.iteration < opts.maxIterations) {
            lines.push(new Line(this));
            lines.push(new Line(this));
          } else {
            lines.push(new Leaf(this)); // eslint-disable-line
          }

          this.done = true;
        }
      }

      if (this.start.hasntCalculatedScreen) {
        this.start.calculateScreen();
      }
      this.end.calculateScreen();

      this.closest = this.start;
      if (this.end.transformed.z < this.start.transformed.z) {
        this.closest = this.end;
      }
    };
    Line.prototype.render = function () {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size * this.start.screen.scale;
      ctx.beginPath();
      ctx.moveTo(this.start.screen.x, this.start.screen.y);
      ctx.lineTo(this.end.screen.x, this.end.screen.y);
      ctx.stroke();

      this.start.hasntCalculatedScreen = this.end.hasntCalculatedScreen = true; // eslint-disable-line
    };

    const Leaf = function (parent) {
      this.point = this.closest = parent.end; // eslint-disable-line
      this.size = opts.baseLeafSize + opts.addedLeafSize * Math.random(); // eslint-disable-line
      this.time = -Math.PI / 2;
      this.speed = 0.03 + 0.03 * Math.random(); // eslint-disable-line
      this.color = 'hsla(hue,80%,50%,.5)'
        .replace('hue', 80 + 20 * Math.random()); // eslint-disable-line
    };
    Leaf.prototype.update = function () {
      this.time += this.speed;
    };
    Leaf.prototype.render = function () {
      ctx.fillStyle = this.color;
      const size = (Math.sin(this.time) / 2 + 0.5) * this.size * this.point.screen.scale; // eslint-disable-line
      ctx.fillRect(
        this.point.screen.x - size / 2, // eslint-disable-line
        this.point.screen.y - size / 2, // eslint-disable-line
        size, size
      );
    };

    const Point = function (x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;

      this.screen = {};
      this.transformed = {};
      this.hasntCalculatedScreen = true;
    };
    Point.prototype.calculateScreen = function () {
      let x = this.x;
      let y = this.y;
      let z = this.z;
  // rotate around Y
      // const X = x;
      // x = x * rotYcos - z * rotYsin; // eslint-disable-line
      // z = z * rotYcos + X * rotYsin; // eslint-disable-line
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

    const anim = function () {
      window.requestAnimationFrame(anim); // eslint-disable-line

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      rotY += opts.rotYVel;
      rotYcos = Math.cos(rotY);
      rotYsin = Math.sin(rotY);

      lines.map(line => line.update());
      lines.sort((a, b) => b.closest.transformed.z - a.closest.transformed.z);
      lines.map(line => line.render());
    };

    lines.push(new Line({
      end: new Point(0, 0, 0),
      angle: { a: Math.PI / 2, b: -Math.PI / 2 },
      size: opts.startSize,
      iteration: 0
    }
  ));

    anim();
  };
  return (
    <canvas
      onTouchTap={e => draw(e.target)}
      ref={e => draw(e)}
    />
  );
};

export default TreeView;
