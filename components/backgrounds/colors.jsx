import { useState } from 'react';
import chroma from 'chroma-js';
import * as colorUtils from '../../lib/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPlus,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons';

function PasteModal({ setColors }) {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle"></input>
      <div className="modal">
        <div className="modal-box">
          <p className="py-4">
            Paste colors below. Try{' '}
            <a className="link" href="https://coolors.co/" target="_blank">
              coolors
            </a>{' '}
            or{' '}
            <a
              className="link"
              href="https://www.colourlovers.com/"
              target="_blank"
            >
              Colour Lovers
            </a>{' '}
            .{' '}
          </p>
          <textarea
            id="colorTextArea"
            className="bg-slate-200 w-full"
            placeholder="#B6211B,#E77833,#ECD817,#98E1F2"
          ></textarea>
          <p>Or try these:</p>
          {colorUtils.examplePalettes.map((palette, idx) => (
            <Palette
              key={idx}
              colors={palette}
              clickHandler={() => {
                let cols = colorUtils.getColsFromString(palette);
                setColors(cols);
              }}
            ></Palette>
          ))}
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => {
                const text = document.getElementById('colorTextArea').value;

                let newCols = colorUtils.getColsFromString(text);
                if (newCols.length > 1) {
                  setColors(newCols);
                }
              }}
            >
              Done
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

function Color(props) {
  const [color, setColor] = useState(props.color);
  return (
    <>
      <input
        type="color"
        className="input-sm w-10 p-0 m-2 border-none"
        value={color}
        onChange={(event) => {
          let c = event.target.value;
          setColor(c);
        }}
        onBlur={(event) => {
          props.onColorUpdate(color);
        }}
      ></input>
    </>
  );
}

function Colors({ colors, setColors }) {
  return (
    <>
      <div>
        <div className="font-medium">Colors</div>
        <div className="flex flex-wrap justify-center align-middle">
          {colors.map((color, idx) => (
            <div key={color} className="px-1">
              <Color
                color={color}
                onColorUpdate={(col) => {
                  colors[idx] = col;
                  setColors([...colors]);
                }}
              />
              <span
                className="inline-block align-top cursor-pointer 
              "
                onClick={() => {
                  let colorsTmp = [...colors];
                  colorsTmp.splice(idx, 1);
                  setColors(colorsTmp);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
        </div>
        <span
          className="btn btn-secondary btn-xs m-3"
          onClick={(event) => {
            let colorsTmp = [...colors];
            colorsTmp.push(chroma.random().hex());
            setColors(colorsTmp);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <label
          htmlFor="my-modal"
          className="btn btn-secondary btn-xs m-3 modal-button"
        >
          <FontAwesomeIcon icon={faFileImport} />
        </label>
        <PasteModal setColors={setColors}></PasteModal>
      </div>
    </>
  );
}

function Palette(props) {
  const colors = props.colors.split(',');
  return (
    <>
      <div
        className="flex flex-wrap justify-center bg-gray-100 m-2 rounded cursor-pointer"
        onClick={() => props.clickHandler(colors)}
      >
        {colors.map((color, idx) => (
          <div
            key={idx}
            className="m-2 w-4 h-4 rounded-xl"
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export { Color, Colors, Palette };
