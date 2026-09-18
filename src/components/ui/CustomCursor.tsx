/**
 * CustomCursor — Doraemon-themed arrow/pointer cursor (GSAP Version)
 *
 * Uses actual cursor SVG shapes (not circles):
 *  default  → arrow pointer  (doraemon-blue gradient)
 *  hover    → hand pointer   (doraemon-yellow)
 *  text     → I-beam cursor  (doraemon-blue)
 *  click    → arrow + pulse  (darken on press)
 *
 * A small glowing trail dot follows behind for premium feel.
 */

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

type CursorState = "default" | "hover" | "click" | "text"

// ── SVG cursor shapes ─────────────────────────────────────────────────────────

/** Standard arrow pointer */
const ArrowSVG = ({ pressed }: { pressed: boolean }) => (
  <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={pressed ? "#003d6b" : "#005b8f"} />
        <stop offset="100%" stopColor={pressed ? "#002244" : "#003d6b"} />
      </linearGradient>
      <filter id="arrow-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#005b8f" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Arrow body */}
    <path
      d="M2 2L2 20L7.5 15L11.5 24L14 23L10 14L18 14L2 2Z"
      fill="url(#arrow-grad)"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
      filter="url(#arrow-shadow)"
    />
  </svg>
)

/** Hand / pointer cursor */
const HandSVG = () => (
  <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hand-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <filter id="hand-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#d97706" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Index finger */}
    <path
      d="M9 1C9 1 9 1.5 9 4V13"
      stroke="url(#hand-grad)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Middle finger */}
    <path
      d="M13 4C13 4 13 3 13 5V13"
      stroke="url(#hand-grad)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Ring finger */}
    <path
      d="M16.5 6V13"
      stroke="url(#hand-grad)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Thumb */}
    <path
      d="M6 9V13"
      stroke="url(#hand-grad)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Palm */}
    <path
      d="M6 13C6 13 5 14 5 15.5V19C5 21.5 7 23 9.5 23H13.5C16 23 17.5 21.5 17.5 19V13.5C17.5 12.5 17 12 16.5 12V13"
      fill="url(#hand-grad)"
      stroke="white"
      strokeWidth="1.2"
      filter="url(#hand-shadow)"
    />
  </svg>
)

