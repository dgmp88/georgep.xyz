import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { SVG } from '@svgdotjs/svg.js';
import * as colorUtils from '../lib/colors';
import { Triangles } from '../lib/triangles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faDownload,
  faXmark,
  faPlus,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons';

const defaultNTriangles = 500;
const defaultColors = colorUtils.darkRainbow;
let defaultEdgeCol = '#ee9b0055'; // with some opacity
let edgesOn = false;

function Palette(props) {
  const colors = props.colors.split(',');
  return (
    <>
      <div
        className="flex flex-wrap justify-center bg-gray-100 m-2 rounded cursor-pointer"
        onClick={() => props.clickHandler(colors)}
      >
        {colors.map((color, idx) => (
          <div
            key={idx}
            className="m-2 w-4 h-4 rounded-xl"
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

function Color(props) {
  const [color, setColor] = useState(props.color);
  const [text, setText] = useState(props.color);

  return (
    <>
      <input
        type="text"
        className="input-sm w-28 m-2 flex-1"
        style={{
          backgroundColor: color,
          color: colorUtils.getContrastingBlackOrWhite(color),
        }}
        value={text}
        onChange={(event) => {
          let t = event.target.value;
          setText(t);
          let c = t;
          if (chroma.valid(t)) {
            props.onColorUpdate(c);
          } else {
            c = '#979797';
          }
          setColor(c);
        }}
      ></input>
    </>
  );
}

function Background() {
  const [nTriangles, setNTriangles] = useState(defaultNTriangles);
  const [edges, setEdges] = useState(edgesOn);
  const [edgeCol, setEdgeCol] = useState(defaultEdgeCol);
  const [colors, setColors] = useState([...defaultColors]);
  const [triangles, setTriangles] = useState(undefined);
  const refreshTimeoutTime = 200;
  let refreshTimeout;

  const download = () => {
    let data = this.draw.svg();
    let filename = 'background.svg';
    let type = 'plain/text';
    var file = new Blob([data], { type: type });
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
  };

  const runAfterPause = (fun) => {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      fun();
    }, refreshTimeoutTime);
  };

  useEffect(
    () => {
      const d = SVG().addTo('#svg');
      const t = new Triangles(d, nTriangles, colors, edges, edgeCol);
      t.refresh();
      window.addEventListener('resize', () => runAfterPause(() => t.refresh()));
      setTriangles(t);

      return function cleanup() {
        d.clear();
        d.remove();
      };
    },
    // Only update when these change
    [nTriangles, colors, edges, edgeCol]
  );

  return (
    <>
      <div className="absolute -z-1" id="svg"></div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center max-w-xl">
          <div className="rounded p-5 bg-base-100 bg-opacity-75">
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
                defaultValue={defaultNTriangles ** 0.5}
                className="range"
                onChange={(event) => {
                  let n = parseInt(event.target.value) ** 2;
                  runAfterPause(() => setNTriangles(n));
                }}
              ></input>
            </div>

            <div className="pb-2">
              <div className="font-medium">Colors</div>
              <div className="flex flex-wrap justify-center">
                {colors.map((color, idx) => (
                  <div key={color}>
                    <Color
                      color={color}
                      onColorUpdate={(col) => {
                        colors[idx] = col;
                        setColors([...colors]);
                      }}
                    />
                    <span
                      className="btn btn-error btn-xs"
                      onClick={(event) => {
                        let colorsTmp = [...colors];
                        colorsTmp.splice(idx, 1);
                        setColors(colorsTmp);
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
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </span>

              <label
                htmlFor="my-modal"
                className="btn btn-secondary btn-xs m-3 modal-button"
              >
                <FontAwesomeIcon icon={faFileImport} />
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
                    <a
                      className="link"
                      href="https://coolors.co/"
                      target="_blank"
                    >
                      coolors
                    </a>{' '}
                    or{' '}
                    <a
                      className="link"
                      href="https://www.colourlovers.com/"
                      target="_blank"
                    >
                      Colour Lovers
                    </a>{' '}
                    .{' '}
                  </p>
                  <textarea
                    id="colorTextArea"
                    className="bg-slate-200 w-full"
                    placeholder="#B6211B,#E77833,#ECD817,#98E1F2"
                  ></textarea>
                  <p>Or try these:</p>
                  {colorUtils.examplePalettes.map((palette, idx) => (
                    <Palette
                      key={idx}
                      colors={palette}
                      clickHandler={() => {
                        let cols = colorUtils.getColsFromString(palette);
                        setColors(cols);
                      }}
                    ></Palette>
                  ))}
                  <div className="modal-action">
                    <label
                      htmlFor="my-modal"
                      className="btn"
                      onClick={() => {
                        const text =
                          document.getElementById('colorTextArea').value;

                        let newCols = colorUtils.getColsFromString(text);
                        if (newCols.length > 1) {
                          setColors(newCols);
                        }
                      }}
                    >
                      Done
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="form-control w-1/3">
                  <label className="label cursor-pointer">
                    <span className="label-text font-medium">Edges</span>
                    <input
                      type="checkbox"
                      className="toggle"
                      onChange={() => {
                        setEdges(!edges);
                      }}
                      value={edges}
                    ></input>
                  </label>
                </div>
                <div
                  className={`w-2/3 text-right ${
                    edges ? 'opacity-1' : 'opacity-0'
                  }`}
                >
                  <Color
                    color={edgeCol}
                    onColorUpdate={(col) => {
                      setEdgeCol(col);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  triangles.refresh();
                }}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              <button className="btn btn-secondary m-2" onClick={download}>
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
