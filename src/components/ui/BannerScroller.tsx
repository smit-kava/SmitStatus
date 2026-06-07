import { useRef, useEffect } from "react"
import bannerBg from "@/assets/banner_bg.png"

// ─── SVG Sub-components (all static — no SMIL, no filters) ───────────────────

const CircuitBoard = ({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) => (
  <g transform={`translate(${x},${y})`} opacity={opacity}>
    <rect width="80" height="56" rx="6" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />
    <circle cx="10" cy="10" r="3" fill="#00d4ff" opacity="0.7" />
    <circle cx="70" cy="10" r="3" fill="#00a0e9" opacity="0.7" />
    <circle cx="10" cy="46" r="3" fill="#7dd3fc" opacity="0.7" />
    <circle cx="70" cy="46" r="3" fill="#00d4ff" opacity="0.7" />
    <line x1="13" y1="10" x2="35" y2="10" stroke="#00d4ff" strokeWidth="0.8" opacity="0.5" />
    <line x1="35" y1="10" x2="35" y2="28" stroke="#00d4ff" strokeWidth="0.8" opacity="0.5" />
    <line x1="35" y1="28" x2="67" y2="28" stroke="#00a0e9" strokeWidth="0.8" opacity="0.5" />
    <line x1="13" y1="46" x2="45" y2="46" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.5" />
    <line x1="45" y1="46" x2="45" y2="28" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.5" />
    <rect x="30" y="23" width="10" height="10" rx="2" fill="#001e30" stroke="#00d4ff" strokeWidth="0.8" opacity="0.8" />
    <circle cx="40" cy="10" r="1.5" fill="#00d4ff" opacity="0.9" />
    <circle cx="50" cy="10" r="1.5" fill="#00d4ff" opacity="0.9" />
    <circle cx="60" cy="10" r="1.5" fill="#00d4ff" opacity="0.9" />
  </g>
)

const ReactAtom = ({ x, y, size = 1 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <circle cx="0" cy="0" r="6" fill="#61DAFB" opacity="0.9" />
    <ellipse cx="0" cy="0" rx="28" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" />
    <ellipse cx="0" cy="0" rx="28" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" transform="rotate(60)" />
    <ellipse cx="0" cy="0" rx="28" ry="11" fill="none" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" transform="rotate(120)" />
  </g>
)

const GlassCard = ({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={w} height={h} rx="10" fill="rgba(0,50,100,0.35)" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
    <rect width={w} height="1" rx="1" fill="rgba(255,255,255,0.2)" />
    <text x="12" y="18" fontSize="9" fill="rgba(0,212,255,0.8)" fontFamily="monospace">{label}</text>
    <line x1="12" y1="24" x2={w - 12} y2="24" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" />
    <rect x="12" y="30" width={w * 0.6} height="5" rx="2.5" fill="rgba(0,160,233,0.3)" />
    <rect x="12" y="40" width={w * 0.4} height="5" rx="2.5" fill="rgba(0,212,255,0.2)" />
    <rect x="12" y="50" width={w * 0.75} height="5" rx="2.5" fill="rgba(125,211,252,0.2)" />
  </g>
)

// Holographic screen — scan line removed (was SMIL-animated)
const HolographicScreen = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect width="120" height="80" rx="8" fill="rgba(0,30,60,0.4)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
    <rect x="8" y="8" width="104" height="64" rx="5" fill="rgba(0,100,148,0.1)" />
    <rect x="14" y="14" width="40" height="28" rx="3" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="0.8" />
    <rect x="60" y="14" width="52" height="12" rx="2" fill="rgba(0,160,233,0.2)" />
    <rect x="60" y="30" width="38" height="5" rx="2" fill="rgba(125,211,252,0.15)" />
    <rect x="14" y="48" width="98" height="5" rx="2" fill="rgba(0,212,255,0.12)" />
    <rect x="14" y="57" width="70" height="5" rx="2" fill="rgba(0,160,233,0.1)" />
    {/* Static scan line accent */}
    <rect x="0" y="40" width="120" height="1.5" rx="0.75" fill="rgba(0,212,255,0.1)" />
  </g>
)

const LaptopIcon = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x="10" y="0" width="80" height="52" rx="5" fill="rgba(0,20,40,0.6)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
    <rect x="15" y="5" width="70" height="42" rx="3" fill="rgba(0,60,100,0.4)" />
    <rect x="20" y="10" width="60" height="4" rx="2" fill="rgba(0,212,255,0.3)" />
    <rect x="20" y="18" width="45" height="3" rx="1.5" fill="rgba(125,211,252,0.2)" />
    <rect x="20" y="25" width="55" height="3" rx="1.5" fill="rgba(0,160,233,0.2)" />
    <rect x="20" y="32" width="35" height="3" rx="1.5" fill="rgba(125,211,252,0.15)" />
    <rect x="0" y="52" width="100" height="5" rx="2" fill="rgba(0,30,60,0.7)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8" />
    <rect x="35" y="54" width="30" height="3" rx="1.5" fill="rgba(0,212,255,0.2)" />
  </g>
)

const MobileApp = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect width="40" height="72" rx="8" fill="rgba(0,20,50,0.6)" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
    <rect x="4" y="10" width="32" height="52" rx="4" fill="rgba(0,50,100,0.4)" />
    <rect x="14" y="5" width="12" height="2" rx="1" fill="rgba(0,212,255,0.4)" />
    <rect x="8" y="15" width="24" height="16" rx="3" fill="rgba(0,100,148,0.3)" />
    <rect x="8" y="35" width="11" height="11" rx="2" fill="rgba(0,160,233,0.2)" />
    <rect x="21" y="35" width="11" height="11" rx="2" fill="rgba(0,212,255,0.2)" />
    <rect x="8" y="50" width="24" height="4" rx="2" fill="rgba(125,211,252,0.15)" />
    <circle cx="20" cy="67" r="3" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="0.8" />
  </g>
)

