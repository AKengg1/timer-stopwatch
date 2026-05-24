import { useState, useRef, useEffect } from "react";
import Display from "./display";

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps]       = useState([]);

  const intervalRef = useRef(null);
  const startRef    = useRef(0);
  const lapStartRef = useRef(0);

  const start = () => {
    startRef.current = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 33);
    setRunning(true);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setElapsed(0);
    setRunning(false);
    setLaps([]);
    lapStartRef.current = 0;
  };

  const lap = () => {
    const delta = elapsed - lapStartRef.current;
    setLaps((prev) => [{ n: prev.length + 1, total: elapsed, delta }, ...prev]);
    lapStartRef.current = elapsed;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const statusCls   = running ? "running" : elapsed ? "paused" : "idle";
  const statusLabel = running ? "running" : elapsed ? "paused" : "idle";

  const deltas = laps.map((l) => l.delta);
  const best   = laps.length > 1 ? Math.min(...deltas) : null;
  const worst  = laps.length > 1 ? Math.max(...deltas) : null;

  return (
    <div className="card">
      <div className="status-row">
        <span className={`status-dot ${statusCls}`} />
        <span className="status-text">{statusLabel}</span>
      </div>

      <Display ms={elapsed} />

      <div className="controls">
        <button
          className="btn primary"
          onClick={running ? pause : start}
        >
          {running ? "Pause" : elapsed ? "Resume" : "Start"}
        </button>
        <button
          className="btn secondary"
          onClick={lap}
          disabled={!running}
        >
          Lap
        </button>
        <button
          className="btn danger"
          onClick={reset}
          disabled={!elapsed}
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-wrap">
          {laps.map((l) => (
            <div
              key={l.n}
              className={`lap-row${l.delta === best ? " lap-best" : l.delta === worst ? " lap-worst" : ""}`}
            >
              <span className="lap-num">#{l.n}</span>
              <span className="lap-delta">{formatMs(l.delta)}</span>
              <span className="lap-total">{formatMs(l.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatMs(ms) {
  const m  = Math.floor(ms / 60000);
  const s  = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

export default Stopwatch;