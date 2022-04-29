import Delaunator from 'delaunator';

export class Delaunay {
  constructor(points) {
    this.points = points;
    this.delaunay = Delaunator.from(points.map((v) => [v.x, v.y]));
  }

  nTriangleEdges() {
    return this.delaunay.triangles.length;
  }

  circumcenter(a, b, c) {
    const ad = a[0] * a[0] + a[1] * a[1];
    const bd = b[0] * b[0] + b[1] * b[1];
    const cd = c[0] * c[0] + c[1] * c[1];
    const D =
      2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    return [
      (1 / D) * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1])),
      (1 / D) * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0])),
    ];
  }

  triangleOfEdge(e) {
    return Math.floor(e / 3);
  }

  edgesOfTriangle(t) {
    return [3 * t, 3 * t + 1, 3 * t + 2];
  }

  forEachTriangle(callback) {
    for (let t = 0; t < this.delaunay.triangles.length / 3; t++) {
      callback(
        t,
        this.pointsOfTriangle(t).map((p) => this.points[p])
      );
    }
  }

  trianglesAdjacentToTriangle(t) {
    const adjacentTriangles = [];
    for (const e of this.edgesOfTriangle(t)) {
      const opposite = this.delaunay.halfedges[e];
      if (opposite >= 0) {
        adjacentTriangles.push(this.triangleOfEdge(opposite));
      }
    }
    return adjacentTriangles;
  }

  triangleCenter(points, t) {
    const vertices = this.pointsOfTriangle(t).map((p) => points[p]);
    return this.circumcenter(vertices[0], vertices[1], vertices[2]);
  }

  pointsOfTriangle(t) {
    return this.edgesOfTriangle(t).map((e) => this.delaunay.triangles[e]);
  }

  forEachVoronoiEdge(points, delaunay, callback) {
    for (let e = 0; e < delaunay.triangles.length; e++) {
      if (e < delaunay.halfedges[e]) {
        const p = this.triangleCenter(points, delaunay, triangleOfEdge(e));
        const q = this.triangleCenter(
          points,
          delaunay,
          this.triangleOfEdge(delaunay.halfedges[e])
        );
        callback(e, p, q);
      }
    }
  }
}