const CloudNode = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx="30" cy="22" rx="30" ry="18" fill="rgba(0,50,100,0.3)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8" />
    <ellipse cx="15" cy="28" rx="18" ry="12" fill="rgba(0,30,70,0.25)" stroke="rgba(0,160,233,0.25)" strokeWidth="0.6" />
    <ellipse cx="45" cy="28" rx="18" ry="12" fill="rgba(0,30,70,0.25)" stroke="rgba(0,160,233,0.25)" strokeWidth="0.6" />
    <circle cx="30" cy="20" r="3" fill="#00d4ff" opacity="0.8" />
    <circle cx="10" cy="35" r="2" fill="#00a0e9" opacity="0.7" />
    <circle cx="50" cy="35" r="2" fill="#7dd3fc" opacity="0.7" />
    <line x1="30" y1="23" x2="10" y2="33" stroke="rgba(0,212,255,0.4)" strokeWidth="0.7" strokeDasharray="2,2" />
    <line x1="30" y1="23" x2="50" y2="33" stroke="rgba(0,212,255,0.4)" strokeWidth="0.7" strokeDasharray="2,2" />
  </g>
)

const NeuralNet = ({ x, y }: { x: number; y: number }) => {
  const nodes: [number, number][] = [
    [0, 20], [0, 50], [0, 80],
    [40, 10], [40, 40], [40, 70], [40, 95],
    [80, 25], [80, 55], [80, 80],
  ]
  const edges = [
    [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6],
    [3, 7], [3, 8], [4, 7], [4, 8], [5, 8], [5, 9], [6, 8], [6, 9],
  ]
  return (
    <g transform={`translate(${x},${y})`} opacity="0.7">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="rgba(0,212,255,0.25)" strokeWidth="0.8" />
      ))}
      {nodes.map(([nx, ny], i) => (
        <circle key={i} cx={nx} cy={ny} r="4" fill="rgba(0,30,60,0.8)"
          stroke={i < 3 ? "#00d4ff" : i < 7 ? "#00a0e9" : "#7dd3fc"} strokeWidth="1.2" />
      ))}
    </g>
  )
}

