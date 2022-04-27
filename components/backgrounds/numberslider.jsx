import { useState } from 'react';

export function NumberSlider({
  defaultNumber,
  setNumber,
  min,
  max,
  pauseTime = 200,
}) {
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
        defaultValue={defaultNumber}
        className="range"
        onChange={(event) => {
          let n = parseInt(event.target.value);
          runAfterTimeout(() => setNumber(n));
        }}
      ></input>
    </>
  );
}
