import { Lines } from '../../lib/lines';
import { useState, useEffect } from 'react';
import * as colorUtils from '../../lib/colors';
import { Colors } from './colors';
import { NumberSlider } from './numberslider';
import { SVG } from '@svgdotjs/svg.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons';
import { downloadSVG } from './svg';

import _ from 'lodash';

const defaultNLines = 5;
const defaultColors = colorUtils.darkRainbow;

export function LinesApp() {
  const [nLines, setNLines] = useState(10);
  const [colors, setColors] = useState([...defaultColors]);
  const [lines, setLines] = useState(10);

  useEffect(
    () => {
      // We have to create this in useEffect, as we can only open the SVG class when the page has rendered
      const d = SVG().addTo('#svg');
      const l = new Lines(d, nLines, colors);
      window.addEventListener('resize', () => l.refresh());
      setLines(l);

      return function cleanup() {
        d.clear();
        d.remove();
      };
    },
    // Only update when these change
    [nLines, colors]
  );

  return (
    <>
      <div>
        <div className="font-medium">Number of lines</div>
        <NumberSlider
          min={3}
          max={100}
          defaultNumber={defaultNLines}
          value={nLines}
          setNumber={(n) => setNLines(n)}
        ></NumberSlider>
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
