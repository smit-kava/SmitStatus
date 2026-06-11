import { useRef, useEffect, useState } from "react"
import bannerBg from "@/assets/banner_bg.png"
import SpeedController from "./SpeedController"

// ─── Types ────────────────────────────────────────────────────────────────────
interface MilestoneData {
  id: string
  year: string
  title: string
  sub: string
  accent: string
  position: "top" | "bot"
  yNode: number
  icon: React.ReactNode
}

// ─── Milestone Data ───────────────────────────────────────────────────────────
const milestones: MilestoneData[] = [
  {
    id: "ssc",
    year: "March 2019",
    title: "SSC (10th Grade)",
    sub: "General Education",
    accent: "#fcd400",
    position: "top",
    yNode: 160,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <path d="M 0,-15 L 20,-5 L 0,5 L -20,-5 Z" fill="rgba(252,212,0,0.15)" stroke="#fcd400" strokeWidth="1.2" />
        <path d="M -12,-1 v 8 c 0,5 6,7 12,7 c 6,0 12,-2 12,-7 v -8" fill="none" stroke="#fcd400" strokeWidth="1.2" />
        <path d="M 15,-7 v 12" fill="none" stroke="#c00014" strokeWidth="1" />
        <circle cx="15" cy="5" r="2" fill="#c00014" />
      </svg>
    ),
  },
  {
    id: "hsc",
    year: "May 2021",
    title: "HSC (12th Grade)",
    sub: "Science Stream",
    accent: "#c00014",
    position: "bot",
    yNode: 310,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <path d="M 0,-15 L 20,-5 L 0,5 L -20,-5 Z" fill="rgba(192,0,20,0.15)" stroke="#c00014" strokeWidth="1.2" />
        <path d="M -12,-1 v 8 c 0,5 6,7 12,7 c 6,0 12,-2 12,-7 v -8" fill="none" stroke="#c00014" strokeWidth="1.2" />
        <path d="M 15,-7 v 12" fill="none" stroke="#fcd400" strokeWidth="1" />
        <circle cx="15" cy="5" r="2" fill="#fcd400" />
      </svg>
    ),
  },
  {
    id: "bsc",
    year: "2022 – 2024",
    title: "B.Sc. in IT Degree",
    sub: "Charusat University",
    accent: "#00a0e9",
    position: "top",
    yNode: 210,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <rect x="-18" y="-12" width="36" height="24" rx="4" fill="rgba(0,100,148,0.1)" stroke="#00a0e9" strokeWidth="1.2" />
        <line x1="-18" y1="2" x2="18" y2="2" stroke="#00a0e9" strokeWidth="1.2" opacity="0.5" />
        <line x1="-10" y1="-6" x2="-10" y2="2" stroke="#00a0e9" strokeWidth="1.2" />
        <line x1="0" y1="-6" x2="0" y2="2" stroke="#00a0e9" strokeWidth="1.2" />
        <line x1="10" y1="-6" x2="10" y2="2" stroke="#00a0e9" strokeWidth="1.2" />
        <path d="M -22,-12 L 0,-22 L 22,-12 Z" fill="rgba(0,100,148,0.2)" stroke="#00a0e9" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "mca",
    year: "2024 – 2026",
    title: "Master of Comp. Apps",
    sub: "ISTAR College, V.V.Nagar",
    accent: "#c00014",
    position: "bot",
    yNode: 260,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <path d="M -22,-6 L 0,-16 L 22,-6 L 0,4 Z" fill="rgba(192,0,20,0.15)" stroke="#c00014" strokeWidth="1.2" />
        <path d="M -12,-1 v 6 c 0,4 6,6 12,6 c 6,0 12,-2 12,-6 v -6" fill="none" stroke="#c00014" strokeWidth="1.2" />
        <path d="M 22,-6 v 14" fill="none" stroke="#fcd400" strokeWidth="1.2" />
        <rect x="20" y="5" width="4" height="4" fill="#fcd400" />
      </svg>
    ),
  },
  {
    id: "intern",
    year: "2024 – Pres.",
    title: "Software Dev Intern",
    sub: "Etech International",
    accent: "#00d4ff",
    position: "top",
    yNode: 175,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <rect x="-20" y="-15" width="40" height="28" rx="4" fill="rgba(0,212,255,0.08)" stroke="#7dd3fc" strokeWidth="1.2" />
        <line x1="-20" y1="7" x2="20" y2="7" stroke="#7dd3fc" strokeWidth="1.2" />
        <circle cx="0" cy="10" r="1.5" fill="#7dd3fc" />
        <text x="0" y="-1" fontSize="9" fill="#00d4ff" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{"</>"}</text>
      </svg>
    ),
  },
  {
    id: "vumax",
    year: "Present",
    title: "VumaxPro & VHTracks",
    sub: "Oil & Gas Dashboards",
    accent: "#00d4ff",
    position: "bot",
    yNode: 320,
    icon: (
      <svg width="20" height="20" viewBox="-25 -25 50 50">
        <rect x="-22" y="-16" width="44" height="32" rx="4" fill="rgba(0,212,255,0.05)" stroke="#00d4ff" strokeWidth="1.2" />
        <line x1="-16" y1="-10" x2="16" y2="-10" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" />
        <line x1="-16" y1="-2" x2="16" y2="-2" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" />
        <line x1="-16" y1="6" x2="16" y2="6" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5" />
        <path d="M -16,8 L -8,-4 L 0,2 L 8,-12 L 16,-6" fill="none" stroke="#fcd400" strokeWidth="1.5" />
        <circle cx="8" cy="-12" r="2.5" fill="#c00014" />
      </svg>
    ),
  },
]

