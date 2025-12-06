import chroma from 'chroma-js';
import { Delaunay } from './delaunay';
import { Vector2 } from '../math';

export class Triangles {
  refreshPause = 150;
  refreshTimeout;
  constructor(draw, n, colors, edgesOn, edgeCol, border = 200) {
    this.draw = draw;
    this.n = n;
    this.colors = colors;
    this.edgesOn = edgesOn;
    this.edgeCol = edgeCol;
    this.border = border;
    this.refresh();
  }

  refresh() {
    this.setSize();
    this.draw.clear();
    this.drawTriangles();
  }

  setSize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.draw.size(this.w, this.h);
  }

  setPoints() {
    let points = [];

    let getRnd = (xy) =>
      Math.round((xy + this.border * 2) * Math.random() - this.border);

    for (let i = 0; i < this.n; i++) {
      points.push(new Vector2(getRnd(this.w), getRnd(this.h)));
    }

    this.points = points;
  }

  drawTriangles() {
    this.cscale = chroma.scale(this.colors);
    this.setPoints();
    let delaunay = new Delaunay(this.points);

    delaunay.forEachTriangle((triangle, tpoints) => {
      let [p1, p2, p3] = tpoints;
      let avgX = (p1.x + p2.x + p3.x) / 3;
      let avgY = (p1.y + p2.y + p3.y) / 3;
      const colFrac = (avgX / this.w + avgY / this.h) / 2;
      const col = this.cscale(colFrac);
      const hex = col.hex();
      this.draw
        .polygon(`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`)
        .fill(hex)
        .stroke({ width: 1, color: this.edgesOn ? this.edgeCol : hex });
    });
  }
}
