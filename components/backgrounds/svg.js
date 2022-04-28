import { useState, useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';

export function useDraw() {
  const [draw, setDraw] = useState(null);

  const download = () => {
    // this does some funky magic where it creates then deletes a url for easy downloading
    let data = draw.svg();
    let filename = 'background.svg';
    let type = 'plain/text';
    var file = new Blob([data], { type: type });
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
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
