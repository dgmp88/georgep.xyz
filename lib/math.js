import _ from 'lodash';

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  add(v) {
    let r = this.copy();
    r.x += v.x;
    r.y += v.y;
    return r;
  }

  sub(v) {
    let r = this.copy();
    r.x -= v.x;
    r.y -= v.y;
    return r;
  }

  negate() {
    return new Vector2(-this.x, -this.y);
  }

  moveCircle(dist, deg) {
    let r = degreesToRadians(deg);
    let o = new Vector2(dist * Math.sin(r), dist * Math.cos(r));
    let c = this.copy();
    return c.add(o);
  }

  distance(v) {
    let d = this.sub(v);
    return Math.sqrt(d.x ** 2 + d.y ** 2);
  }
}

function avgXY(vectors) {
  let result = new Vector2(0, 0);
  for (let v of vectors) {
    result = result.add(v);
  }
  result.x /= vectors.length;
  result.y /= vectors.length;
  return result;
}

function cumsum(arr) {
  let arr_ = [];
  let tot = 0;
  for (let item of arr) {
    tot += item;
    arr_.push(tot);
  }
  return arr_;
}

function randomSpace(n, tot, min) {
  // Randomly space n across tot with min spacing
  // What's left to play with
  let play = tot - n * min;

  // Randomly divide up into N parts
  let parts = [];
  for (let i = 0; i < n; i += 1) {
    parts.push(Math.random());
  }
  // Make it add up to 1
  parts = _.sortBy(parts);
  let pTot = _.sum(parts);
  parts = parts.map((p) => (p / pTot) * play + min);
  parts = cumsum(parts);
  return parts;
}

function randomSign() {
  if (Math.random() > 0.5) {
    return 1;
  } else {
    return -1;
  }
}

function radiansToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function randomNormal() {
  //https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  return num;
}

export { Vector2, randomSpace, randomSign, avgXY, randomNormal };
