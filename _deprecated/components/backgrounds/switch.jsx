export function Switch({ value, setValue }) {
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
