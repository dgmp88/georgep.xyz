import { Lines } from '../../lib/lines';
import { useState, useEffect } from 'react';
import * as colorUtils from '../../lib/colors';
import { Colors } from './colors';
import { NumberSlider } from './numberslider';
import { Switch } from './switch';
import { SVG } from '@svgdotjs/svg.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons';
import { downloadSVG } from './svg';

import _ from 'lodash';

const defaultNLines = 5;
const defaultMaxHeight = 150;
const defaultNPoints = 4;
const defaultColors = colorUtils.darkRainbow;

export function LinesApp() {
  const [nLines, setNLines] = useState(defaultNLines);
  const [nPoints, setNPoints] = useState(defaultNPoints);
  const [maxHeight, setMaxHeight] = useState(defaultMaxHeight);
  const [animate, setAnimate] = useState(false);
  // const [nLines, setNLines] = useState(10);
  const [colors, setColors] = useState([...defaultColors]);
  const [lines, setLines] = useState(undefined);

  useEffect(
    () => {
      // We have to create this in useEffect, as we can only open the SVG class when the page has rendered
      const d = SVG().addTo('#svg');
      const l = new Lines(d, nLines, colors, nPoints, maxHeight, animate);
      window.addEventListener('resize', () => l.refresh());
      setLines(l);

      return function cleanup() {
        d.clear();
        d.remove();
      };
    },
    // Only update when these change
    [nLines, maxHeight, animate, nPoints, colors]
  );

  return (
    <>
      <div>
        <div className="font-medium">Number of lines</div>
        <NumberSlider
          min={3}
          max={100}
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
          max={300}
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
      <div className="flex justify-center">
        <button
          className="btn btn-primary m-2"
          onClick={() => {
            lines.refresh();
          }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        <button
          className="btn btn-secondary m-2"
          onClick={() => downloadSVG(lines.draw)}
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
    </>
  );
}
