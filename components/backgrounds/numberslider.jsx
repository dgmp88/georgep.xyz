import { useState } from 'react';

export function NumberSlider({ value, setNumber, min, max, pauseTime = 200 }) {
  const [timeoutTimer, setTimeoutTimer] = useState(undefined);

  const runAfterTimeout = (fun) => {
    clearTimeout(timeoutTimer);
    let t = setTimeout(() => {
      fun();
    }, pauseTime);
    setTimeoutTimer(t);
  };

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={value}
        className="range range-primary"
        onChange={(event) => {
          let n = parseInt(event.target.value);
          runAfterTimeout(() => setNumber(n));
        }}
      ></input>
    </>
  );
}
