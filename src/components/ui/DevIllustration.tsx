import { useState, useEffect } from "react";

// ── Typewriter hook — types code lines character by character ─────────────────
function useCodeTyper(lines: string[], charDelay = 32, lineDelay = 70) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [curLine, setCurLine] = useState(0);
  const [curChar, setCurChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (curLine >= lines.length) {
      setDone(true);
      return;
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
      const t = setTimeout(() => {
        setCurLine((l) => l + 1);
        setCurChar(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [curLine, curChar, lines, charDelay, lineDelay, done]);

  return { displayed, done };
}

// ── Simple token colorizer ────────────────────────────────────────────────────
type Token = { text: string; color: string };
function tokenize(raw: string): Token[] {
  if (!raw) return [];
  const rules: [RegExp, string][] = [
    [/^(import|export|default|from|const|let|return|function|=>|async|await)/, "#ff7b72"],
    [/^(React|useState|useEffect|Hero|HeroSection|SmitInfo)/, "#79c0ff"],
    [/^('[^']*'|"[^"]*"|`[^`]*`)/, "#a5d6ff"],
    [/^(<\/?\w[\w.]*)/, "#7ee787"],
    [/^(id|className|style|href)(?=\s*=)/, "#79c0ff"],
    [/^(Smit|Kava)/, "#ffa657"],
    [/^\/\/[^\n]*/, "#8b949e"],
    [/^[{}()[\]<>/=;,.:]+/, "#e6edf3"],
    [/^\s+/, "#e6edf3"],
    [/^\w+/, "#e6edf3"],
    [/^./, "#e6edf3"],
  ];
  const tokens: Token[] = [];
  let rest = raw;
  while (rest.length > 0) {
    let matched = false;
    for (const [re, color] of rules) {
      const m = rest.match(re);
      if (m) { tokens.push({ text: m[0], color }); rest = rest.slice(m[0].length); matched = true; break; }
    }
    if (!matched) { tokens.push({ text: rest[0], color: "#e6edf3" }); rest = rest.slice(1); }
  }
  return tokens;
}

const CODE_LINES = [
  "// SmitInfo.tsx — Portfolio Hero",
  "import React from 'react'",
  "import { useState } from 'react'",
  "",
  "const SmitInfo = () => {",
  "  const name = 'Smit Kava'",
  "  const role = 'Full-Stack Dev'",
  "  const cgpa = 8.80",
  "",
  "  return (",
  "    <section id=\"home\">",
  "      <h1>{name}</h1>",
  "      <p>{role}</p>",
  "      <span>CGPA {cgpa}</span>",
  "    </section>",
  "  )",
  "}",
  "",
  "export default SmitInfo",
];

interface DevIllustrationProps {
  /** compact: true = smaller layout when docked on left side of hero */
  compact?: boolean;
}

export default function DevIllustration({ compact = false }: DevIllustrationProps) {
  const { displayed, done } = useCodeTyper(CODE_LINES, 30, 60);
  const activeLine = Math.min(displayed.length, CODE_LINES.length - 1);

  const W = 520, H = compact ? 340 : 380;
  const SCREEN_X = 28, SCREEN_Y = 18;
  const SCREEN_W = W - 56, SCREEN_H = H - 56;
  const TITLEBAR_H = 28;
  const GUTTER_W = 30;
  const CODE_X = SCREEN_X + GUTTER_W + 10;
  const CODE_Y_START = SCREEN_Y + TITLEBAR_H + 18;
  const LINE_H = compact ? 11 : 13.5;
  const FONT_SIZE = compact ? 9 : 11;
  const CHAR_W = compact ? 5.2 : 6.2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", maxWidth: compact ? 460 : 520 }}
    >
      <title>Live code editor – Smit Kava portfolio</title>
      <defs>
        <linearGradient id="dvEditorBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
        <linearGradient id="dvLaptopBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e333d" />
          <stop offset="100%" stopColor="#1e2229" />
        </linearGradient>
        <style>{`
          @keyframes dvCurBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          .dvCur { animation: dvCurBlink 1s step-end infinite; }
          @keyframes dvSGlow { 0%,100%{opacity:0.12} 50%{opacity:0.26} }
          .dvSGlow { animation: dvSGlow 3.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Laptop shell */}
      <rect x={SCREEN_X - 6} y={SCREEN_Y - 6} width={SCREEN_W + 12} height={SCREEN_H + 12}
        rx="14" fill="url(#dvLaptopBody)" stroke="#3a3f4a" strokeWidth="1.5" />

      {/* Screen */}
      <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H}
        rx="8" fill="url(#dvEditorBg)" />

      {/* Ambient glow overlay */}
      <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H}
        rx="8" fill="#58a6ff" opacity="0" className="dvSGlow" />

      {/* Title bar */}
      <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={TITLEBAR_H} rx="8" fill="#21262d" />
      <rect x={SCREEN_X} y={SCREEN_Y + TITLEBAR_H - 8} width={SCREEN_W} height={8} fill="#21262d" />

      {/* Traffic lights */}
      <circle cx={SCREEN_X + 16} cy={SCREEN_Y + 14} r={5} fill="#ff5f57" />
      <circle cx={SCREEN_X + 32} cy={SCREEN_Y + 14} r={5} fill="#ffbd2e" />
      <circle cx={SCREEN_X + 48} cy={SCREEN_Y + 14} r={5} fill="#28c840" />

      {/* File tab */}
      <rect x={SCREEN_X + 64} y={SCREEN_Y + 5} width={120} height={22} rx="5"
        fill="#161b22" stroke="#30363d" strokeWidth="1" />
      <text x={SCREEN_X + 72} y={SCREEN_Y + 20} fontFamily="'Fira Code',monospace"
        fontSize="10.5" fill="#8b949e">SmitInfo.tsx</text>
      <line x1={SCREEN_X + 64} y1={SCREEN_Y + 27} x2={SCREEN_X + 184} y2={SCREEN_Y + 27}
        stroke="#58a6ff" strokeWidth="1.5" />

      {/* Gutter */}
      <rect x={SCREEN_X} y={SCREEN_Y + TITLEBAR_H} width={GUTTER_W + 4} height={SCREEN_H - TITLEBAR_H - 14}
        fill="#161b22" />

      {/* Code lines */}
      {CODE_LINES.map((_, i) => {
        const lineText = displayed[i] ?? "";
        const y = CODE_Y_START + i * LINE_H;
        const isActive = i === activeLine && !done;
        const tokens = tokenize(lineText);
        if (y + LINE_H > SCREEN_Y + SCREEN_H - 14) return null;

        return (
          <g key={i}>
            <text x={SCREEN_X + GUTTER_W - 2} y={y}
              fontFamily="'Fira Code',monospace" fontSize="10.5"
              fill={isActive ? "#6e7681" : "#3a424e"} textAnchor="end">
              {i + 1}
            </text>

            {(() => {
              let xOff = 0;
              return tokens.map((tok, ti) => {
                const el = (
                  <text key={ti} x={CODE_X + xOff} y={y}
                    fontFamily="'Fira Code',monospace"
                    fontSize={FONT_SIZE} fill={tok.color}>
                    {tok.text}
                  </text>
                );
                xOff += tok.text.length * CHAR_W;
                return el;
              });
            })()}

            {isActive && (
              <rect className="dvCur"
                x={CODE_X + lineText.length * CHAR_W} y={y - 11}
                width={6} height={13} fill="#58a6ff" />
            )}
          </g>
        );
      })}

      {/* Status bar */}
      <rect x={SCREEN_X} y={SCREEN_Y + SCREEN_H - 14} width={SCREEN_W} height={14} fill="#21262d" />
      <text x={SCREEN_X + 10} y={SCREEN_Y + SCREEN_H - 4}
        fontFamily="'Fira Code',monospace" fontSize="8.5" fill="#3fb950">
        ● TypeScript React
      </text>
      <text x={SCREEN_X + SCREEN_W - 80} y={SCREEN_Y + SCREEN_H - 4}
        fontFamily="'Fira Code',monospace" fontSize="8.5" fill="#8b949e">
        Ln {activeLine + 1}  UTF-8
      </text>

      {/* Laptop base */}
      <rect x={SCREEN_X - 16} y={SCREEN_Y + SCREEN_H + 6} width={SCREEN_W + 32} height={10}
        rx="4" fill="#1e2229" stroke="#3a3f4a" strokeWidth="1" />
      <rect x={SCREEN_X + SCREEN_W / 2 - 30} y={SCREEN_Y + SCREEN_H + 10}
        width={60} height={5} rx="2" fill="#161b22" />
    </svg>
  );
}