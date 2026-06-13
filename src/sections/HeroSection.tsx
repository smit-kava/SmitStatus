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
  NotificationsActive,
} from "@/components/ui/GlobalIcons";
import DevIllustration from "@/components/ui/DevIllustration";

// ── Typewriter hook ────────────────────────────────────────────────────────────
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
        if (ci - 1 === 0) { setDel(false); setPi((i) => (i + 1) % phrases.length); }
      }
    }, del ? delSpeed : ci === cur.length ? pause : speed);
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases, speed, delSpeed, pause]);
  return text;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="hstat-card">
      <span style={{ display: "inline-flex", fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: "#00334e", fontFamily: "'Nunito',sans-serif" }}>{value}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: "#6b8ca0", fontFamily: "'Nunito',sans-serif" }}>{label}</span>
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      className="hpill"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 14px", borderRadius: 999,
        border: `2px solid ${hov ? "#0099d5" : "#b3dff2"}`,
        background: hov ? "#0099d5" : "rgba(255,255,255,0.82)",
        color: hov ? "#fff" : "#006494",
        fontSize: 11, fontWeight: 700, fontFamily: "'Nunito',sans-serif",
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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @keyframes cloudDrift { from{transform:translateX(-160px)} to{transform:translateX(calc(100vw + 160px))} }
        @keyframes twinkle    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.15;transform:scale(0.4)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInRight { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes floatHero  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes bellRing   { 0%,100%{transform:rotate(0)} 15%{transform:rotate(-18deg)} 30%{transform:rotate(18deg)} 55%{transform:rotate(-9deg)} 70%{transform:rotate(9deg)} 85%{transform:rotate(0)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.2);opacity:0} }
        @keyframes bounce     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

        /* Left content stagger */
        .h1{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.1s}
        .h2{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.25s}
        .h3{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.4s}
        .h4{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.55s}
        .h5{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.7s}
        .h6{animation:fadeUp .6s ease forwards;opacity:0;animation-delay:.85s}

        /* Right illustration — slides in from right, floats after */
        .hright-anim {
          animation:
            slideInRight 0.7s cubic-bezier(0.55,0,0.15,1) forwards,
            floatHero 4.5s ease-in-out infinite 0.7s;
          opacity: 0;
        }

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

        .hstat-card{
          background:rgba(255,255,255,0.75);
          border:1.5px solid rgba(0,153,213,0.18);
          border-radius:16px;padding:10px 16px;
          display:flex;flex-direction:column;align-items:center;
          min-width:80px;gap:2px;transition:all 0.2s;
        }
        .hstat-card:hover{
          transform:translateY(-4px);
          box-shadow:0 6px 20px rgba(0,153,213,0.15);
          background:rgba(255,255,255,0.9);
        }

        /* ── Large screens ── */
        @media(min-width:1400px){
          .hgrid{max-width:1320px !important;gap:80px !important}
          .iband{max-width:1320px !important}
          .htitle{font-size:clamp(3rem,4vw,4rem) !important}
          .hdesc{font-size:16px !important;max-width:500px !important}
          .hright{width:clamp(420px,32vw,560px) !important}
          .hstat-card{min-width:100px !important;padding:14px 22px !important}
          .hstat-card span:nth-of-type(2){font-size:24px !important}
          .hpill{padding:7px 18px !important;font-size:13px !important}
          .btn-p{padding:16px 36px !important;font-size:15px !important}
          .btn-o{padding:14px 34px !important;font-size:15px !important}
          .htypewriter{font-size:18px !important;margin-bottom:22px !important}
        }
        @media(min-width:1800px){
          .hgrid{max-width:1560px !important;gap:120px !important}
          .iband{max-width:1560px !important}
          .htitle{font-size:clamp(3.6rem,4.5vw,4.8rem) !important}
          .hdesc{font-size:17.5px !important;max-width:600px !important}
          .hright{width:clamp(520px,35vw,680px) !important}
          .hstat-card{min-width:120px !important;padding:16px 26px !important}
          .hstat-card span:nth-of-type(2){font-size:28px !important}
          .hpill{padding:9px 22px !important;font-size:14.5px !important}
        }

        /* ── Mobile / tablet ── */
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

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          position: "relative", minHeight: "100vh", overflow: "hidden",
          background: "linear-gradient(160deg,#e3f2fb 0%,#c8e9ff 28%,#f0faff 58%,#fffef0 100%)",
          fontFamily: "'Nunito',sans-serif",
        }}
      >
        {/* Drifting clouds */}
        {[
          { d: "0s", dur: "30s", top: "7%" },
          { d: "10s", dur: "38s", top: "19%" },
          { d: "20s", dur: "26s", top: "3%" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute", top: c.top, left: -160, zIndex: 1, pointerEvents: "none",
            animation: `cloudDrift ${c.dur} linear ${c.d} infinite`,
          }}>
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

        {/* ── Two-column grid ── */}
        <div className="hgrid" style={{
          position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto",
          padding: "clamp(80px,10vh,100px) 24px 40px",
          display: "flex", alignItems: "center", gap: 40,
          minHeight: "100vh", boxSizing: "border-box",
        }}>

          {/* ── Left column ── */}
          <div className="hleft" style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Available badge */}
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

            {/* Name + subtitle */}
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
            <div className="h3 htypewriter" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 15, fontWeight: 700,
              color: "#006494", fontFamily: "'Baloo 2',cursive", marginBottom: 14,
            }}>
              <AutoAwesome sx={{ fontSize: 16 }} />
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
                { icon: <Palette sx={{ fontSize: 14 }} />, label: "Tailwind CSS" },
              ].map(({ icon, label }) => (
                <Pill key={label}>{icon} {label}</Pill>
              ))}
            </div>

            {/* CTA buttons */}
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

          {/* ── Right column: Illustration ── */}
          {/*
            Note: During the SvgIntroTransition, a fixed-position copy of DevIllustration
            slides into this exact slot. Once the transition is "done", this local copy
            becomes visible and takes over seamlessly.
          */}
          <div
            className="hright hright-anim"
            style={{
              flex: "0 0 auto",
              width: "clamp(280px,36vw,460px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <DevIllustration />
          </div>
        </div>
      </section>

      {/* ══ Info Band ══════════════════════════════════════════════════════════ */}
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
          ].map((item) => (
            <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: item.bg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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

      {/* ══ Scroll hint ════════════════════════════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 6, padding: "10px 0", fontSize: 11, color: "#9ab0bc", fontWeight: 700,
        animation: "bounce 2s ease-in-out infinite",
      }}>
        <KeyboardDoubleArrowDown sx={{ fontSize: 14 }} />
        Scroll to explore the 4D pocket
        <KeyboardDoubleArrowDown sx={{ fontSize: 14 }} />
      </div>
    </>
  );
}