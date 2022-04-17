import { useEffect, Component, createRef } from 'react';
import * as PIXI from 'pixi.js';
import chroma from 'chroma-js';

function initPixi() {
  console.log(this);
  let app = new PIXI.Application({
    resizeTo: window,
    antialias: true,

    backgroundColor: 0xffffff,
  });
  // document.body.appendChild(app.view);

  let cscale = chroma
    .scale(['#2175D8', '#DC5DCE', '#CC223D', '#F07414', '#FDEE61', '#74C425'])
    .mode('lch');

  const x = window.innerWidth,
    y = window.innerHeight;

  let r = x / 2;
  let n = 11;

  for (let i = 0; i < n; i += 1) {
    const frac = 1 - i / n;
    const size = r * frac;
    const gr = new PIXI.Graphics();
    gr.beginFill(PIXI.utils.string2hex(cscale(frac).hex()));
    gr.drawCircle(x / 2, y / 2, r * frac);
    gr.endFill();
    app.stage.addChild(gr);
  }

  // // Add a ticker callback to move the sprite back and forth
  // let elapsed = 0.0;
  // app.ticker.add((delta) => {
  //   elapsed += delta;
  //   sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  // });
}

class Pixi extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }
  componentDidMount() {
    if (typeof window === 'object') {
      let type = 'WebGL';
      if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas';
      }
      initPixi(this);
    }
  }
  render() {
    return <canvas id={this.canvasRef}></canvas>;
  }
}

export default Pixi;
