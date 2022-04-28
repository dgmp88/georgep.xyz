import { useState, useEffect } from 'react';
import * as colorUtils from '../../lib/colors';
import { Triangles } from '../../lib/backgrounds/triangles';

import { Color, Colors } from './colors';
import { NumberSlider } from './numberslider';
import { Switch } from './switch';

const defaultNTriangles = 500;
const defaultColors = colorUtils.darkRainbow;
let defaultEdgeCol = '#ee9b00'; // with some opacity
let edgesOn = false;

export function TrianglesApp({ draw, refreshRef }) {
  const [nTriangles, setNTriangles] = useState(defaultNTriangles);
  const [edges, setEdges] = useState(edgesOn);
  const [edgeCol, setEdgeCol] = useState(defaultEdgeCol);
  const [colors, setColors] = useState([...defaultColors]);
  useEffect(
    () => {
      if (draw === undefined) {
        return;
      }
      const t = new Triangles(draw, nTriangles, colors, edges, edgeCol);
      window.addEventListener('resize', () => t.refresh());
      refreshRef.current = () => t.refresh();

      return function cleanup() {
        draw.clear();
      };
    },
    // Only update when these change
    [nTriangles, colors, edges, edgeCol]
  );

  return (
    <>
      <div>
        <div className="font-medium">Number of triangles</div>
        <NumberSlider
          min={3}
          max={10000 ** 0.5}
          defaultNumber={defaultNTriangles ** 0.5}
          setNumber={(n) => {
            setNTriangles(n ** 2);
          }}
        ></NumberSlider>
      </div>

      <Colors colors={colors} setColors={setColors}></Colors>
      <Edges
        edges={edges}
        setEdges={setEdges}
        edgeCol={edgeCol}
        setEdgeCol={setEdgeCol}
      ></Edges>
    </>
  );
}

function Edges({ edges, setEdges, edgeCol, setEdgeCol }) {
  return (
    <>
      <div className="flex">
        <div className="form-control w-1/3">
          <label className="label cursor-pointer">
            <span className="label-text font-medium">Edges</span>
            <Switch value={edges} setValue={(x) => setEdges(x)}></Switch>
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
