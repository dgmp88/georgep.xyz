import { useState } from 'react';

import { TrianglesApp } from '../components/backgrounds/triangles';
import { LinesApp } from '../components/backgrounds/lines';

const apps = {
  triangles: <TrianglesApp></TrianglesApp>,
  lines: <LinesApp></LinesApp>,
};

export default function Backgrounds() {
  const [current, setCurrent] = useState('lines');
  let app = apps[current];
  return (
    <>
      <div className="absolute -z-1" id="svg">
        {/* This is the actual background  */}
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center max-w-xl">
          <div className="rounded p-5 bg-base-100 bg-opacity-75">
            <h1 className="text-3xl font-bold">Background Designer</h1>
            <p className="py-6">
              Resize the window to get the export size you want
            </p>
            <div className="tabs justify-center">
              {Object.keys(apps).map((name) => {
                return (
                  <div
                    className={`tab tab-lifted ${
                      name === current ? 'tab-active' : ''
                    }`}
                    onClick={() => setCurrent(name)}
                  >
                    {name}
                  </div>
                );
              })}
            </div>

            {/* <TrianglesApp></TrianglesApp> */}
            {/* <LinesApp></LinesApp> */}
            {app}
          </div>
        </div>
      </div>
    </>
  );
}
