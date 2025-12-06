import chroma from 'chroma-js';
import { Vector2, randomSign } from '../math';

export class Lines {
  refreshPause = 200;
  rippleTotTime = 40000;
  debug = false;
  border = 1.0;

  constructor(
    draw,
    nLines,
    colors,
    nPointsPerLine = 6,
    bzMaxY = 150,
    animate = true
  ) {
    this.draw = draw;
    this.nLines = nLines;
    this.nPointsPerLine = nPointsPerLine;
    this.bzMaxY = bzMaxY;
    this.animate = animate;
    this.colors = colors;
    this.cscale = chroma.scale(colors).mode('lch');

    this.setSize();
    this.drawLines();
  }

  log(str) {
    if (this.debug) {
      console.log(str);
    }
  }

  setSize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.xGap = this.w / this.nPointsPerLine;
    this.draw.size(this.w, this.h);
  }

  bezierBetween(p1, p2, sign) {
    let dX = Math.random() * (p2.x - p1.x);
    let dY = Math.random() * this.bzMaxY * randomSign();

    let c = { x: p1.x + dX, y: p1.y + dY };

    let str = `S${c.x} ${c.y}
    ${p2.x} ${p2.y}`;
    return { str, p1, p2, c };
  }

  getLinePoints(yUpper, yLower) {
    // Remember reversed coordinates - e.g. yUpper = 0, yLower = 10
    let points = [];
    let yRange = yLower - yUpper;
    let y = yUpper + yRange / 2;

    // For a single line
    let border = this.border * this.w;

    let xStart = -border * Math.random();
    let xEnd = this.w + border * Math.random();
    let xTot = xEnd - xStart;
    for (let i = 0; i < this.nPointsPerLine; i++) {
      let xFrac = i / (this.nPointsPerLine - 1);
      let x = xTot * xFrac + xStart;
      points.push(new Vector2(x, y));
    }
    return points;
  }

  getLineString(idx, debug) {
    let yUpper = idx * this.yGap;
    let yLower = yUpper + this.yGap;
    let points = this.getLinePoints(yUpper, yLower);
    // Go to start
    let start = `M0 ${this.h} V${points[0].y} `;
    let pathStr = start;
    // Draw lines between consecutive points

    for (let i = 0; i < this.nPointsPerLine - 1; i++) {
      let p1 = points[i];
      let p2 = points[i + 1];

      let sign = i % 2 == 0 ? 1 : -1;

      let bz = this.bezierBetween(p1, p2, sign);
      pathStr += bz.str;
      debug.push(bz);
    }

    // Go to end
    let end = `H${this.w} V${this.h} z`;
    pathStr += end;
    return pathStr;
  }

  drawLines() {
    // Fill the background with color
    this.draw.rect(this.w, this.h).fill(this.cscale(0).hex());
    this.yGap = this.h / this.nLines;

    let debug = [];
    for (let idx = 0; idx < this.nLines; idx += 1) {
      let lineStr = this.getLineString(idx, debug);
      let colFrac = (idx + 1) / this.nLines;
      let col = this.cscale(colFrac).hex();
      let path = this.draw.path(lineStr).fill(col);

      if (this.animate) {
        let animateTime = this.rippleTotTime * (0.5 + 0.5 * Math.random());
        let lineStr2 = this.getLineString(idx, debug);
        path.animate(animateTime).plot(lineStr2).loop(true, true);
      }
    }
    if (this.debug) {
      for (const point of debug) {
        const { p1, p2, c } = point;
        this.draw.circle(5).move(p1.x, p1.y).fill('white');
        this.draw.circle(5).move(p2.x, p2.y).fill('white');
        this.draw.circle(5).move(c.x, c.y).fill('green');
      }
    }
  }

  refresh() {
    this.setSize();
    this.draw.clear();
    this.drawLines();
  }
}
