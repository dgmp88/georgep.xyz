import { useState, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';

export function useDraw() {
  const [draw, setDraw] = useState(null);

  const download = () => {
    // Funky way of making a download
    let filename = 'background.svg';
    let data = draw.svg();

    var element = window.document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';

    // Google tag manager breaks everything if you don't do this
    element.setAttribute('target', '_blank');
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  useEffect(() => {
    // We have to create this in useEffect, as we can only open the SVG class when the page has rendered
    const d = SVG().addTo('#svg');
    setDraw(d);

    return function cleanup() {
      d.clear();
      d.remove();
    };
  }, []);

  return { draw, download };
}
