import Delaunator from 'delaunator';
import { Vector2 } from '../math';

export class Delaunay {
  constructor(points) {
    this.points = points;
    this.delaunay = Delaunator.from(points.map((v) => [v.x, v.y]));
  }

  nTriangleEdges() {
    return this.delaunay.triangles.length;
  }

  circumcenter(a, b, c) {
    const ad = a.x * a.x + a.y * a.y;
    const bd = b.x * b.x + b.y * b.y;
    const cd = c.x * c.x + c.y * c.y;
    const D = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    return new Vector2(
      (1 / D) * (ad * (b.y - c.y) + bd * (c.y - a.y) + cd * (a.y - b.y)),
      (1 / D) * (ad * (c.x - b.x) + bd * (a.x - c.x) + cd * (b.x - a.x))
    );
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

  triangleCenter(t) {
    const vertices = this.pointsOfTriangle(t).map((p) => this.points[p]);
    return this.circumcenter(vertices[0], vertices[1], vertices[2]);
  }

  pointsOfTriangle(t) {
    return this.edgesOfTriangle(t).map((e) => this.delaunay.triangles[e]);
  }

  forEachVoronoiEdge(callback) {
    for (let e = 0; e < this.delaunay.triangles.length; e++) {
      if (e < this.delaunay.halfedges[e]) {
        const p = this.triangleCenter(this.triangleOfEdge(e));
        const q = this.triangleCenter(
          this.triangleOfEdge(this.delaunay.halfedges[e])
        );
        callback(e, p, q);
      }
    }
  }

  nextHalfedge(e) {
    return e % 3 === 2 ? e - 2 : e + 1;
  }

  edgesAroundPoint(start) {
    const result = [];
    let incoming = start;
    do {
      result.push(incoming);
      const outgoing = this.nextHalfedge(incoming);
      incoming = this.delaunay.halfedges[outgoing];
    } while (incoming !== -1 && incoming !== start);
    return result;
  }

  forEachVoronoiCell(callback) {
    const seen = new Set(); // of point ids
    for (let e = 0; e < this.delaunay.triangles.length; e++) {
      const p = this.delaunay.triangles[this.nextHalfedge(e)];
      if (!seen.has(p)) {
        seen.add(p);
        const edges = this.edgesAroundPoint(e);
        const triangles = edges.map(this.triangleOfEdge);
        const vertices = triangles.map((t) => this.triangleCenter(t));
        callback(p, vertices);
      }
    }
  }
}
