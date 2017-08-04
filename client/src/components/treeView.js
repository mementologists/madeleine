import React from 'react';
import PropTypes from 'prop-types';
import { Line, Point } from '../lib';
import sampleData from '../lib/sampleHistory.json';

const TreeView = ({ emoHistory, backgroundColor }) => {
  const MAXHIST = 2000; // Stops exponential growth of the tree

  const draw = (c) => {
    let w = c.width = window.innerWidth; // eslint-disable-line 
    let h = c.height = window.innerHeight; // eslint-disable-line
    let rotY = 0;
    const lines = [];
    const ctx = c.getContext('2d');

    const history = emoHistory.length ?
      Object.assign([], emoHistory) : Object.assign([], sampleData);

    const height =
      !emoHistory.length ? 1 : Math.max((1 / (90 * history.length)), 1 / MAXHIST);
    const maxIterations = // leaf count 2^n-1;
      Math.max(Math.ceil(Math.log(history.length) / Math.log(2)) + 1, 3);
    const startSize = 10 + Math.ceil(Math.log(history.length)); // trunk size

    const opts = {
      speed: 1,
      rotate: true,
      history,
      splitSizeProbabilityMultiplier: height,
      maxIterations,
      startSize,
      baseSizeMultiplier: 0.7, // branches per iteration diff sizes
      addedSizeMultiplier: 0.2,
      baseAngleVariation: -Math.PI / 16,
      addedAngleVariation: Math.PI / 8,
      angleVariationIterationMultiplier: 1.6, // lower make the canopy less full

      baseLeafSize: 20,
      addedLeafSize: 15,

      rotYVel: 0.01,
      rotYsin: 0,
      rotYcos: 1,

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
    const anim = () => {
      window.requestAnimationFrame(anim); // eslint-disable-line

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      rotY += opts.rotYVel;
      opts.rotYcos = Math.cos(rotY);
      opts.rotYsin = Math.sin(rotY);

      lines.map(line => line.update(opts, lines));
      lines.sort((a, b) => b.closest.transformed.z - a.closest.transformed.z);
      lines.map(line => line.render(ctx));
    };

    lines.push(new Line({
      end: new Point(0, 0, 0),
      angle: { a: Math.PI / 2, b: -Math.PI / 2 },
      size: opts.startSize,
      iteration: 0
    }, opts));

    anim();
  };

  return (
    <canvas
      onTouchTap={e => draw(e.target)}
      ref={e => draw(e)}
    />
  );
};

TreeView.propTypes = {
  backgroundColor: PropTypes.string,
  emoHistory: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    _id: PropTypes.string,
    summary: PropTypes.shape({
      sadness: PropTypes.number,
      joy: PropTypes.number,
      fear: PropTypes.number,
      disgust: PropTypes.number,
      anger: PropTypes.number
    })
  }))
};

export default TreeView;
