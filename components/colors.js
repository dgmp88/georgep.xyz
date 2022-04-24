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

export {
  lightRainbow,
  darkRainbow,
  reti,
  getContrastingBlackOrWhite,
  getColsFromString,
  examplePalettes,
};
