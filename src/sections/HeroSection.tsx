import { useState, useEffect } from "react";
import {
  RocketLaunch,
  LaptopMac,
  AutoAwesome,
  Code2,
  Code,
  Api,
  Storage,
  Palette,
  Widgets,
  Timeline,
  School,
  Grade,
  Wrench,
  EmojiEvents,
  LocationOn,
  KeyboardDoubleArrowDown,
  NotificationsActive
} from "@/components/ui/GlobalIcons";

function useTypewriter(phrases: string[], speed = 80, delSpeed = 45, pause = 1400) {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[pi];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1));
        setCi((c) => c + 1);
        if (ci + 1 === cur.length) setDel(true);
      } else {
        setText(cur.slice(0, ci - 1));
        setCi((c) => c - 1);
        if (ci - 1 === 0) {
          setDel(false);
          setPi((i) => (i + 1) % phrases.length);
        }
      }
    }, del ? delSpeed : ci === cur.length ? pause : speed);
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases, speed, delSpeed, pause]);
  return text;
}

// ── Developer Illustration SVG ────────────────────────────────────────────────
function DevIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 560"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", maxWidth: 420 }}
    >
      <title>Smit Kava – developer hero illustration</title>
      <desc>A Doraemon-themed developer workspace scene with animated floating gadget cards, code editor, and skill orbits for a portfolio hero section.</desc>
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f6ff" />
          <stop offset="100%" stopColor="#f4faff" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#161b22" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a96e" />
          <stop offset="100%" stopColor="#a07840" />
        </linearGradient>
        <style>{`
          @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
          @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
          @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
          @keyframes orbit1{from{transform:rotate(0deg) translateX(118px) rotate(0deg)}to{transform:rotate(360deg) translateX(118px) rotate(-360deg)}}
          @keyframes orbit2{from{transform:rotate(180deg) translateX(118px) rotate(-180deg)}to{transform:rotate(540deg) translateX(118px) rotate(-540deg)}}
          @keyframes orbit3{from{transform:rotate(60deg) translateX(88px) rotate(-60deg)}to{transform:rotate(420deg) translateX(88px) rotate(-420deg)}}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
          .fa{animation:floatA 3.6s ease-in-out infinite}
          .fb{animation:floatB 4.4s ease-in-out 0.9s infinite}
          .fc{animation:floatC 3s ease-in-out 1.5s infinite}
          .o1{transform-origin:340px 280px;animation:orbit1 8s linear infinite}
          .o2{transform-origin:340px 280px;animation:orbit2 11s linear infinite}
          .o3{transform-origin:340px 280px;animation:orbit3 14s linear infinite 1s}
          .cur{animation:blink 1s step-end infinite}
        `}</style>
      </defs>

      {/* ── Background card ── */}
      <rect x="100" y="60" width="480" height="440" rx="28" fill="url(#cardGrad)" stroke="#b8dff5" strokeWidth="1.5" />

      {/* ── Desk surface ── */}
      <rect x="130" y="365" width="420" height="22" rx="4" fill="url(#deskGrad)" />
      <rect x="130" y="383" width="420" height="6" rx="3" fill="#8a6430" opacity={0.5} />

      {/* ── Laptop body ── */}
      <rect x="190" y="348" width="300" height="20" rx="6" fill="#c8cdd4" />
      <rect x="200" y="350" width="280" height="16" rx="5" fill="#b0b5bc" />
      <rect x="195" y="142" width="290" height="210" rx="10" fill="#2a2f38" />
      <rect x="198" y="148" width="284" height="178" rx="4" fill="url(#screenGrad)" />

      {/* ── Code editor content ── */}
      <rect x="198" y="148" width="284" height="22" rx="0" fill="#21262d" />
      <circle cx={214} cy={159} r={4.5} fill="#ff5f57" />
      <circle cx={228} cy={159} r={4.5} fill="#ffbd2e" />
      <circle cx={242} cy={159} r={4.5} fill="#28c840" />
      <text x={270} y={163} fontFamily="monospace" fontSize={9} fill="#8b949e">HeroSection.tsx</text>

      {/* Line numbers col */}
      <rect x={198} y={170} width={22} height={156} fill="#161b22" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
        <text key={n} x={204} y={183 + i * 14} fontFamily="monospace" fontSize={8.5} fill="#3a424e">{n}</text>
      ))}

      {/* Code text */}
      <text x={226} y={183} fontFamily="monospace" fontSize={8.5} fill="#ff7b72">import</text>
      <text x={258} y={183} fontFamily="monospace" fontSize={8.5} fill="#e6edf3"> React </text>
      <text x={285} y={183} fontFamily="monospace" fontSize={8.5} fill="#ff7b72">from</text>
      <text x={307} y={183} fontFamily="monospace" fontSize={8.5} fill="#a5d6ff"> 'react'</text>

      <text x={226} y={197} fontFamily="monospace" fontSize={8.5} fill="#ff7b72">const</text>
      <text x={254} y={197} fontFamily="monospace" fontSize={8.5} fill="#79c0ff"> Hero</text>
      <text x={276} y={197} fontFamily="monospace" fontSize={8.5} fill="#e6edf3"> = () </text>
      <text x={307} y={197} fontFamily="monospace" fontSize={8.5} fill="#ff7b72">=&gt;</text>
      <text x={323} y={197} fontFamily="monospace" fontSize={8.5} fill="#e6edf3"> {"{"}  </text>

      <text x={226} y={211} fontFamily="monospace" fontSize={8.5} fill="#ff7b72">  return</text>
      <text x={266} y={211} fontFamily="monospace" fontSize={8.5} fill="#e6edf3"> (</text>

      <text x={226} y={225} fontFamily="monospace" fontSize={8.5} fill="#7ee787">  &lt;section</text>
      <text x={286} y={225} fontFamily="monospace" fontSize={8.5} fill="#79c0ff"> id</text>
      <text x={300} y={225} fontFamily="monospace" fontSize={8.5} fill="#e6edf3">=</text>
      <text x={306} y={225} fontFamily="monospace" fontSize={8.5} fill="#a5d6ff">"home"</text>
      <text x={344} y={225} fontFamily="monospace" fontSize={8.5} fill="#7ee787">&gt;</text>

      <text x={226} y={239} fontFamily="monospace" fontSize={8.5} fill="#7ee787">    &lt;h1</text>
      <text x={260} y={239} fontFamily="monospace" fontSize={8.5} fill="#79c0ff"> className</text>
      <text x={320} y={239} fontFamily="monospace" fontSize={8.5} fill="#e6edf3">=</text>
      <text x={326} y={239} fontFamily="monospace" fontSize={8.5} fill="#a5d6ff">"title"</text>
      <text x={368} y={239} fontFamily="monospace" fontSize={8.5} fill="#7ee787">&gt;</text>

      <text x={226} y={253} fontFamily="monospace" fontSize={8.5} fill="#e6edf3">      Hi, I'm </text>
      <text x={285} y={253} fontFamily="monospace" fontSize={8.5} fill="#ffa657">Smit</text>

      <text x={226} y={267} fontFamily="monospace" fontSize={8.5} fill="#7ee787">    &lt;/h1&gt;</text>
      <text x={226} y={281} fontFamily="monospace" fontSize={8.5} fill="#7ee787">  &lt;/section&gt;</text>
      <text x={226} y={295} fontFamily="monospace" fontSize={8.5} fill="#e6edf3">{"}"}</text>
      <rect x={237} y={286} width={5} height={9} fill="#58a6ff" className="cur" />

      {/* Status bar */}
      <rect x={198} y={319} width={284} height={7} fill="#21262d" />
      <text x={204} y={325} fontFamily="monospace" fontSize={6} fill="#3fb950">● TypeScript</text>
      <text x={280} y={325} fontFamily="monospace" fontSize={6} fill="#8b949e">Ln 9, Col 2</text>
      <text x={380} y={325} fontFamily="monospace" fontSize={6} fill="#8b949e">UTF-8</text>

      {/* Laptop hinge line */}
      <line x1={195} y1={346} x2={485} y2={346} stroke="#888" strokeWidth={1} />

      {/* ── Orbit ring ── */}
      <circle cx={340} cy={280} r={118} fill="none" stroke="#b8dff5" strokeWidth={1} strokeDasharray="6 5" opacity={0.6} />
      <circle cx={340} cy={280} r={88} fill="none" stroke="#c8e8f8" strokeWidth={0.8} strokeDasharray="4 6" opacity={0.4} />

      {/* ── Orbiting skill bubbles ── */}
      <g className="o1">
        <circle cx={340} cy={280} r={24} fill="#00a8e0" stroke="#007aaa" strokeWidth={1.5} />
        <text x={340} y={276} fontFamily="monospace" fontSize={9} fill="white" textAnchor="middle" fontWeight="bold">⚛</text>
        <text x={340} y={288} fontFamily="sans-serif" fontSize={7.5} fill="white" textAnchor="middle">React</text>
      </g>
      <g className="o2">
        <circle cx={340} cy={280} r={21} fill="#512bd4" stroke="#3a1fa0" strokeWidth={1.5} />
        <text x={340} y={276} fontFamily="sans-serif" fontSize={7} fill="white" textAnchor="middle" fontWeight="bold">.NET</text>
        <text x={340} y={287} fontFamily="sans-serif" fontSize={6.5} fill="#c8b8ff" textAnchor="middle">Core</text>
      </g>
      <g className="o3">
        <circle cx={340} cy={280} r={21} fill="#3178c6" stroke="#1a5fa8" strokeWidth={1.5} />
        <text x={340} y={276} fontFamily="monospace" fontSize={7.5} fill="white" textAnchor="middle" fontWeight="bold">TS</text>
        <text x={340} y={287} fontFamily="sans-serif" fontSize={6} fill="#b8d8ff" textAnchor="middle">TypeScript</text>
      </g>

      {/* ── Floating info cards ── */}
      {/* Card 1: CGPA */}
      <g style={{ transformOrigin: "155px 170px" }} className="fa">
        <rect x={115} y={148} width={112} height={46} rx={12} fill="white" stroke="#b8dff5" strokeWidth={1.5} />
        <circle cx={138} cy={171} r={12} fill="#e8f6ff" />
        <text x={138} y={176} fontFamily="sans-serif" fontSize={12} fill="#006494" textAnchor="middle">🏆</text>
        <text x={156} y={166} fontFamily="sans-serif" fontSize={10} fill="#00334e" fontWeight="bold">CGPA 8.80</text>
        <text x={156} y={179} fontFamily="sans-serif" fontSize={8} fill="#6b8ca0">MCA · Etech</text>
      </g>

      {/* Card 2: Projects */}
      <g style={{ transformOrigin: "530px 200px" }} className="fb">
        <rect x={478} y={177} width={112} height={46} rx={12} fill="white" stroke="#c8b8ff" strokeWidth={1.5} />
        <circle cx={500} cy={200} r={12} fill="#f0ecff" />
        <text x={500} y={205} fontFamily="sans-serif" fontSize={12} fill="#512bd4" textAnchor="middle">🚀</text>
        <text x={518} y={195} fontFamily="sans-serif" fontSize={10} fill="#00334e" fontWeight="bold">5+ Projects</text>
        <text x={518} y={208} fontFamily="sans-serif" fontSize={8} fill="#6b8ca0">Full‑Stack</text>
      </g>

      {/* Card 3: Location */}
      <g style={{ transformOrigin: "530px 430px" }} className="fb">
        <rect x={478} y={408} width={112} height={46} rx={12} fill="white" stroke="#c8e8c8" strokeWidth={1.5} />
        <circle cx={500} cy={431} r={12} fill="#eaf6ea" />
        <text x={500} y={436} fontFamily="sans-serif" fontSize={12} fill="#2e7d32" textAnchor="middle">📍</text>
        <text x={518} y={426} fontFamily="sans-serif" fontSize={9.5} fill="#00334e" fontWeight="bold">Gujarat, India</text>
        <text x={518} y={439} fontFamily="sans-serif" fontSize={8} fill="#6b8ca0">Vallabh Vidya.</text>
      </g>

      {/* Card 4: Available */}
      <g style={{ transformOrigin: "155px 430px" }} className="fc">
        <rect x={113} y={408} width={118} height={46} rx={12} fill="white" stroke="#ffd6b0" strokeWidth={1.5} />
        <circle cx={136} cy={431} r={12} fill="#fff5e8" />
        <circle cx={136} cy={431} r={5} fill="#f57c00">
          <animate attributeName="r" values="5;3;5" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <text x={156} y={426} fontFamily="sans-serif" fontSize={9.5} fill="#00334e" fontWeight="bold">Available</text>
        <text x={156} y={439} fontFamily="sans-serif" fontSize={8} fill="#6b8ca0">For Projects</text>
      </g>

      {/* ── Bottom tag strip ── */}
      <rect x={160} y={490} width={360} height={28} rx={14} fill="white" stroke="#b8dff5" strokeWidth={1.5} />
      <text x={228} y={509} fontFamily="sans-serif" fontSize={10} fill="#006494" fontWeight="bold" textAnchor="middle">React.js</text>
      <line x1={255} y1={498} x2={255} y2={510} stroke="#b8dff5" strokeWidth={1} />
      <text x={303} y={509} fontFamily="sans-serif" fontSize={10} fill="#512bd4" fontWeight="bold" textAnchor="middle">TypeScript</text>
      <line x1={349} y1={498} x2={349} y2={510} stroke="#b8dff5" strokeWidth={1} />
      <text x={391} y={509} fontFamily="sans-serif" fontSize={10} fill="#e53935" fontWeight="bold" textAnchor="middle">.NET Core</text>
      <line x1={431} y1={498} x2={431} y2={510} stroke="#b8dff5" strokeWidth={1} />
      <text x={465} y={509} fontFamily="sans-serif" fontSize={10} fill="#0ea5e9" fontWeight="bold" textAnchor="middle">SQL</text>

      {/* ── Doraemon bell accent ── */}
      <circle cx={340} cy={430} r={18} fill="#ffd600" stroke="#c8a800" strokeWidth={2} />
      <circle cx={340} cy={430} r={11} fill="#f0c000" stroke="#c8a800" strokeWidth={1} />
      <circle cx={340} cy={434} r={4} fill="#7a5800" />
      <circle cx={335} cy={425} r={3.5} fill="white" opacity={0.55} />
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      border: "1.5px solid rgba(0,153,213,0.18)",
      borderRadius: 16,
      padding: "10px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 76,
      gap: 2,
    }}>
      <span style={{ display: "inline-flex", fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: "#00334e", fontFamily: "'Nunito',sans-serif" }}>{value}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#6b8ca0", fontFamily: "'Nunito',sans-serif" }}>{label}</span>
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────────
interface PillProps {
  children: React.ReactNode;
}

