import { useState } from 'react';

export function NumberSlider({
  value,
  setNumber,
  min,
  max,
  pauseTime = 200,
  step = 1,
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
        step={step}
        defaultValue={value}
        className="range range-primary "
        onChange={(event) => {
          let n = parseFloat(event.target.value);
          runAfterTimeout(() => setNumber(n));
        }}
      ></input>
    </>
  );
}