// ─── Layout constants ─────────────────────────────────────────────────────────
const BANNER_H = 480          // total banner height px
const CARD_W = 180          // card width px
const CARD_H = 100          // card height px
const STEM_LEN = 30           // vertical stem between node and card
const SLOT_W = 260          // horizontal slot per milestone
const LEAD_PAD = 80           // leading padding before first milestone

// Y of node for each milestone
const nodeY = (m: MilestoneData) => m.yNode

// ─── Build the bezier wave path for N milestones (both strips = 2N) ──────────
function buildWavePath(count: number): string {
  const pts = Array.from({ length: count }, (_, i) => ({
    x: LEAD_PAD + i * SLOT_W + SLOT_W / 2,
    y: nodeY(milestones[i % milestones.length]),
  }))

  if (pts.length === 0) return ""

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const cpX = (p0.x + p1.x) / 2
    d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
}

// total strip width for one full set + one repeat
const STRIP_COUNT = milestones.length * 2  // doubled for seamless loop
const TOTAL_SVG_W = LEAD_PAD * 2 + STRIP_COUNT * SLOT_W

const sliderToDuration = (v: number) => Math.round(90 / v)

// ─── Props ────────────────────────────────────────────────────────────────────
interface BannerScrollerProps {
  showImageLayer?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BannerScroller({ showImageLayer = true }: BannerScrollerProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [sliderVal, setSliderVal] = useState<number>(2)
  const scrollDuration = sliderToDuration(sliderVal)

  useEffect(() => {
    trackRef.current?.style.setProperty("--dur", `${scrollDuration}s`)
  }, [scrollDuration])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const pause = () => el.style.setProperty("--banner-play", "paused")
    const resume = () => el.style.setProperty("--banner-play", "running")
    el.addEventListener("mouseenter", pause, { passive: true })
    el.addEventListener("mouseleave", resume, { passive: true })
    return () => {
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resume)
    }
  }, [])

  // Build wave path for doubled strip
  const wavePath = buildWavePath(STRIP_COUNT)

  // Render one card + stem + node for a milestone at its slot index
  const renderMilestone = (m: MilestoneData, slotIdx: number, key: string) => {
    const cx = LEAD_PAD + slotIdx * SLOT_W + SLOT_W / 2   // centre X of slot
    const ny = nodeY(m)                                     // node Y on wave
    const isTop = m.position === "top"

    // Card top-left
    const cardX = cx - CARD_W / 2
    const cardY = isTop
      ? ny - STEM_LEN - CARD_H    // card above node
      : ny + STEM_LEN              // card below node

    // Stem line
    const stemY1 = isTop ? ny - STEM_LEN : ny
    const stemY2 = isTop ? ny : ny + STEM_LEN

    return (
      <g key={key}>
        {/* Vertical stem */}
        <line
          x1={cx} y1={stemY1}
          x2={cx} y2={stemY2}
          stroke={m.accent}
          strokeWidth="1.2"
          strokeDasharray="3 2"
          opacity="0.7"
        />

        {/* Node dot on the wave */}
        <circle
          cx={cx} cy={ny} r="5.5"
          fill={m.accent}
          stroke="#000d1a"
          strokeWidth="2.5"
        />
        <circle cx={cx} cy={ny} r="2.5" fill="#000d1a" />

        {/* Card — foreignObject for rich HTML */}
        <foreignObject x={cardX} y={cardY} width={CARD_W} height={CARD_H}>
          <div
            style={{
              width: CARD_W,
              height: CARD_H,
              background: "rgba(0,22,46,0.88)",
              border: `0.5px solid ${m.accent}44`,
              borderTop: isTop ? "none" : `2px solid ${m.accent}`,
              borderBottom: isTop ? `2px solid ${m.accent}` : "none",
              borderRadius: 9,
              padding: "10px 12px",
              boxSizing: "border-box",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            <div style={{ fontSize: 9, color: m.accent, letterSpacing: "1px", marginBottom: 4, opacity: 0.9 }}>
              {m.year}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              {m.icon}
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
                {m.title}
              </span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.48)", lineHeight: 1.3 }}>
              {m.sub}
            </div>
          </div>
        </foreignObject>
      </g>
    )
  }

  // Render both strips (doubled for seamless loop)
  const allMilestones = () => {
    const items: React.ReactNode[] = []
    for (let rep = 0; rep < 2; rep++) {
      milestones.forEach((m, i) => {
        const slotIdx = rep * milestones.length + i
        items.push(renderMilestone(m, slotIdx, `${m.id}-${rep}`))
      })
    }
    return items
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" />

      <div ref={wrapRef} className="bs-root" aria-hidden="true">

        {/* bg image */}
        {showImageLayer && (
          <img src={bannerBg} alt="" draggable={false} className="banner-image-static" />
        )}

        {/* Scrolling SVG track */}
        <div
          ref={trackRef}
          className="bs-track scrolling"
          style={{ "--dur": `${scrollDuration}s` } as React.CSSProperties}
        >
          <svg
            width={TOTAL_SVG_W}
            height={BANNER_H}
            viewBox={`0 0 ${TOTAL_SVG_W} ${BANNER_H}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", flexShrink: 0 }}
          >
            <defs>
              <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fcd400" stopOpacity="0.9" />
                <stop offset="20%" stopColor="#c00014" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#00a0e9" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#c00014" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.9" />
              </linearGradient>
              {/* Glow filter for the wave line */}
              <filter id="wave-glow" x="-10%" y="-200%" width="120%" height="500%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint shadow line behind wave */}
            <path
              d={wavePath}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Main wave line */}
            <path
              d={wavePath}
              fill="none"
              stroke="url(#wave-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#wave-glow)"
            />

            {/* All milestone cards + stems + nodes */}
            {allMilestones()}
          </svg>
        </div>

        {/* Edge vignette */}
        <div className="bs-vignette" />

        {/* Standalone Speed Controller overlay */}
        <SpeedController value={sliderVal} onChange={setSliderVal} />

      </div>

    </>
  )
}
