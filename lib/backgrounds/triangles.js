import Delaunator from 'delaunator';
import chroma from 'chroma-js';

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
    console.log('refresh');
    this.setSize();
    this.draw.clear();
    this.drawTriangles();
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
    this.cscale = chroma.scale(this.colors);
    this.setPoints();
    this.delaunay = Delaunator.from(this.points);
    for (let t = 0; t < this.delaunay.triangles.length / 3; t++) {
      const tpoints = this.pointsOfTriangle(t).map((p) => this.points[p]);
      let [[x1, y1], [x2, y2], [x3, y3]] = tpoints;
      let avgX = (x1 + x2 + x3) / 3;
      let avgY = (y1 + y2 + y3) / 3;
      const colFrac = (avgX / this.w + avgY / this.h) / 2;
      const col = this.cscale(colFrac);
      const hex = col.hex();
      this.draw
        .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
        .fill(hex)
        .stroke({ width: 1, color: this.edgesOn ? this.edgeCol : hex });
    }
  }
}
