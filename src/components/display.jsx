function Display({ ms }) {
  const hour = Math.floor(ms / 3600000);
  const minute = Math.floor((ms % 3600000) / 60000);
  const second = Math.floor((ms % 60000) / 1000);
  const centi = Math.floor((ms % 1000) / 10);

  const pad = (num) => String(num).padStart(2, "0");

  return (
    <div className="display">
      {hour > 0 && <span>{pad(hour)}:</span>}
      {
        <span>
          {pad(minute)}:{pad(second)}
        </span>
      }
      <span className="centiseconds">.{pad(centi)}</span>
    </div>
  );
}

export default Display;