const CodeSymbol = ({ x, y, symbol, color = "#00d4ff", size = 18 }:
  { x: number; y: number; symbol: string; color?: string; size?: number }) => (
  <text x={x} y={y} fontSize={size} fill={color} fontFamily="monospace" opacity="0.6" fontWeight="bold">{symbol}</text>
)

// Static dot — no SMIL animate
const Dot = ({ x, y, r = 2, color = "#00d4ff", op = 0.5 }:
  { x: number; y: number; r?: number; color?: string; op?: number }) => (
  <circle cx={x} cy={y} r={r} fill={color} opacity={op} />
)

const HexGrid = ({ x, y }: { x: number; y: number }) => {
  const hexPath = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
    })
    return `M${pts.join("L")}Z`
  }
  const hexes = [[0, 0], [26, 0], [13, 22], [39, 22], [26, 44], [0, 44]]
  return (
    <g transform={`translate(${x},${y})`} opacity="0.35">
      {hexes.map(([hx, hy], i) => (
        <path key={i} d={hexPath(hx + 13, hy + 13, 12)} fill="none"
          stroke={i % 2 === 0 ? "#00d4ff" : "#00a0e9"} strokeWidth="0.7" />
      ))}
    </g>
  )
}

// Static glow orb — no SMIL animate
const GlowOrb = ({ x, y, r, color }: { x: number; y: number; r: number; color: string }) => (
  <circle cx={x} cy={y} r={r} fill={color} opacity="0.09" />
)

