import { useState, useRef, createElement } from 'react';

import { useDraw } from '../components/backgrounds/svg';
import { NavBar } from '../components/navbar';
import { TrianglesApp } from '../components/backgrounds/triangles';
import { LinesApp } from '../components/backgrounds/lines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons';
const apps = {
  triangles: TrianglesApp,
  lines: LinesApp,
};

export default function Backgrounds() {
  const [current, setCurrent] = useState('lines');
  const [uiHidden, setUiHidden] = useState(false);
  const refreshRef = useRef(null);
  const { draw, download } = useDraw();

  let app = apps[current];
  return (
    <>
      <div className="absolute -z-1" id="svg">
        {/* This is the actual background  */}
      </div>
      <NavBar />
      <div
        className="hero min-h-screen"
        onClick={() => {
          console.log('hit');
          // setUiHidden(~uiHidden);
        }}
      >
        <div
          className={`hero-content text-center max-w-xl ${
            uiHidden ? 'invisible' : 'visible'
          }`}
        >
          <div className="rounded p-5 bg-base-100 bg-opacity-75">
            <h1 className="text-3xl font-bold">Background Designer</h1>

            <div className="tabs justify-center py-2">
              {Object.keys(apps).map((name) => {
                return (
                  <div
                    key={name}
                    className={`tab tab-bordered ${
                      name === current ? 'tab-active' : ''
                    }`}
                    onClick={() => setCurrent(name)}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
            <div className="py-6 prose">
              <p>Resize the window to get the export size you want.</p>
              {/* <p>Click the background to hide the designer</p> */}
            </div>
            {createElement(app, { draw, refreshRef })}
            <div className="flex justify-center">
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  refreshRef.current();
                }}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={() => download()}
              >
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
