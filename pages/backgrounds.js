import { Component } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import Delaunator from 'delaunator';
import chroma from 'chroma-js';

const cols = ['#2175D8', '#DC5DCE', '#CC223D', '#F07414', '#FDEE61', '#74C425'];
function edgesOfTriangle(t) {
  return [3 * t, 3 * t + 1, 3 * t + 2];
}

function pointsOfTriangle(delaunay, t) {
  return edgesOfTriangle(t).map((e) => delaunay.triangles[e]);
}

function getPoints(n, w, h, border = 100) {
  let points = [];

  let getRnd = (xy) => (xy + border * 2) * Math.random() - border;

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
    const n = 2000;
    const w = window.innerWidth,
      h = window.innerHeight;
    var draw = SVG().addTo('#svg').size(w, h);

    let cscale = chroma.scale(cols).mode('lch');

    var points = getPoints(n, w, h);

    const delaunay = Delaunator.from(points);

    for (let t = 0; t < delaunay.triangles.length / 3; t++) {
      const col = cscale(t / (delaunay.triangles.length / 3));
      const tpoints = pointsOfTriangle(delaunay, t).map((p) => points[p]);
      let [[x1, y1], [x2, y2], [x3, y3]] = tpoints;
      draw
        .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
        .fill(col.hex())
        .stroke({ width: 1, color: col.hex() });
    }

    return;
    // var delaunay = new Delaunator(points);
    // console.log(delaunay.triangles);

    // for (let i = 0; i < n; i += 3) {
    //   let [x1, y1, x2, y2, x3, y3] = delaunay.triangles.slice(i, i + 6);
    //   console.log(x1, y1);

    //   var polygon = draw
    //     .polygon(`${x1},${y1} ${x2},${y2} ${x3},${y3}`)
    //     .fill('#f06');
    // }

    // for (let point of points) {
    //   draw.circle(5).fill('#f06').move(point.x, point.y);
    // }

    this.mounted = true;
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
