import React, { useState, useEffect } from "react";

// Typewriter hook — cycles through code lines one character at a time
function useCodeTyper(lines: string[], charDelay = 38, lineDelay = 900) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [curLine, setCurLine] = useState(0);
  const [curChar, setCurChar] = useState(0);

  useEffect(() => {
    if (curLine >= lines.length) {
      // All lines done — restart after a pause
      const t = setTimeout(() => {
        setDisplayed([]);
        setCurLine(0);
        setCurChar(0);
      }, 2200);
      return () => clearTimeout(t);
    }

    const line = lines[curLine];

    if (curChar < line.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[curLine] = line.slice(0, curChar + 1);
          return next;
        });
        setCurChar((c) => c + 1);
      }, charDelay);
      return () => clearTimeout(t);
    } else {
      // Line complete — move to next
      const t = setTimeout(() => {
        setCurLine((l) => l + 1);
        setCurChar(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [curLine, curChar, lines, charDelay, lineDelay]);

  return displayed;
}

// Token colorizer — returns colored tspan segments for a plain code string
function tokenize(raw: string) {
  if (!raw) return null;

  type Token = { text: string; color: string };
  const tokens: Token[] = [];

  // Very simple regex-based tokenizer (good enough for display)
  const rules: [RegExp, string][] = [
    [/^(import|export|default|from|const|return|function|=>)/, "#ff7b72"],
    [/^(React|useState|useEffect|Hero|HeroSection)/, "#79c0ff"],
    [/^('[^']*'|"[^"]*")/, "#a5d6ff"],
    [/^(<\/?\w[\w.]*)/, "#7ee787"],
    [/^(id|className|style)(?=\s*=)/, "#79c0ff"],
    [/^(Smit|Kava)/, "#ffa657"],
    [/^[{}()[\]<>/=]+/, "#e6edf3"],
    [/^\s+/, "#e6edf3"],
    [/^\w+/, "#e6edf3"],
    [/^./, "#e6edf3"],
  ];

  let rest = raw;
  while (rest.length > 0) {
    let matched = false;
    for (const [re, color] of rules) {
      const m = rest.match(re);
      if (m) {
        tokens.push({ text: m[0], color });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) { tokens.push({ text: rest[0], color: "#e6edf3" }); rest = rest.slice(1); }
  }

  return tokens;
}

const CODE_LINES = [
  "import React from 'react'",
  "import { useState } from 'react'",
  "",
  "const Hero = () => {",
  "  return (",
  "    <section id=\"home\">",
  "      <h1 className=\"title\">",
  "        Hi, I'm Smit Kava",
  "      </h1>",
  "      <p className=\"subtitle\">",
  "        Full-Stack Developer",
  "      </p>",
  "    </section>",
  "  )",
  "}",
  "",
  "export default Hero",
];

export default function DevIllustration() {
  const displayed = useCodeTyper(CODE_LINES, 36, 80);
  // Which line is currently being typed (show cursor there)
  const activeLine = Math.min(displayed.length, CODE_LINES.length - 1);

  // Layout constants
  const W = 520, H = 380;
  const SCREEN_X = 30, SCREEN_Y = 20;
  const SCREEN_W = W - 60, SCREEN_H = H - 60;
  const TITLEBAR_H = 28;
  const GUTTER_W = 28;
  const CODE_X = SCREEN_X + GUTTER_W + 10; // where code text starts
  const CODE_Y_START = SCREEN_Y + TITLEBAR_H + 20; // first line y
  const LINE_H = 17;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", maxWidth: 520 }}
    >
      <title>Live code editor – Smit Kava portfolio</title>
      <defs>
        <linearGradient id="editorBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
        <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e333d" />
          <stop offset="100%" stopColor="#1e2229" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <style>{`
          @keyframes curBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          .cur { animation: curBlink 1s step-end infinite; }
          @keyframes screenGlow { 0%,100%{opacity:0.18} 50%{opacity:0.32} }
          .sglow { animation: screenGlow 3s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ── Laptop outer shell ── */}
      <rect
        x={SCREEN_X - 6} y={SCREEN_Y - 6}
        width={SCREEN_W + 12} height={SCREEN_H + 12}
        rx="14" fill="url(#laptopBody)"
        stroke="#3a3f4a" strokeWidth="1.5"
      />

      {/* ── Screen area ── */}
      <rect
        x={SCREEN_X} y={SCREEN_Y}
        width={SCREEN_W} height={SCREEN_H}
        rx="8" fill="url(#editorBg)"
      />

      {/* Screen ambient glow */}
      <rect
        x={SCREEN_X} y={SCREEN_Y}
        width={SCREEN_W} height={SCREEN_H}
        rx="8" fill="#58a6ff" opacity="0"
        className="sglow"
      />

      {/* ── Title bar ── */}
      <rect
        x={SCREEN_X} y={SCREEN_Y}
        width={SCREEN_W} height={TITLEBAR_H}
        rx="8" fill="#21262d"
      />
      {/* flatten bottom corners of titlebar */}
      <rect
        x={SCREEN_X} y={SCREEN_Y + TITLEBAR_H - 8}
        width={SCREEN_W} height={8}
        fill="#21262d"
      />

      {/* Traffic lights */}
      <circle cx={SCREEN_X + 18} cy={SCREEN_Y + 14} r={5} fill="#ff5f57" />
      <circle cx={SCREEN_X + 34} cy={SCREEN_Y + 14} r={5} fill="#ffbd2e" />
      <circle cx={SCREEN_X + 50} cy={SCREEN_Y + 14} r={5} fill="#28c840" />

      {/* File tab */}
      <rect
        x={SCREEN_X + 68} y={SCREEN_Y + 6}
        width={130} height={22}
        rx="5" fill="#161b22"
        stroke="#30363d" strokeWidth="1"
      />
      <text
        x={SCREEN_X + 78} y={SCREEN_Y + 21}
        fontFamily="'Fira Code',monospace" fontSize="11"
        fill="#8b949e"
      >
        SmitInfo.tsx
      </text>
      {/* active tab indicator */}
      <line
        x1={SCREEN_X + 68} y1={SCREEN_Y + 28}
        x2={SCREEN_X + 198} y2={SCREEN_Y + 28}
        stroke="#58a6ff" strokeWidth="1.5"
      />

      {/* ── Line number gutter ── */}
      <rect
        x={SCREEN_X} y={SCREEN_Y + TITLEBAR_H}
        width={GUTTER_W + 4} height={SCREEN_H - TITLEBAR_H - 14}
        fill="#161b22"
      />

      {/* ── Render typed lines ── */}
      {CODE_LINES.map((_, i) => {
        const lineText = displayed[i] ?? "";
        const y = CODE_Y_START + i * LINE_H;
        const isActive = i === activeLine && displayed.length <= CODE_LINES.length;
        const tokens = tokenize(lineText);

        // Only render lines that fit in the screen
        if (y + LINE_H > SCREEN_Y + SCREEN_H - 14) return null;

        return (
          <g key={i}>
            {/* Line number */}
            <text
              x={SCREEN_X + GUTTER_W - 2}
              y={y}
              fontFamily="'Fira Code',monospace"
              fontSize="11"
              fill={isActive ? "#6e7681" : "#3a424e"}
              textAnchor="end"
            >
              {i + 1}
            </text>

            {/* Code text — render token by token for syntax highlighting */}
            {tokens && (() => {
              let xOffset = 0;
              return tokens.map((tok, ti) => {
                // Measure approximate char width (monospace ~6.5px at fontSize 12)
                const CHAR_W = 6.6;
                const el = (
                  <text
                    key={ti}
                    x={CODE_X + xOffset}
                    y={y}
                    fontFamily="'Fira Code',monospace"
                    fontSize="12"
                    fill={tok.color}
                  >
                    {tok.text}
                  </text>
                );
                xOffset += tok.text.length * CHAR_W;
                return el;
              });
            })()}

            {/* Blinking cursor on active line */}
            {isActive && lineText !== undefined && (() => {
              const CHAR_W = 6.6;
              const cx = CODE_X + lineText.length * CHAR_W;
              return (
                <rect
                  className="cur"
                  x={cx} y={y - 11}
                  width={6} height={13}
                  fill="#58a6ff"
                />
              );
            })()}
          </g>
        );
      })}

      {/* ── Status bar ── */}
      <rect
        x={SCREEN_X} y={SCREEN_Y + SCREEN_H - 14}
        width={SCREEN_W} height={14}
        rx="0" fill="#21262d"
      />
      <rect
        x={SCREEN_X} y={SCREEN_Y + SCREEN_H - 14}
        width={SCREEN_W} height={4}
        fill="#21262d"
      />
      <text
        x={SCREEN_X + 10} y={SCREEN_Y + SCREEN_H - 4}
        fontFamily="'Fira Code',monospace" fontSize="8.5"
        fill="#3fb950"
      >
        ● TypeScript React
      </text>
      <text
        x={SCREEN_X + SCREEN_W - 80} y={SCREEN_Y + SCREEN_H - 4}
        fontFamily="'Fira Code',monospace" fontSize="8.5"
        fill="#8b949e"
      >
        Ln {activeLine + 1}  UTF-8
      </text>

      {/* ── Laptop base / hinge ── */}
      <rect
        x={SCREEN_X - 16} y={SCREEN_Y + SCREEN_H + 6}
        width={SCREEN_W + 32} height={10}
        rx="4" fill="#1e2229"
        stroke="#3a3f4a" strokeWidth="1"
      />
      <rect
        x={SCREEN_X + SCREEN_W / 2 - 30} y={SCREEN_Y + SCREEN_H + 10}
        width={60} height={5}
        rx="2" fill="#161b22"
      />
    </svg>
  );
}