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

const redsBlues = ['#03045E', '#11488e', '#032550'];

const cols = redsBlues;

function edgesOfTriangle(t) {
  return [3 * t, 3 * t + 1, 3 * t + 2];
}

function pointsOfTriangle(delaunay, t) {
  return edgesOfTriangle(t).map((e) => delaunay.triangles[e]);
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

function getPoints(n, w, h, border = 200) {
  let points = [];

  let getRnd = (xy) => Math.round((xy + border * 2) * Math.random() - border);

  for (let i = 0; i < n; i++) {
    points.push([getRnd(w), getRnd(h)]);
  }

  return points;
}

class Background extends Component {
  mounted = false;
  componentDidMount() {
    if (this.mounted) {
      return;
    }
    const n = 400;
    const w = window.innerWidth,
      h = window.innerHeight;
    var draw = SVG().addTo('#svg').size(w, h);

    let cscale = chroma.scale(cols).mode('lch');

    var points = getPoints(n, w, h);

    const delaunay = Delaunator.from(points);

    for (let t = 0; t < delaunay.triangles.length / 3; t++) {
      const tpoints = pointsOfTriangle(delaunay, t).map((p) => points[p]);
      let [[x1, y1], [x2, y2], [x3, y3]] = tpoints;
      let avgX = (x1 + x2 + x3) / 3;
      let avgY = (y1 + y2 + y3) / 3;

      const col = cscale((avgX / w + avgY / h) / 2);
      draw
        .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
        .fill(col.hex())
        .stroke({ width: 1, color: col.hex() });
    }

    draw.svg();

    this.mounted = true;

    let dld = () => download(draw.svg(), 'background.svg', 'plain/text');

    window.onclick = dld;
  }

  render() {
    console.log('render');
    return (
      <>
        <div id="svg"></div>
      </>
    );
  }
}

export default Background;
