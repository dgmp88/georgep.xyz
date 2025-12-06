import { useState, useEffect } from 'react';
import { Colors, Color } from './colors';
import chroma from 'chroma-js';
import { NumberSlider } from './numberslider';
import { Vector2, avgXY } from '../../lib/math';

import { Delaunay } from '../../lib/backgrounds/delaunay';

import _ from 'lodash';

const defaultColors = ['#012a4a', '#2a6f97'];

const defaultBGCol = '#2a6f97';
const defaultN = 5000;
const defaultX = 0.9;
const defaultY = 0.5;
const defaultRadius = 0.5;
const defaultSparcity = 0.8;
const defaultOpacity = 0.5;

class Polygons {
  debug = true;
  constructor(draw, colors, bgCol, n, x, y, radius, sparcity, opacity) {
    console.log(n);
    this.n = n;
    this.sparcity = sparcity;
    this.draw = draw;
    this.colors = colors;
    this.bgCol = bgCol;
    this.opacity = opacity;
    this.cscale = chroma.scale(colors).mode('lch');
    this.centerFrac = new Vector2(x, y);
    this.radius = radius;
    this.refresh();
  }

  setSize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.draw.size(this.w, this.h);
    this.center = new Vector2(
      this.centerFrac.x * this.w,
      this.centerFrac.y * this.h
    );
    this.maxDist = new Vector2(0, 0).distance(new Vector2(this.w, this.h));
    this.maxDist *= this.radius;
  }

  setPoints() {
    let points = [];

    for (let i = 0; i < this.n; i++) {
      let mult = Math.random();
      mult = 1 - mult;
      // console.log(mult);
      let l = mult * this.maxDist;
      let r = Math.random() * 360;
      let p = this.center.moveCircle(l, r);
      points.push(p);
    }

    this.points = points;
  }

  drawShapes() {
    // Fill the background with color
    this.draw.rect(this.w, this.h).fill(chroma(this.bgCol).hex());
    let delaunay = new Delaunay(this.points);

    delaunay.forEachVoronoiCell((p, vertices) => {
      if ((vertices.length > 2) & (Math.random() > this.sparcity)) {
        for (let v of vertices) {
          if (v.distance(this.center) > this.maxDist) {
            return;
          }
          // this.draw.circle(5).move(v.x, v.y).fill('red');
        }
        let avg = avgXY(vertices);
        // const colFrac = (avg.x / this.w + avg.y / this.h) / 2;
        const colFrac = avg.distance(this.center) / this.maxDist;
        const col = this.cscale(colFrac).alpha(this.opacity);
        const hex = col.hex();
        let str = vertices.map((v) => {
          return v.x + ',' + v.y;
        });
        this.draw.polygon(str).fill(hex).stroke({ width: 0, color: hex });
      }
    });
    // for (let p of this.points) {
    //   this.draw.circle(5).move(p.x, p.y).fill('black');
    // }

    // points.push(point);
  }

  refresh() {
    this.draw.clear();
    this.setSize();
    this.setPoints();
    this.drawShapes();
  }
}

export function PolygonsApp({ draw, refreshRef }) {
  const [colors, setColors] = useState([...defaultColors]);
  const [bgCol, setBGCol] = useState(defaultBGCol);
  const [n, setN] = useState(defaultN);
  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);
  const [radius, setRadius] = useState(defaultRadius);
  const [sparcity, setSparcity] = useState(defaultSparcity);
  const [opacity, setOpacity] = useState(defaultOpacity);

  useEffect(
    () => {
      if (draw === null) {
        return;
      }
      const e = new Polygons(
        draw,
        colors,
        bgCol,
        n,
        x,
        y,
        radius,
        sparcity,
        opacity
      );
      window.addEventListener('resize', () => e.refresh());
      refreshRef.current = () => e.refresh();
      return function cleanup() {
        draw.clear();
      };
    },
    // Only update when these change
    [draw, colors, bgCol, n, x, y, radius, sparcity, opacity]
  );

  return (
    <>
      <div>
        <div className="font-medium">Count</div>
        <NumberSlider
          min={100}
          max={10000}
          value={n}
          setNumber={(n) => setN(n)}
        ></NumberSlider>
      </div>
      <div className="flex py-3">
        <div className="font-medium px-2">X</div>
        <NumberSlider
          min={0}
          max={1}
          step={0.001}
          value={x}
          setNumber={(x) => {
            setX(x);
          }}
        ></NumberSlider>
        <div className="font-medium px-2">Y</div>
        <NumberSlider
          min={0}
          max={1}
          step={0.001}
          value={y}
          setNumber={(y) => setY(y)}
        ></NumberSlider>
      </div>
      <div>
        <div className="font-medium">Sparsity</div>
        <NumberSlider
          min={0.01}
          max={1}
          step={0.001}
          value={sparcity}
          setNumber={(sparcity) => setSparcity(sparcity)}
        ></NumberSlider>
      </div>
      <div>
        <div className="font-medium">Radius</div>
        <NumberSlider
          min={0.01}
          max={3}
          step={0.001}
          value={radius}
          setNumber={(radius) => setRadius(radius)}
        ></NumberSlider>
      </div>

      <Colors colors={colors} setColors={setColors}></Colors>
      <div>
        <div className="font-medium">Opacity</div>
        <NumberSlider
          min={0}
          max={1}
          step={0.001}
          value={opacity}
          setNumber={(o) => setOpacity(o)}
        ></NumberSlider>
      </div>
      <div>
        <div className="font-medium">Background</div>
        <Color
          color={bgCol}
          onColorUpdate={(col) => {
            setBGCol(col);
          }}
        ></Color>
      </div>
    </>
  );
}
