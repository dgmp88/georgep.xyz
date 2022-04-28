import { Lines } from '../../lib/backgrounds/lines';
import { useState, useEffect } from 'react';
import * as colorUtils from '../../lib/colors';
import { Colors } from './colors';
import { NumberSlider } from './numberslider';
import { Switch } from './switch';

import _ from 'lodash';

const defaultNLines = 5;
const defaultMaxHeight = 150;
const defaultNPoints = 4;
const defaultColors = colorUtils.darkRainbow;

export function LinesApp({ draw, refreshRef }) {
  const [nLines, setNLines] = useState(defaultNLines);
  const [nPoints, setNPoints] = useState(defaultNPoints);
  const [maxHeight, setMaxHeight] = useState(defaultMaxHeight);
  const [animate, setAnimate] = useState(false);
  const [colors, setColors] = useState([...defaultColors]);

  useEffect(
    () => {
      if (draw === null) {
        return;
      }
      const l = new Lines(draw, nLines, colors, nPoints, maxHeight, animate);
      window.addEventListener('resize', () => l.refresh());
      refreshRef.current = () => l.refresh();
      return function cleanup() {
        draw.clear();
      };
    },
    // Only update when these change
    [draw, nLines, maxHeight, animate, nPoints, colors]
  );

  return (
    <>
      <div>
        <div className="font-medium">Number of lines</div>
        <NumberSlider
          min={1}
          max={50}
          value={nLines}
          setNumber={(n) => setNLines(n)}
        ></NumberSlider>
      </div>

      <div>
        <div className="font-medium">Maximum Height</div>
        <NumberSlider
          min={0}
          max={2000}
          value={maxHeight}
          setNumber={(n) => setMaxHeight(n)}
        ></NumberSlider>
      </div>

      <div>
        <div className="font-medium">Number of Curves</div>
        <NumberSlider
          min={1}
          max={50}
          value={nPoints}
          setNumber={(n) => setNPoints(n)}
        ></NumberSlider>
      </div>

      <div>
        <div className="font-medium">Ripple*</div>
        <Switch value={animate} setValue={(x) => setAnimate(x)}></Switch>
        <p className="text-2xs">*Not yet downloadable</p>
      </div>

      <Colors colors={colors} setColors={setColors}></Colors>
    </>
  );
}
