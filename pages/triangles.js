import { useState, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Delaunator from 'delaunator';
import chroma from 'chroma-js';
import * as colorUtils from '../components/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faDownload,
  faXmark,
  faPlus,
  faPaste,
} from '@fortawesome/free-solid-svg-icons';

const defaultColors = colorUtils.darkRainbow;

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
        console.log('failed, not updating');
        return;
      }
    }
    // Make a copy, so invalid options aren't automatically set too
    this.colors = [...colors];
    console.log('updated');
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
        <div className="hero-content text-center max-w-xl">
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
              <div className="flex flex-wrap justify-center">
                {colors.map((color, idx) => (
                  <div key={idx}>
                    <input
                      type="text"
                      className="input-sm w-24 m-2 flex-1"
                      style={{
                        'background-color': color,
                        color: colorUtils.getContrastingBlackOrWhite(color),
                      }}
                      value={color}
                      onChange={(event) => {
                        colors[idx] = event.target.value;
                        setColors([...colors]);
                        triangles.setColors([...colors]);
                      }}
                    ></input>
                    <span
                      className="btn btn-error btn-xs"
                      onClick={(event) => {
                        let idx = colors.indexOf(color);
                        let colorsTmp = [...colors];
                        colorsTmp.splice(idx, 1);
                        setColors(colorsTmp);
                        triangles.setColors(colorsTmp);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                  </div>
                ))}
              </div>
              <span
                className="btn btn-secondary btn-xs m-3"
                onClick={(event) => {
                  let colorsTmp = [...colors];
                  colorsTmp.push(chroma.random().hex());
                  setColors(colorsTmp);
                  triangles.setColors(colorsTmp);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </span>

              <label
                htmlFor="my-modal"
                className="btn btn-secondary btn-xs m-3 modal-button"
              >
                <FontAwesomeIcon icon={faPaste} />
              </label>
              <input
                type="checkbox"
                id="my-modal"
                className="modal-toggle"
              ></input>
              <div className="modal">
                <div className="modal-box">
                  <p className="py-4">
                    Paste colors below. Try{' '}
                    <a className="link" href="https://www.colourlovers.com/">
                      Colour Lovers
                    </a>{' '}
                    or{' '}
                    <a className="link" href="https://coolors.co/">
                      coolors
                    </a>
                    . For example:{' '}
                  </p>
                  <textarea
                    id="colorTextArea"
                    className="bg-slate-200 w-full"
                    placeholder="#B6211B,#E77833,#ECD817,#98E1F2"
                  ></textarea>
                  <div class="modal-action">
                    <label
                      for="my-modal"
                      class="btn"
                      onClick={() => {
                        const text =
                          document.getElementById('colorTextArea').value;

                        let newCols = [
                          ...text.matchAll(/([0-9a-fA-F]{3}){1,2}/g),
                        ];

                        newCols = newCols.map((item) => item[0]);
                        if (newCols.length > 1) {
                          setColors(newCols);
                          triangles.setColors(newCols);
                        }
                      }}
                    >
                      Done
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-primary m-2"
                onClick={() => triangles.refresh()}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={() => triangles.download()}
              >
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Background;
