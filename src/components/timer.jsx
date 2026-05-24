import { useState, useRef } from "react";
import Display from "./Display";
function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);
  const startRef = useRef(0);
  const totalRef = useRef(0);
  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
  const start = () => {
    const r0 = started ? remaining : totalMs;
    totalRef.current = totalMs;
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const left = r0 - (Date.now() - startRef.current);
      if (left <= 0) {
        clearInterval(intervalRef.current);
        setRemaining(0);
        setRunning(false);
        return;
      }
      setRemaining(left);
    }, 33);
    setStarted(true);
    setRunning(true);
  };
  const reset = () => {
    clearInterval(intervalRef.current);
    setRemaining(0);
    setRunning(false);
    setStarted(false);
  };
  const pct = totalRef.current ? (remaining / totalRef.current) * 100 : 100;
  return (
    <div>
      {" "}
      {!started && (
        <div className="inputs">
          {" "}
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(+e.target.value)}
          />{" "}
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value)}
          />{" "}
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(+e.target.value)}
          />{" "}
        </div>
      )}{" "}
      <Display ms={started ? remaining : totalMs} />{" "}
      <div className="progress" style={{ width: pct + "%" }} />{" "}
      <button
        onClick={running ? pause : start}
        disabled={!started && totalMs === 0}
      >
        {" "}
        {running ? "Pause" : "Start"}{" "}
      </button>{" "}
      <button onClick={reset} disabled={!started}>
        Reset
      </button>{" "}
    </div>
  );
}
