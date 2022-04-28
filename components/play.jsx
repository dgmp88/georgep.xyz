import { useRef, useEffect, useState } from 'react';

export function Play({ game }) {
  const [url, setUrl] = useState('');
  const iframeContainer = useRef();
  const width = 600;

  useEffect(() => {
    // Size container div properly
    let wH = screen.width / screen.height;
    iframeContainer.current.style.width = `${width}px`;
    let h = width / wH;
    h = Math.round(h);

    iframeContainer.current.style.height = `${h}px`;

    setUrl(`/${game}/index.html`);
  });

  const setupOnClick = () => {
    var iframe = document.getElementById('gameIframe');

    function openFullscreen() {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        iframe.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        iframe.msRequestFullscreen();
      }
    }

    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.onclick = openFullscreen;
    iframeDoc.ontouchstart = openFullscreen;
    document.onfullscreenerror = (error) => {
      console.log(error);
    };
  };

  return (
    <>
      <div ref={iframeContainer} className="m-auto">
        <iframe
          id="gameIframe"
          width="100%"
          height="100%"
          src={url}
          onLoad={setupOnClick}
        ></iframe>
      </div>
    </>
  );
}
