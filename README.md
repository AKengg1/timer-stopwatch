# Stopwatch & Timer

A clean, dark-themed time utility built with React.

## Features

- **Stopwatch** — start, pause, resume, reset, and lap tracking with best/worst split highlighting
- **Timer** — custom hour/minute/second input with a live progress bar that shifts amber → red as time runs low
- Smooth centisecond display
- Interval cleanup on unmount — no memory leaks
- Fully responsive

## Stack

- React (Vite)
- CSS custom properties — no UI library
- Syne + Syne Mono (Google Fonts)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Stopwatch.jsx
│   ├── Timer.jsx
│   └── Display.jsx
├── App.jsx
├── App.css
└── main.jsx
```

## Notes

- Timer input clamps hours to 99, minutes and seconds to 59
- Lap list highlights the fastest split in purple and the slowest in red
- Progress bar color: purple → amber (under 25%) → red (under 10%)
