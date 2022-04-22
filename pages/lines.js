import { Component } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import chroma from 'chroma-js';
import _ from 'lodash';

const retiPage = ['#03045E', '#11488e', '#032550'];
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  negate() {
    return new Vector2(-this.x, -this.y);
  }
}

function randSign() {
  if (Math.random() > 0.5) {
    return 1;
  }
  return -1;
}

class Lines {
  refreshPause = 200;
  debug = false;
  bzXMinFrac = 0.1;
  refreshTimeout;
  constructor(nLines = 4, nPointsPerLine = 4, bzMax = 100, colors = retiPage) {
    this.nLines = nLines;
    this.nPointsPerLine = nPointsPerLine;
    this.bzMax = bzMax;
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
        500;
    };
  }

  setSize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.bzXMin = this.w * this.bzXMinFrac;
    this.draw.size(this.w, this.h);
  }

  bezierBetween(p1, p2, lastOffset = undefined) {
    let randOffset = () => {
      return new Vector2(
        Math.max(Math.random() * this.bzMax, this.bzXMin),
        Math.random() * this.bzMax * randSign()
      );
    };

    if (lastOffset === undefined) {
      lastOffset = randOffset();
    }

    let nextOffset = randOffset();

    let c1 = { x: p1.x - lastOffset.x, y: p1.y - lastOffset.y };
    let c2 = { x: p2.x - nextOffset.x, y: p2.y - nextOffset.y };

    let string = `C${c1.x} ${c1.y}
    ${c2.x} ${c2.y}
    ${p2.x} ${p2.y} `;

    return { string, c1, c2, offset: nextOffset.negate() };
  }

  getLinePoints(yUpper, yLower) {
    // Remember reversed coordinates - e.g. yUpper = 0, yLower = 10
    let points = [];
    let yRange = yLower - yUpper;
    let y = yUpper + yRange / 2;

    // For a single line

    for (let i = 0; i < this.nPointsPerLine; i++) {
      let x = (i / (this.nPointsPerLine - 1)) * this.w;
      points.push(new Vector2(x, y));
      console.log(x, y);
    }
    return points;
  }

  drawLines() {
    // Fill the background with color
    this.draw.rect(this.w, this.h).fill(this.cscale(0).hex());
    let c1s = [],
      c2s = [];

    let yGap = this.h / this.nLines;
    for (let lN = 0; lN < this.nLines; lN += 1) {
      let yUpper = lN * yGap;
      let yLower = yUpper + yGap;

      let points = this.getLinePoints(yUpper, yLower);
      // Go to start
      let pathStr = `M0 ${this.h} V${points[0].y} `;
      let lastOffset;

      for (let i = 0; i < this.nPointsPerLine - 1; i++) {
        let p1 = points[i];
        let p2 = points[i + 1];
        let bz = this.bezierBetween(p1, p2, lastOffset);
        pathStr += bz.string;
        lastOffset = bz.offset;
        c1s.push(bz.c1);
        c2s.push(bz.c2);
      }

      // Go to end
      pathStr += `H${this.w} V${this.h} z`;
      let colFrac = (lN + 1) / this.nLines;
      let col = this.cscale(colFrac).hex();
      this.draw.path(pathStr).fill(col);

      if (this.debug) {
        for (let p of c1s) {
          this.draw.circle(5).move(p.x, p.y).fill('white');
        }
        for (let p of c2s) {
          this.draw.circle(5).move(p.x, p.y).fill('gray');
        }
      }
    }

    // To animate
    // https://svgjs.dev/docs/3.0/shape-elements/#path-plot
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
    this.n = n;
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

class Background extends Component {
  constructor(props) {
    super(props);

    this.state = { mounted: false };
    this.download = this.download.bind(this);
    this.refresh = this.refresh.bind(this);
    this.changeN = this.changeN.bind(this);
  }
  componentDidMount() {
    if (this.state.mounted) {
      return;
    }

    let lines = new Lines();

    this.state.lines = lines;
    this.state.mounted = true;
  }

  download() {
    this.state.lines.download();
  }

  refresh() {
    this.state.lines.refresh();
  }

  changeN(event) {
    let n = parseInt(event.target.value);
    this.state.lines.setN(n);
    this.state.lines.refreshAfterPause();
  }

  render() {
    return (
      <>
        <div className="absolute -z-1" id="svg"></div>
        <div className="hero min-h-screen hidden">
          <div className="hero-content text-center">
            <div
              className="rounded p-5"
              style={{ 'background-color': 'rgba(255, 255, 255, 0.5)' }}
            >
              <h1 className="text-3xl font-bold">Background Designer</h1>
              <p className="py-6">
                Resize the window to get the export size you want
              </p>
              <div>
                <div className="font-medium">Number of lines</div>

                <input
                  type="range"
                  min="20"
                  max="3000"
                  defaultValue={3}
                  className="range"
                  onChange={this.changeN}
                ></input>
              </div>

              <div className="pb-2">
                <div className="font-medium">Colors</div>
                {/* <div>
                  {this.state.lines.colors.map((item) => (
                    <input
                      type="text"
                      className="input-sm w-24 mx-2"
                      value="a"
                    ></input>
                  ))}
                </div> */}
              </div>

              <button className="btn btn-secondary" onClick={this.refresh}>
                Refresh
              </button>
              <button className="btn btn-primary" onClick={this.download}>
                Download SVG
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Background;
