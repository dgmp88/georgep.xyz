import { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { SVG } from '@svgdotjs/svg.js';
import * as colorUtils from '../../lib/colors';
import { Triangles } from '../../lib/triangles';

import { Color, Colors, NumberSlider } from './parts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons';

const defaultNTriangles = 500;
const defaultColors = colorUtils.darkRainbow;
let defaultEdgeCol = '#ee9b00'; // with some opacity
let edgesOn = false;

function Edges({ edges, setEdges, edgeCol, setEdgeCol }) {
  return (
    <>
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
          className={`w-2/3 text-right ${edges ? 'opacity-1' : 'opacity-0'}`}
        >
          <Color
            color={edgeCol}
            onColorUpdate={(col) => {
              setEdgeCol(col);
            }}
          />
        </div>
      </div>
    </>
  );
}

export function TrianglesApp() {
  const [nTriangles, setNTriangles] = useState(defaultNTriangles);
  const [edges, setEdges] = useState(edgesOn);
  const [edgeCol, setEdgeCol] = useState(defaultEdgeCol);
  const [draw, setDraw] = useState(undefined);
  const [colors, setColors] = useState([...defaultColors]);
  const [triangles, setTriangles] = useState(undefined);
  const refreshTimeoutTime = 200;
  let refreshTimeout;

  useEffect(
    () => {
      console.log('useEffect Triangles');
      // We have to create this in useEffect, as we can only open the SVG class when the page has rendered
      const d = SVG().addTo('#svg');
      setDraw(d);

      const t = new Triangles(d, nTriangles, colors, edges, edgeCol);
      window.addEventListener('resize', () => runAfterPause(() => t.refresh()));
      setTriangles(t);

      return function cleanup() {
        console.log('cleanUp triangles');
        d.clear();
        d.remove();
      };
    },
    // Only update when these change
    [nTriangles, colors, edges, edgeCol]
  );

  const download = () => {
    // this does some funky magic where it creates then deletes a url for easy downloading
    let data = draw.svg();
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

  return (
    <>
      <NumberSlider
        min={3}
        max={10000 ** 0.5}
        defaultNumber={defaultNTriangles ** 0.5}
        setNumber={(n) =>
          runAfterPause(() => {
            console.log('running', n ** 2);
            setNTriangles(n ** 2);
          })
        }
      ></NumberSlider>

      <div className="pb-2">
        <Colors colors={colors} setColors={setColors}></Colors>
        <Edges
          edges={edges}
          setEdges={setEdges}
          edgeCol={edgeCol}
          setEdgeCol={setEdgeCol}
        ></Edges>
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
    </>
  );
}
