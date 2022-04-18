import { colors, lerpPalette } from '../../components/colors.js';
import { Component } from 'react';

import _ from 'lodash';

class FourK extends Component {
  componentDidMount() {
    var canvas = document.getElementById('canvas');
    const w = 600;
    const h = 800;

    canvas.width = w;
    canvas.height = h;

    const palette = colors.coolorsROYGBIV;

    const ctx = canvas.getContext('2d');

    const lifeExpect = 80;

    // Fill the background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawDots(frac) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let yN = lifeExpect;
      let xN = 52;
      let r = 4;
      let m = 3 * r;
      let xS = (w - m * 2) / (xN - 1);
      let yS = (h - m * 2) / (yN - 1);
      let idx = 1;
      const tot = yN * xN;
      let maybeFirstCircle = true;
      if (frac == 0) {
        maybeFirstCircle = false;
      }
      for (let y = 0; y < yN; y += 1) {
        let y1 = y * yS + m;
        for (let x = 0; x < xN; x += 1) {
          let color = lerpPalette(palette, y / yN / 2 + x / xN / 2);

          let x1 = x * xS + m;
          let r_ = r;

          let draw;
          if (idx / tot < frac) {
            draw = () => ctx.stroke();
          } else {
            if (maybeFirstCircle) {
              r_ *= 0.5;
              maybeFirstCircle = false;
            }
            draw = () => ctx.fill();
          }

          // Draw a circle
          ctx.beginPath();
          ctx.ellipse(x1, y1, r_, r_, 0, 0, Math.PI * 2);

          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          draw();
          idx += 1;
        }
      }
    }

    drawDots(0);

    let drawTimeout = 1000;
    let drawTimer = null;

    var dobInput = document.getElementById('dob');
    function dateChange() {
      let dob = new Date(dobInput.value);
      let ageMs = new Date() - dob;
      var millisecondsPerDay = 24 * 60 * 60 * 1000;

      let ageYears = ageMs / millisecondsPerDay / 365.25;
      let timeFrac = ageYears / lifeExpect;
      if ((timeFrac > 0) & (timeFrac < 1)) {
        clearTimeout(drawTimer);
        drawTimer = setTimeout(() => {
          drawDots(timeFrac);
        }, drawTimeout);
      }
    }

    dobInput.addEventListener('change', dateChange);
  }
  render() {
    return (
      <div id="app" className="m-5">
        <div className="flex">
          <div className="w-1/4"></div>
          <div className="w-1/4">Your DOB</div>
          <div className="w-1/4">
            <input
              type="date"
              id="dob"
              name="trip-start"
              min="1900-01-01"
              max="2020-12-31"
            />
          </div>
        </div>
        <div>
          <canvas id="canvas" className="m-auto"></canvas>
        </div>
      </div>
    );
  }
}

export default FourK;
