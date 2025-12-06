import { useEffect, Component, createRef } from 'react';
import * as PIXI from 'pixi.js';
import chroma from 'chroma-js';

const cols = ['#2175D8', '#DC5DCE', '#CC223D', '#F07414', '#FDEE61', '#74C425'];
function getCircleCoords(x, y, r, deg) {
  let t = (deg / 360) * 2 * Math.PI;
  x = r * Math.cos(t) + x;
  y = r * Math.sin(t) + y;
  return { x, y };
}

class Pixi extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }

  initPixi() {
    let app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      view: this.canvasRef.current,
      backgroundColor: PIXI.utils.string2hex(cols[cols.length - 1]),
    });
    const { view, renderer } = app;

    let cscale = chroma.scale(cols).mode('lch');

    const w = window.innerWidth,
      h = window.innerHeight;

    let r = w * 0.5;
    let n = 50;

    let circles = {};
    let x = w / 2;
    let y = h / 2;
    let pow = 1.8;

    for (let idx = 0; idx < n; idx += 1) {
      const frac = 1 - idx / n;
      const size = r * frac;
      const gr = new PIXI.Graphics();
      gr.beginFill(PIXI.utils.string2hex(cscale(frac).hex()));
      gr.drawCircle(0, 0, size);
      gr.endFill();

      let texture = renderer.generateTexture(gr);
      let sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0.5);
      let offset = idx ** pow;
      let xy = getCircleCoords(x, y, 200, (idx / n) * 360 + offset);
      sprite.x = xy.x;
      sprite.y = xy.y;
      app.stage.addChild(sprite);

      circles[idx] = sprite;
    }

    // Add a ticker callback to move the sprite back and forth
    let elapsed = 0.0;
    app.ticker.add((delta) => {
      elapsed += delta;
      for (const [idx, circle] of Object.entries(circles)) {
        let offset = idx ** pow;
        let xy = getCircleCoords(
          x,
          y,
          200,
          (idx / n) * 360 + elapsed * 0.1 + offset
        );
        circle.x = xy.x;
        circle.y = xy.y;
        circle.x;
      }
    });
  }

  componentDidMount() {
    if (typeof window === 'object') {
      let type = 'WebGL';
      if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas';
      }
      this.initPixi();
    }
  }
  render() {
    return <canvas ref={this.canvasRef}></canvas>;
  }
}

export default Pixi;
