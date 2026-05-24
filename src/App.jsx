import { useState } from "react";
import Stopwatch from "./components/stopwatch";
import Timer from "./components/timer";
import "./App.css";

function App() {
  const [tab, setTab] = useState("stopwatch");

  return (
    <div className="app">
      <div className="tabs">
        <button
          className={`tab${tab === "stopwatch" ? " active" : ""}`}
          onClick={() => setTab("stopwatch")}
        >
          Stopwatch
        </button>
        <button
          className={`tab${tab === "timer" ? " active" : ""}`}
          onClick={() => setTab("timer")}
        >
          Timer
        </button>
      </div>

      {tab === "stopwatch" ? <Stopwatch /> : <Timer />}
    </div>
  );
}

export default App;