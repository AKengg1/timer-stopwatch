import { useState, useRef, useEffect } from "react";
import Display from "./display";

function Timer() {
  const [hours, setHours]       = useState(0);
  const [minutes, setMinutes]   = useState(0);
  const [seconds, setSeconds]   = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning]   = useState(false);
  const [started, setStarted]   = useState(false);

  const intervalRef = useRef(null);
  const startRef    = useRef(0);
  const totalRef    = useRef(0);

  const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;

  const start = () => {
    const r = started ? remaining : totalMs;
    totalRef.current  = totalMs;
    startRef.current  = Date.now();
    intervalRef.current = setInterval(() => {
      const left = r - (Date.now() - startRef.current);
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

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRemaining(0);
    setRunning(false);
    setStarted(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const pct = totalRef.current ? (remaining / totalRef.current) * 100 : 100;

  const statusCls = running ? "running" : started ? "paused" : "idle";
  const statusLabel = running ? "running" : started ? "paused" : "set time";

  return (
    <div className="card">
      <div className="status-row">
        <span className={`status-dot ${statusCls}`} />
        <span className="status-text">{statusLabel}</span>
      </div>

      {!started && (
        <div className="input-row">
          <div className="input-group">
            <label>Hours</label>
            <input
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => setHours(Math.min(99, Math.max(0, +e.target.value)))}
            />
          </div>
          <div className="input-group">
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(59, Math.max(0, +e.target.value)))}
            />
          </div>
          <div className="input-group">
            <label>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(59, Math.max(0, +e.target.value)))}
            />
          </div>
        </div>
      )}

      <Display ms={started ? remaining : totalMs} />

      {started && (
        <div className="progress-bar-wrap">
          <div
            className={`progress-bar${pct < 10 ? " danger" : pct < 25 ? " warn" : ""}`}
            style={{ width: pct + "%" }}
          />
        </div>
      )}

      {remaining === 0 && started && !running && (
        <div className="done-badge">Time's up</div>
      )}

      <div className="controls">
        <button
          className="btn primary"
          onClick={running ? pause : start}
          disabled={!started && totalMs === 0}
        >
          {running ? "Pause" : started ? "Resume" : "Start"}
        </button>
        <button
          className="btn danger"
          onClick={reset}
          disabled={!started}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;