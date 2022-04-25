import _ from 'lodash';

class Vector2 {
  constructor(x, y) {
    this.x = Math.round(x);
    this.y = Math.round(y);
  }

  negate() {
    return new Vector2(-this.x, -this.y);
  }
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
  console.log('begin');

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
  console.log(parts);
  return parts;
}

export { Vector2, randomSpace };
