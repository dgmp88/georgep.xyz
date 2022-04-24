import { useState, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Delaunator from 'delaunator';
import chroma from 'chroma-js';
import * as colors from '../components/colors';

const defaultColors = colors.reti;

const defaultN = 500;

class Triangles {
  refreshPause = 150;
  refreshTimeout;
  constructor(n = defaultN, border = 200, colors = [...defaultColors]) {
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
      const hex = col.hex();
      this.draw
        .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
        .fill(hex)
        .stroke({ width: 1, color: hex });
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

  cleanup() {
    this.draw.clear();
    this.draw.remove();
  }

  setColors(colors) {
    for (let color of colors) {
      if (!chroma.valid(color)) {
        return;
      }
    }
    this.colors = colors;
    this.refresh();
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

function Background() {
  const [triangles, setTriangles] = useState(new Triangles());
  const [colors, setColors] = useState(defaultColors);
  useEffect(() => {
    triangles.init();
    return function cleanup() {
      triangles.cleanup();
    };
  });

  return (
    <>
      <div className="absolute -z-1" id="svg"></div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="rounded p-5 bg-base-100 bg-opacity-50">
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
                onChange={(event) => {
                  let n = parseInt(event.target.value) ** 2;
                  triangles.setN(n);
                  triangles.refreshAfterPause();
                }}
              ></input>
            </div>

            <div className="pb-2">
              <div className="font-medium">Colors</div>
              <div className="flex flex-wrap">
                {colors.map((color, idx) => (
                  <div key={idx}>
                    <input
                      type="text"
                      className="input-sm w-24 mx-2 flex-1"
                      value={color}
                      onChange={(event) => {
                        colors[idx] = event.target.value;
                        setColors([...colors]);
                        triangles.setColors([...colors]);
                      }}
                    ></input>
                    <span
                      className="text-red-500"
                      onClick={(event) => {
                        let idx = colors.indexOf(color);
                        let colorsTmp = [...colors];
                        colorsTmp.splice(idx, 1);
                        setColors(colorsTmp);
                        triangles.setColors(colorsTmp);
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
              onClick={() => triangles.refresh()}
            >
              Refresh
            </button>
            <button
              className="btn btn-primary"
              onClick={() => triangles.download()}
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Background;
