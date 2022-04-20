import { Component } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Delaunator from 'delaunator';
import chroma from 'chroma-js';

const lightRainbow = [
  '#2175D8',
  '#DC5DCE',
  '#CC223D',
  '#F07414',
  '#FDEE61',
  '#74C425',
];

const darkRainbow = [
  '001219',
  '005f73',
  '0a9396',
  '94d2bd',
  'e9d8a6',
  'ee9b00',
  'ca6702',
  'bb3e03',
  'ae2012',
  '9b2226',
];

const retiPage = ['#03045E', '#11488e', '#032550'];

class Triangles {
  constructor(n, w, h, draw, border = 200, cols = darkRainbow) {
    this.n = n;
    this.w = w;
    this.h = h;
    this.draw = draw;
    this.border = border;
    this.cscale = chroma.scale(cols).mode('lch');
    this.setPoints();
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

    this.orig_points = points;
    this.points = points;
  }

  drawTriangles() {
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
}

function download(data, filename, type) {
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

class Background extends Component {
  mounted = false;
  componentDidMount() {
    if (this.mounted) {
      return;
    }
    const w = window.innerWidth,
      h = window.innerHeight;
    var draw = SVG().addTo('#svg').size(w, h);

    var triangles = new Triangles(400, w, h, draw);

    triangles.drawTriangles();

    this.mounted = true;

    let dld = () => download(draw.svg(), 'background.svg', 'plain/text');

    window.onmousedown = dld;
    // window.onmousemove = (x, y) => triangles.mouseMoved(event);
  }

  render() {
    return (
      <>
        <div id="svg"></div>
      </>
    );
  }
}

export default Background;