function Pill({ children }: PillProps) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 14px", borderRadius: 999,
        border: `2px solid ${hov ? "#0099d5" : "#b3dff2"}`,
        background: hov ? "#0099d5" : "rgba(255,255,255,0.82)",
        color: hov ? "#fff" : "#006494",
        fontSize: 11, fontWeight: 700,
        fontFamily: "'Nunito',sans-serif",
        cursor: "default", transition: "all 0.18s",
        transform: hov ? "translateY(-2px)" : "none",
        userSelect: "none",
      }}
    >{children}</span>
  );
}

// ── Cloud ─────────────────────────────────────────────────────────────────────
function Cloud() {
  return (
    <svg width="120" height="52" viewBox="0 0 120 52" fill="none">
      <ellipse cx="60" cy="40" rx="54" ry="15" fill="white" opacity="0.65" />
      <circle cx="36" cy="27" r="18" fill="white" opacity="0.65" />
      <circle cx="66" cy="19" r="23" fill="white" opacity="0.65" />
      <circle cx="92" cy="28" r="15" fill="white" opacity="0.65" />
    </svg>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const typeText = useTypewriter([
    "Full‑Stack Developer",
    "React.js Enthusiast",
    ".NET Core Engineer",
    "Clean Code Advocate",
    "Future Tech Builder",
  ]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800;900&display=swap');

        @keyframes cloudDrift { from{transform:translateX(-160px)} to{transform:translateX(calc(100vw + 160px))} }
        @keyframes twinkle    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.4)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn    { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes floatHero  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes bellRing   { 0%,100%{transform:rotate(0)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 55%{transform:rotate(-9deg)} 70%{transform:rotate(9deg)} 85%{transform:rotate(0)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
        @keyframes bounce     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

        .h1{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.1s}
        .h2{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.22s}
        .h3{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.36s}
        .h4{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.5s}
        .h5{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.64s}
        .h6{animation:fadeUp .65s ease forwards;opacity:0;animation-delay:.78s}
        .hr{animation:slideIn .9s ease forwards;opacity:0;animation-delay:.28s}

        .btn-p{
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 30px;border-radius:999px;border:none;cursor:pointer;
          background:#006494;color:white;font-weight:800;font-size:13px;
          font-family:'Baloo 2',cursive;transition:all .2s;
          box-shadow:0 4px 20px rgba(0,100,148,.32);
        }
        .btn-p:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,100,148,.44)}
        .btn-o{
          display:inline-flex;align-items:center;gap:8px;
          padding:11px 28px;border-radius:999px;cursor:pointer;
          background:transparent;color:#006494;font-weight:800;font-size:13px;
          font-family:'Baloo 2',cursive;transition:all .2s;
          border:2.5px solid #006494;
        }
        .btn-o:hover{background:#006494;color:white;transform:translateY(-3px)}

        @media(max-width:820px){
          .hgrid{flex-direction:column !important}
          .hright{margin-top:24px}
          .hstats,.hpills,.hbtns{justify-content:center !important}
          .hleft{align-items:center !important;text-align:center}
          .hdesc{text-align:center}
        }
        @media(max-width:480px){
          .htitle{font-size:1.9rem !important}
          .iband{flex-direction:column;gap:14px !important}
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section
        id="home"
        style={{
          position: "relative", minHeight: "100vh", overflow: "hidden",
          background: "linear-gradient(160deg,#e3f2fb 0%,#c8e9ff 28%,#f0faff 58%,#fffef0 100%)",
          fontFamily: "'Nunito',sans-serif",
        }}
      >
        {/* Clouds */}
        {[{ d: "0s", dur: "30s", top: "7%" }, { d: "10s", dur: "38s", top: "19%" }, { d: "20s", dur: "26s", top: "3%" }].map((c, i) => (
          <div key={i} style={{ position: "absolute", top: c.top, left: -160, zIndex: 1, pointerEvents: "none", animation: `cloudDrift ${c.dur} linear ${c.d} infinite` }}>
            <Cloud />
          </div>
        ))}

        {/* Twinkle stars */}
        {[
          { top: "8%", left: "11%", color: "#fcd400", size: 7, d: "0.3s" },
          { top: "6%", left: "35%", color: "#e53935", size: 9, d: "1s" },
          { top: "14%", left: "60%", color: "#fcd400", size: 6, d: "0.7s" },
          { top: "4%", left: "78%", color: "#0099d5", size: 5, d: "1.6s" },
          { top: "20%", left: "50%", color: "#006494", size: 7, d: "2.1s" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: s.top, left: s.left,
            width: s.size, height: s.size, borderRadius: "50%",
            background: s.color, zIndex: 2, pointerEvents: "none",
            animation: `twinkle 2.2s ease-in-out ${s.d} infinite`,
          }} />

        ))}

        {/* Grid */}
        <div className="hgrid" style={{
          position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto",
          padding: "clamp(80px,10vh,100px) 24px 40px",
          display: "flex", alignItems: "center", gap: 40,
          minHeight: "100vh", boxSizing: "border-box",
        }}>

          {/* ── Left ── */}
          <div className="hleft" style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Badge */}
            <div className="h1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 999,
              border: "2px solid #fcd400", background: "rgba(252,212,0,0.16)",
              color: "#00334e", fontWeight: 700, fontSize: 12,
              marginBottom: 18, width: "fit-content",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: "#e53935", flexShrink: 0,
                animation: "twinkle 1.6s ease-in-out infinite",
              }} />
              <RocketLaunch sx={{ fontSize: 14 }} /> Available for Projects
            </div>

            {/* Name + title */}
            <div className="h2" style={{ marginBottom: 10 }}>
              <h1 className="htitle" style={{
                fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 900,
                color: "#00334e", fontFamily: "'Baloo 2',cursive",
                lineHeight: 1.12, margin: 0,
              }}>
                Hi, I'm{" "}
                <span style={{ color: "#e53935", display: "inline-block", animation: "floatHero 3s ease-in-out infinite" }}>
                  Smit Kava
                </span>
              </h1>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: "clamp(1rem,2.4vw,1.25rem)", fontWeight: 700,
                color: "#006494", fontFamily: "'Baloo 2',cursive", marginTop: 6,
              }}>
                <LaptopMac sx={{ fontSize: 18, mr: 0.5 }} /> Full‑Stack Developer
              </div>
            </div>

            {/* Typewriter */}
            <div className="h3" style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 14, fontWeight: 700, color: "#006494",
              minHeight: 28, marginBottom: 16,
            }}>
              <AutoAwesome sx={{ fontSize: 16 }} />{" "}
              <span style={{ borderRight: "2.5px solid #006494", paddingRight: 3, minWidth: 200 }}>
                {typeText}
              </span>
            </div>

            {/* Description */}
            <p className="h3 hdesc" style={{
              fontSize: 13.5, lineHeight: 1.75, color: "#2a3f4a",
              maxWidth: 400, marginBottom: 20, fontWeight: 600,
            }}>
              MCA Student at Etech Consultancy &bull; CGPA 8.80<br />
              Building modern web apps with React.js, TypeScript &amp; .NET Core —
              turning ideas into clean, fast digital experiences.
            </p>

            {/* Pills */}
            <div className="h4 hpills" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
              {[
                { icon: <Code2 sx={{ fontSize: 14 }} />, label: "React.js" },
                { icon: <Code sx={{ fontSize: 14 }} />, label: "TypeScript" },
                { icon: <Api sx={{ fontSize: 14 }} />, label: ".NET Core" },
                { icon: <Storage sx={{ fontSize: 14 }} />, label: "SQL Server" },
                { icon: <Palette sx={{ fontSize: 14 }} />, label: "Tailwind CSS" }
              ].map(({ icon, label }) => (
                <Pill key={label}>{icon} {label}</Pill>
              ))}
            </div>

            {/* Buttons */}
            <div className="h5 hbtns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              <button className="btn-p" onClick={() => scrollTo("skills")}>
                <Widgets sx={{ fontSize: 16 }} /> Explore Pocket
              </button>
              <button className="btn-o" onClick={() => scrollTo("experience")}>
                <Timeline sx={{ fontSize: 16 }} /> See Journey
              </button>
            </div>

            {/* Stats */}
            <div className="h6 hstats" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatCard icon={<School sx={{ fontSize: 20 }} />} value="8.80" label="MCA CGPA" />
              <StatCard icon={<Grade sx={{ fontSize: 20 }} />} value="7.62" label="B.Sc CGPA" />
              <StatCard icon={<RocketLaunch sx={{ fontSize: 20 }} />} value="5+" label="Projects" />
              <StatCard icon={<Wrench sx={{ fontSize: 20 }} />} value="3+" label="Tech Stack" />
            </div>
          </div>

          {/* ── Right: Illustration ── */}
          <div className="hright" style={{
            flex: "0 0 auto",
            width: "clamp(260px,36vw,420px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "slideIn 0.9s ease forwards, floatHero 4.5s ease-in-out infinite 0.9s",
            opacity: 0,
          }}>
            <DevIllustration />
          </div>
        </div>
      </section>

      {/* ── Info Band ── */}
      <div style={{
        background: "rgba(255,255,255,0.68)",
        borderTop: "2px dashed rgba(0,100,148,0.18)",
        padding: "16px 0", backdropFilter: "blur(8px)",
      }}>
        <div className="iband" style={{
          maxWidth: 1120, margin: "0 auto", padding: "0 24px",
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22,
        }}>
          {[
            { icon: <RocketLaunch sx={{ fontSize: 20, color: "white" }} />, bg: "#006494", title: "22nd Century Tech", sub: "From the future" },
            { icon: <LaptopMac sx={{ fontSize: 20, color: "white" }} />, bg: "#e53935", title: "Full‑Stack Builder", sub: "React · TypeScript · .NET" },
            { icon: <EmojiEvents sx={{ fontSize: 20, color: "white" }} />, bg: "#2e7d32", title: "Distinction Holder", sub: "B.Sc IT · Charusat Univ." },
            { icon: <LocationOn sx={{ fontSize: 20, color: "white" }} />, bg: "#6a1b9a", title: "Vallabh Vidyanagar", sub: "Gujarat, India" },
          ].map(item => (
            <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: item.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "#00334e", fontFamily: "'Baloo 2',cursive" }}>{item.title}</div>
                <div style={{ fontSize: 10.5, color: "#6b8ca0", fontWeight: 600 }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{
            marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
            padding: "6px 16px", borderRadius: 999,
            background: "#e8f4fb", border: "1.5px solid #b3dff2",
            fontSize: 12, fontWeight: 800, color: "#00334e",
            fontFamily: "'Baloo 2',cursive", whiteSpace: "nowrap",
          }}>
            <Grade sx={{ fontSize: 16, mr: 0.5 }} /> CGPA 8.80
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 6, padding: "10px 0", fontSize: 11, color: "#9ab0bc", fontWeight: 700,
        animation: "bounce 2s ease-in-out infinite",
      }}>
        <KeyboardDoubleArrowDown sx={{ fontSize: 14 }} /> Scroll to explore the 4D pocket <KeyboardDoubleArrowDown sx={{ fontSize: 14 }} />
      </div>

      {/* ── Bell FAB ── */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 100 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "2px solid #fcd400",
          animation: "pulseRing 2.2s ease-out infinite",
        }} />
        <button
          onClick={() => scrollTo("contact")}
          style={{
            width: 54, height: 54, borderRadius: "50%",
            background: "rgba(252,212,0,0.22)", border: "2.5px solid #fcd400",
            boxShadow: "0 4px 20px rgba(252,212,0,.48)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", position: "relative",
            animation: "bellRing 3.5s ease-in-out infinite",
            color: "#7a5800",
          }}
          title="Contact me"
        >
          <NotificationsActive sx={{ fontSize: 24 }} />
        </button>
      </div>
    </>
  );
}