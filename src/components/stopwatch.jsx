import { useState, useRef } from "react";
import display from "./display.jsx";

function Stopwatch() {

    const [elapsed, setElapsed] = useState(0);
    const [running , setRunning] = useState(false);
    const intervatRef=  useRef(null);
    const startRef = useRef(null);

    const start = () => { 
        startRef.current = Date.now() - elapsed;
        intervatRef.current = setInterval(() => {
            setElapsed(Date.now() - startRef.current);
        }, 33);
        setRunning(true);
    }

    const pause = () => {
        clearInterval(intervatRef.current);
        setRunning(false);
    }

    const reset = () => {
        clearInterval(intervatRef.current);
        setElapsed(0);
        setRunning(false);
    }

    return (
        <div className="stopwatch">
            <display ms={elapsed} />
  }

export default Stopwatch;
