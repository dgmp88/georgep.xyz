export function Switch({ value, setValue }) {
  console.log(value);
  return (
    <input
      type="checkbox"
      className="toggle"
      onChange={() => {
        setValue(!value);
      }}
      value={value}
      checked={value}
    ></input>
  );
}
