import { SVG } from '@svgdotjs/svg.js';
import * as colors from './colors';
const defaultColor = colors.reti;
import chroma from 'chroma-js';
import { Vector2, randomSign } from './math';

export class Lines {
  refreshPause = 200;
  debug = false;
  border = 1.0;
  refreshTimeout;
  constructor(
    nLines = 4,
    nPointsPerLine = 6,
    bzMaxY = 150,
    colors = defaultColor
  ) {
    this.nLines = nLines;
    this.nPointsPerLine = nPointsPerLine;
    this.bzMaxY = bzMaxY;
    this.colors = colors;
    this.cscale = chroma.scale(colors).mode('lch');

    this.draw = SVG().addTo('#svg');
    this.setSize();
    this.drawLines();

    window.onresize = () => {
      window.setTimeout(() => {
        this.setSize();
        this.drawLines();
      }),
        this.refreshPause;
    };
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
      let x = xTot * xFrac;
      points.push(new Vector2(x, y));
    }
    return points;
  }

  drawLines() {
    // Fill the background with color
    this.draw.rect(this.w, this.h).fill(this.cscale(0).hex());

    let yGap = this.h / this.nLines;
    for (let lN = 0; lN < this.nLines; lN += 1) {
      let lines = [];
      let yUpper = lN * yGap;
      let yLower = yUpper + yGap;
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
        lines.push(bz);
      }

      // Go to end
      let end = `H${this.w} V${this.h} z`;
      pathStr += end;
      let colFrac = (lN + 1) / this.nLines;
      let col = this.cscale(colFrac).hex();
      this.draw.path(pathStr).fill(col);

      if (this.debug) {
        for (const line of lines) {
          const { p1, p2, c } = line;
          this.draw.circle(5).move(p1.x, p1.y).fill('white');
          this.draw.circle(5).move(p2.x, p2.y).fill('white');
          this.draw.circle(5).move(c.x, c.y).fill('green');
        }
      }
    }
  }

  refreshAfterPause() {
    // Ref
    clearTimeout(this.refreshTimeout);
    this.refreshTimeout = setTimeout(() => {
      this.refresh();
    }, this.refreshPause);
  }

  refresh() {
    this.draw.clear();
    this.drawLines();
  }

  setN(n) {
    this.nLines = n;
  }

  download() {
    let data = this.draw.svg();
    let filename = 'background.svg';
    let type = 'plain/text';
    var file = new Blob([data], { type: type });
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}