/** I-beam text cursor */
const IBeamSVG = () => (
  <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="ibeam-shadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#005b8f" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Top serif */}
    <path d="M1 2H9" stroke="#005b8f" strokeWidth="2" strokeLinecap="round" />
    {/* Vertical bar */}
    <path d="M5 2V24" stroke="#005b8f" strokeWidth="2" strokeLinecap="round" filter="url(#ibeam-shadow)" />
    {/* Bottom serif */}
    <path d="M1 24H9" stroke="#005b8f" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const ripplesContainerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<CursorState>("default")
  const [visible, setVisible] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)

  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)
  const trailXTo = useRef<gsap.QuickToFunc | null>(null)
  const trailYTo = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    if (cursorRef.current && trailRef.current) {
      // Create quickTo functions for ultra-performant cursor following
      xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0, ease: "none" })
      yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0, ease: "none" })
      
      trailXTo.current = gsap.quickTo(trailRef.current, "x", { duration: 0.6, ease: "power3.out" })
      trailYTo.current = gsap.quickTo(trailRef.current, "y", { duration: 0.6, ease: "power3.out" })
    }
  }, { scope: cursorRef })

  const onMove = useCallback((e: MouseEvent) => {
    if (xTo.current && yTo.current && trailXTo.current && trailYTo.current) {
      xTo.current(e.clientX)
      yTo.current(e.clientY)
      trailXTo.current(e.clientX)
      trailYTo.current(e.clientY)
    }
    setVisible(true)
  }, [])

  const onLeave = useCallback(() => setVisible(false), [])
  const onEnter = useCallback(() => setVisible(true), [])

  const { contextSafe } = useGSAP({ scope: cursorRef })

  const onDown = contextSafe((e: MouseEvent) => {
    setState("click")
    const id = rippleId.current++
    setRipples(p => [...p, { id, x: e.clientX, y: e.clientY }])
    
    // Auto-remove ripple after animation
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 600)
  })

  const onUp = useCallback(() => setState(s => s === "click" ? "default" : s), [])

  const onOver = useCallback((e: PointerEvent) => {
    const t = e.target as HTMLElement
    const isLink = t.closest("a, button, [role='button'], select, label, [data-cursor='hover']")
    const isText = !isLink && t.closest("p, span, h1, h2, h3, h4, h5, h6, li, [data-cursor='text']")
    if (isLink)   setState("hover")
    else if (isText) setState("text")
    else          setState("default")
  }, [])

  useEffect(() => {
    document.body.style.cursor = "none"
    window.addEventListener("mousemove",  onMove,  { passive: true })
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("mouseenter", onEnter)
    window.addEventListener("mousedown",  onDown)
    window.addEventListener("mouseup",    onUp)
    window.addEventListener("pointerover", onOver)
    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove",  onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("mousedown",  onDown)
      window.removeEventListener("mouseup",    onUp)
      window.removeEventListener("pointerover", onOver)
    }
  }, [onMove, onLeave, onEnter, onDown, onUp, onOver])

  // React to state/visibility changes
  useGSAP(() => {
    if (!cursorRef.current || !trailRef.current || !innerRef.current) return;

    // Visibility
    gsap.to(cursorRef.current, { opacity: visible ? 1 : 0, duration: 0.15 })
    gsap.to(trailRef.current, { opacity: visible ? (state === "text" ? 0 : 0.18) : 0, duration: 0.3 })

    // Cursor animations based on state
    gsap.to(innerRef.current, {
      scale: state === "click" ? 0.88 : 1,
      rotation: state === "hover" ? -10 : 0,
      duration: 0.3,
      ease: "back.out(1.7)",
      overwrite: "auto"
    })

    // Crossfade SVG icons based on state
    if (arrowRef.current && handRef.current && textRef.current) {
      const isArrow = state === "default" || state === "click";
      const isHand = state === "hover";
      const isText = state === "text";

      gsap.to(arrowRef.current, { opacity: isArrow ? 1 : 0, scale: isArrow ? 1 : 0.7, duration: 0.12 });
      gsap.to(handRef.current, { opacity: isHand ? 1 : 0, scale: isHand ? 1 : 0.7, duration: 0.12 });
      gsap.to(textRef.current, { opacity: isText ? 1 : 0, scale: isText ? 1 : 0.7, duration: 0.12 });
    }

  }, [state, visible])

  if (typeof window === "undefined") return null

  // Offset so tip of each cursor SVG aligns to the actual pointer position
  const offsets: Record<CursorState, [number, number]> = {
    default: [1, 1],
    hover:   [4, 1],
    click:   [1, 1],
    text:    [4, 1],
  }
  const [ox, oy] = offsets[state]

  return (
    <>
      {/* ── Click ripples ── */}
      <div ref={ripplesContainerRef}>
        {ripples.map(r => (
          <Ripple key={r.id} x={r.x} y={r.y} />
        ))}
      </div>

      {/* ── Soft glow trail ── */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-9997"
        style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
      >
        <div
          className="rounded-full"
          style={{
            width: state === "hover" ? 36 : 20,
            height: state === "hover" ? 36 : 20,
            background: state === "hover"
              ? "radial-gradient(circle, #fcd34d 0%, transparent 70%)"
              : "radial-gradient(circle, #005b8f 0%, transparent 70%)",
            transition: "width 0.3s, height 0.3s, background 0.3s",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* ── Main cursor SVG ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{ transform: `translate(-${ox}px, -${oy}px)`, opacity: 0 }}
      >
        <div ref={innerRef} style={{ position: "relative" }}>
          <div ref={arrowRef} style={{ position: "absolute", opacity: 0, transform: "scale(0.7)" }}>
            <ArrowSVG pressed={state === "click"} />
          </div>
          <div ref={handRef} style={{ position: "absolute", opacity: 0, transform: "scale(0.7)" }}>
            <HandSVG />
          </div>
          <div ref={textRef} style={{ position: "absolute", opacity: 0, transform: "scale(0.7)" }}>
            <IBeamSVG />
          </div>
        </div>
      </div>
    </>
  )
}

function Ripple({ x, y }: { x: number; y: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, 
      { width: 6, height: 6, opacity: 0.7 },
      { width: 48, height: 48, opacity: 0, duration: 0.55, ease: "power2.out" }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-9998 rounded-full"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)", backgroundColor: "#005b8f" }}
    />
  );
}
