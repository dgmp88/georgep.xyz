import { Component } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Delaunator from 'delaunator';
import chroma from 'chroma-js';
import * as colors from '../components/colors';

const defaultColors = colors.darkRainbow;

const defaultN = 500;

class Triangles {
  refreshPause = 150;
  refreshTimeout;
  constructor(n = defaultN, border = 200, colors = defaultColors) {
    this.n = n;
    this.border = border;
    this.colors = colors;
  }

  init() {
    this.draw = SVG().addTo('#svg');
    this.setSize();
    this.drawTriangles();
    window.onresize = () => {
      window.setTimeout(() => {
        this.setSize();
        this.drawTriangles();
      }),
        500;
    };
  }

  setSize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.draw.size(this.w, this.h);
  }

  edgesOfTriangle(t) {
    return [3 * t, 3 * t + 1, 3 * t + 2];
  }

  pointsOfTriangle(t) {
    return this.edgesOfTriangle(t).map((e) => this.delaunay.triangles[e]);
  }

  setPoints() {
    let points = [];

    let getRnd = (xy) =>
      Math.round((xy + this.border * 2) * Math.random() - this.border);

    for (let i = 0; i < this.n; i++) {
      points.push([getRnd(this.w), getRnd(this.h)]);
    }

    this.points = points;
  }

  drawTriangles() {
    this.cscale = chroma.scale(this.colors).mode('lch');
    this.setPoints();
    this.delaunay = Delaunator.from(this.points);

    for (let t = 0; t < this.delaunay.triangles.length / 3; t++) {
      const tpoints = this.pointsOfTriangle(t).map((p) => this.points[p]);
      let [[x1, y1], [x2, y2], [x3, y3]] = tpoints;
      let avgX = (x1 + x2 + x3) / 3;
      let avgY = (y1 + y2 + y3) / 3;

      const col = this.cscale((avgX / this.w + avgY / this.h) / 2);
      this.draw
        .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
        .fill(col.hex())
        .stroke({ width: 1, color: col.hex() });
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
    this.drawTriangles();
  }

  setN(n) {
    this.n = n;
  }

  setColors(colors) {
    this.colors = colors;
    this.drawTriangles();
  }

  download() {
    console.log(this);
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
    let triangles = new Triangles();
    this.state = {
      mounted: false,
      triangles: triangles,
      colors: triangles.colors,
    };
    this.download = this.download.bind(this);
    this.refresh = this.refresh.bind(this);
    this.changeN = this.changeN.bind(this);
    this.removeColor = this.removeColor.bind(this);
    // this.getColors = this.getColors.bind(this);
  }

  componentDidMount() {
    if (this.state.mounted) {
      return;
    }

    this.state.triangles.init();

    this.state.mounted = true;
  }

  download() {
    this.state.triangles.download();
  }

  refresh() {
    this.state.triangles.refresh();
  }

  changeN(event) {
    let n = parseInt(event.target.value) ** 2;
    this.state.triangles.setN(n);
    this.state.triangles.refreshAfterPause();
  }

  removeColor(event) {
    let inpt = event.target.parentElement.querySelector('input');
    let idx = this.state.colors.indexOf(inpt.value);
    console.log('remove', idx);
    this.state.colors.splice(idx, 1);
  }

  render() {
    return (
      <>
        <div className="absolute -z-1" id="svg"></div>
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div
              className="rounded p-5 bg-base-100 bg-opacity-50"
              // style={{ 'background-color': 'rgba(255, 255, 255, 0.5)' }}
            >
              <h1 className="text-3xl font-bold">Background Designer</h1>
              <p className="py-6">
                Resize the window to get the export size you want
              </p>
              <div>
                <div className="font-medium">Number of triangles</div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  defaultValue={defaultN ** 0.5}
                  className="range"
                  onChange={this.changeN}
                ></input>
              </div>

              <div className="pb-2">
                <div className="font-medium">Colors</div>
                <div className="flex flex-wrap">
                  {this.state.colors.map((item) => (
                    <div key={item}>
                      <input
                        type="text"
                        className="input-sm w-24 mx-2 flex-1"
                        value={item}
                        onChange={(event) => {
                          console.log(event.target);
                        }}
                      ></input>
                      <span
                        className="text-red-500"
                        onClick={(event) => {
                          let colors = this.state.colors;
                          let idx = colors.indexOf(item);
                          colors.splice(idx, 1);
                          this.setState({ colors });
                          this.state.triangles.setColors(colors);
                        }}
                      >
                        x
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => this.state.triangles.refresh()}
              >
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.state.triangles.download()}
              >
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
