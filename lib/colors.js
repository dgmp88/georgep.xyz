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
  '#001219',
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#ae2012',
  '#9b2226',
];

const reti = ['#03045E', '#11488e', '#032550'];

const examplePalettes = [
  '#B6211B, #E77833, #ECD817, #98E1F2',
  '#03071e, #370617, #6a040f, #9d0208, #d00000, #dc2f02, #e85d04, #f48c06, #faa307, #ffba08',
  '#d9ed92, #b5e48c, #99d98c, #76c893, #52b69a, #34a0a4, #168aad, #1a759f, #1e6091, #184e77',
  '#5f0f40, #9a031e, #fb8b24, #e36414, #0f4c5c',
  '#ffffff, #000000',
];

const WHITE = chroma('white');
const BLACK = chroma('black');
const GRAY = chroma('gray');

function getContrastingBlackOrWhite(col) {
  if (!chroma.valid(col)) {
    return GRAY;
  }
  col = chroma(col);
  let b = chroma.contrast(col, BLACK);
  let w = chroma.contrast(col, WHITE);

  if (w > b) {
    return WHITE;
  } else {
    return BLACK;
  }
}

function getColsFromString(string) {
  let cols = [...string.matchAll(/([0-9a-fA-F]{3}){1,2}/g)];

  cols = cols.map((item) => '#' + item[0]);
  return cols;
}

const colors = {
  // https://www.colourlovers.com/palette/848743/(_%E2%80%9D_)

  sugar: '#490A3D,#BD1550,#E97F02,#F8CA00,#8A9B0F,#490A3D,#BD1550,#E97F02',

  //https://www.colourlovers.com/palette/1534867/Magic_Forest
  magic_forest:
    '#014152,#0C7871,#219C85,#48A882,#76B07A,#014152,#0C7871,#219C85',

  //https://www.colourlovers.com/palette/1239681/Galaxy_glow
  galaxy: '#4CA5A9,#46727F,#414A6D,#383158,#1C1925,#4CA5A9,#46727F,#414A6D',

  // https://www.colourlovers.com/palette/2937476/Galaxies_in_a_Jar
  galaxy2: '#20345B,#C4365B,#E66E6C,#E9B08C,#F1E4A8,#20345B,#C4365B,#E66E6C',

  // https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
  coolors1: [
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
  ],

  // https://coolors.co/palette/d9ed92-b5e48c-99d98c-76c893-52b69a-34a0a4-168aad-1a759f-1e6091-184e77
  coolors2: [
    '99d98c',
    '76c893',
    '52b69a',
    '34a0a4',
    '168aad',
    '1a759f',
    '1e6091',
    '184e77',
  ],

  // https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
  coolorsROYGBIV: [
    'f94144',
    'f3722c',
    'f8961e',
    'f9c74f',
    '90be6d',
    '43aa8b',
    '577590',
  ],
};
function hexToRGBA(hex, alpha) {
  if (typeof hex !== 'string') {
    return;
  }
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

function hexToParts(hex) {
  var col = {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };

  return col;
}

function lerpColors(c1, c2, amount) {
  c1 = hexToParts(c1);
  c2 = hexToParts(c2);

  let r = c1.r - (c1.r - c2.r) * amount;
  let g = c1.g - (c1.g - c2.g) * amount;
  let b = c1.b - (c1.b - c2.b) * amount;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `rgb(${r},${g},${b})`;
}

function lerpNSteps(c1, c2, n) {
  let cols = [];
  for (let i = 0; i < n; i++) {
    let frac = i / (n - 1);
    cols.push(lerpColors(c1, c2, frac));
  }
  return cols;
}

function lerpPalette(palette, amount) {
  const n = palette.length;
  if (amount === 1) {
    // As we don't have a next color, lazy hack
    amount -= 0.00001;
  }
  const c1Idx = Math.floor(amount * (n - 1));
  const c2Idx = c1Idx + 1;
  const c1 = palette[c1Idx];
  const c2 = palette[c2Idx];
  const gaps = 1 / (n - 1);
  const cAmount = (amount % gaps) / gaps;

  return lerpColors(c1, c2, cAmount);
}

for (const [key, value] of Object.entries(colors)) {
  if (typeof value === 'string') {
    // colorlovers
    colors[key] = value.split(',');
  } else if (typeof value === 'object') {
    // coolors
    colors[key] = value.map((x) => '#' + x);
  }
}

export {
  colors,
  hexToRGBA,
  lerpColors,
  lerpNSteps,
  lerpPalette,
  lightRainbow,
  darkRainbow,
  reti,
  getContrastingBlackOrWhite,
  getColsFromString,
  examplePalettes,
};