// AI Robot — no SVG filter applied
const AIRobot = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`} opacity="0.7">
    <rect x="20" y="10" width="60" height="55" rx="12" fill="rgba(0,40,80,0.5)" stroke="#00d4ff" strokeWidth="1.2" />
    <rect x="30" y="22" width="18" height="12" rx="4" fill="rgba(0,212,255,0.3)" />
    <rect x="52" y="22" width="18" height="12" rx="4" fill="rgba(0,212,255,0.3)" />
    <rect x="35" y="40" width="30" height="6" rx="3" fill="rgba(0,160,233,0.35)" />
    <line x1="10" y1="30" x2="20" y2="30" stroke="#00d4ff" strokeWidth="1" />
    <line x1="80" y1="30" x2="90" y2="30" stroke="#00d4ff" strokeWidth="1" />
    <circle cx="50" cy="72" r="4" fill="#00d4ff" opacity="0.6" />
    <line x1="50" y1="76" x2="50" y2="90" stroke="#00d4ff" strokeWidth="1" />
    <line x1="30" y1="88" x2="70" y2="88" stroke="#00d4ff" strokeWidth="1" />
  </g>
)

// ─── Strip dimensions ─────────────────────────────────────────────────────────
const STRIP_W = 2800
const STRIP_H = 260

const BannerSVGStrip = () => (
  <svg
    width={STRIP_W}
    height={STRIP_H}
    viewBox={`0 0 ${STRIP_W} ${STRIP_H}`}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: "block", flexShrink: 0 }}
  >
    <defs>
      <linearGradient id="bs-bg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#000d1a" />
        <stop offset="30%"  stopColor="#001e3a" />
        <stop offset="50%"  stopColor="#00244d" />
        <stop offset="70%"  stopColor="#001e3a" />
        <stop offset="100%" stopColor="#000d1a" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width={STRIP_W} height={STRIP_H} fill="url(#bs-bg)" />

    {/* Static ambient orbs */}
    <GlowOrb x={300}  y={130} r={120} color="#0066cc" />
    <GlowOrb x={800}  y={100} r={90}  color="#00d4ff" />
    <GlowOrb x={1300} y={150} r={110} color="#006494" />
    <GlowOrb x={1800} y={110} r={95}  color="#00d4ff" />
    <GlowOrb x={2300} y={130} r={105} color="#0066cc" />
    <GlowOrb x={2700} y={90}  r={85}  color="#00d4ff" />

    {/* Subtle grid */}
    {[50, 130, 210].map((y, i) => (
      <line key={i} x1="0" y1={y} x2={STRIP_W} y2={y}
        stroke="rgba(0,212,255,0.05)" strokeWidth="0.6" strokeDasharray="8,16" />
    ))}

    {/* ── Section 1: Circuit cluster ── */}
    <CircuitBoard x={30}  y={20}  />
    <CircuitBoard x={30}  y={170} opacity={0.5} />
    <HexGrid x={125} y={60} />
    <Dot x={160} y={180} r={2.5} color="#00d4ff" op={0.55} />
    <Dot x={175} y={200} r={1.5} color="#7dd3fc" op={0.45} />
    <Dot x={145} y={215} r={2}   color="#00a0e9" op={0.5}  />

    {/* ── Section 2: React Atom + Glass card ── */}
    <ReactAtom x={250} y={130} size={1.2} />
    <GlassCard x={310} y={30}  w={120} h={75} label="<Component />" />
    <CodeSymbol x={310} y={170} symbol="{}"  color="#61DAFB" size={28} />
    <CodeSymbol x={360} y={200} symbol="=>"  color="#00d4ff" size={20} />
    <Dot x={290} y={220} r={2}   color="#61DAFB" op={0.5} />
    <Dot x={440} y={40}  r={1.5} color="#00d4ff" op={0.4} />

    {/* ── Section 3: Holographic screens + Neural net ── */}
    <HolographicScreen x={480} y={30}  />
    <HolographicScreen x={620} y={150} />
    <CodeSymbol x={490} y={135} symbol="TS" color="#3178c6" size={22} />
    <CodeSymbol x={535} y={165} symbol="<>" color="#00a0e9" size={18} />
    <NeuralNet x={720} y={80} />
    <Dot x={780} y={240} r={2.5} color="#3178c6" op={0.5} />

    {/* ── Section 4: Laptops ── */}
    <LaptopIcon x={820} y={60}  />
    <LaptopIcon x={960} y={150} />
    <HexGrid x={870} y={150} />
    <CodeSymbol x={840} y={200} symbol="npm" color="#cc3534" size={16} />
    <CodeSymbol x={890} y={230} symbol="git" color="#f05033" size={16} />
    <Dot x={830} y={240} r={1.5} color="#00d4ff" op={0.4} />

    {/* ── Section 5: Cloud nodes ── */}
    <CloudNode x={1050} y={40}  />
    <CloudNode x={1180} y={160} />
    <line x1="1080" y1="90" x2="1200" y2="165" stroke="rgba(0,212,255,0.2)" strokeWidth="0.8" strokeDasharray="4,4" />
    <circle cx="1160" cy="125" r="5" fill="#00d4ff" opacity="0.6" />
    <CodeSymbol x={1090} y={130} symbol="⬡"        color="#00d4ff" size={14} />
    <GlassCard  x={1280} y={40}  w={110} h={68} label="useEffect()" />
    <Dot x={1260} y={220} r={2} color="#00a0e9" op={0.5} />

    {/* ── Section 6: Mobile + Code symbols ── */}
    <MobileApp  x={1420} y={60}  />
    <MobileApp  x={1510} y={170} />
    <CodeSymbol x={1475} y={60}  symbol="[ ]"   color="#00d4ff" size={20} />
    <CodeSymbol x={1475} y={90}  symbol="const" color="#7dd3fc" size={16} />
    <CircuitBoard x={1570} y={20}  />
    <NeuralNet    x={1580} y={145} />
    <Dot x={1550} y={240} r={1.5} color="#61DAFB" op={0.45} />
    <Dot x={1620} y={30}  r={2}   color="#00d4ff" op={0.5}  />

    {/* ── Section 7: AI Robot ── */}
    <AIRobot x={1700} y={50} />
    <HolographicScreen x={1820} y={40}  />
    <GlassCard         x={1820} y={150} w={115} h={70} label="async/await" />
    <Dot x={1800} y={245} r={2.5} color="#00d4ff" op={0.55} />
    <Dot x={1940} y={20}  r={1.5} color="#7dd3fc" op={0.4}  />

    {/* ── Section 8: Dot field + hex ── */}
    <HexGrid x={1970} y={30}  />
    <HexGrid x={2050} y={150} />
    {Array.from({ length: 18 }, (_, i) => (
      <Dot key={i}
        x={1980 + (i * 40) % 220}
        y={30  + (i * 37) % 200}
        r={1   + (i % 3) * 0.8}
        color={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#00a0e9" : "#7dd3fc"}
        op={0.45} />
    ))}
    <ReactAtom  x={2150} y={120} size={0.9} />
    <CodeSymbol x={2100} y={230} symbol="() =>" color="#61DAFB" size={18} />

    {/* ── Section 9: Glass cards + circuits ── */}
    <GlassCard    x={2220} y={25}  w={130} h={80} label="useState()" />
    <GlassCard    x={2220} y={155} w={100} h={60} label="Router.tsx" />
    <CircuitBoard x={2380} y={30}  />
    <CircuitBoard x={2400} y={175} opacity={0.6} />
    <CodeSymbol   x={2360} y={140} symbol="{...}" color="#00d4ff" size={20} />
    <Dot x={2450} y={80} r={2} color="#00d4ff" op={0.5} />

    {/* ── Section 10: Cloud + neural + laptop finale ── */}
    <CloudNode    x={2520} y={50}  />
    <NeuralNet    x={2620} y={80}  />
    <LaptopIcon   x={2680} y={160} />
    <HexGrid      x={2590} y={180} />
    <CodeSymbol   x={2540} y={170} symbol="API"  color="#00d4ff" size={16} />
    <CodeSymbol   x={2540} y={195} symbol="REST" color="#7dd3fc" size={14} />
    <Dot x={2700} y={30}  r={2.5} color="#61DAFB" op={0.5} />
    <Dot x={2760} y={200} r={1.5} color="#00d4ff" op={0.4} />
    <CircuitBoard x={2710} y={10}  opacity={0.7} />

    {/* Soft vertical light beams */}
    {[200, 700, 1200, 1700, 2200, 2700].map((lx, i) => (
      <rect key={i} x={lx - 15} y="0" width="30" height={STRIP_H}
        fill="rgba(0,212,255,0.03)" />
    ))}
  </svg>
)

// ─── Main Component ───────────────────────────────────────────────────────────
interface BannerScrollerProps {
  height?: number
  duration?: number
  showImageLayer?: boolean
}

export default function BannerScroller({
  height = 260,
  duration = 40,
  showImageLayer = true,
}: BannerScrollerProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  // Pause on hover — passive listeners, no layout cost
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const pause  = () => el.style.setProperty("--banner-play", "paused")
    const resume = () => el.style.setProperty("--banner-play", "running")
    el.addEventListener("mouseenter", pause,  { passive: true })
    el.addEventListener("mouseleave", resume, { passive: true })
    return () => {
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resume)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="banner-scroller-root"
      style={{ height, "--banner-duration": `${duration}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Image base layer — static, no animation */}
      {showImageLayer && (
        <img
          src={bannerBg}
          alt=""
          draggable={false}
          className="banner-image-static"
        />
      )}

      {/* Single animated SVG marquee track */}
      <div className="banner-svg-track">
        <BannerSVGStrip />
        <BannerSVGStrip />
      </div>

      {/* Edge vignette */}
      <div className="banner-vignette" />
    </div>
  )
}
