/**
 * CustomCursor — Doraemon-themed arrow/pointer cursor
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
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

type CursorState = "default" | "hover" | "click" | "text"

const TRAIL_SPRING = { damping: 28, stiffness: 260, mass: 0.6 }

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
  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)

  // Soft trail follows cursor
  const trailX = useSpring(cursorX, TRAIL_SPRING)
  const trailY = useSpring(cursorY, TRAIL_SPRING)

  const [state, setState] = useState<CursorState>("default")
  const [visible, setVisible] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)

  const onMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    setVisible(true)
  }, [cursorX, cursorY])

  const onLeave = useCallback(() => setVisible(false), [])
  const onEnter = useCallback(() => setVisible(true), [])

  const onDown = useCallback((e: MouseEvent) => {
    setState("click")
    const id = rippleId.current++
    setRipples(p => [...p, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 600)
  }, [])

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
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="fixed pointer-events-none z-9998"
            style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 6, height: 6, opacity: 0.7, borderRadius: "50%", backgroundColor: "#005b8f" }}
            animate={{ width: 48, height: 48, opacity: 0, borderRadius: "50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* ── Soft glow trail ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9997"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? (state === "text" ? 0 : 0.18) : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
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
      </motion.div>

      {/* ── Main cursor SVG ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{ x: cursorX, y: cursorY, translateX: `-${ox}px`, translateY: `-${oy}px` }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: state === "click" ? 0.88 : 1,
          rotate: state === "hover" ? -10 : 0,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale:   { type: "spring", stiffness: 500, damping: 22 },
          rotate:  { type: "spring", stiffness: 400, damping: 20 },
        }}
      >
        <AnimatePresence mode="wait">
          {(state === "default" || state === "click") && (
            <motion.div
              key="arrow"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              <ArrowSVG pressed={state === "click"} />
            </motion.div>
          )}
          {state === "hover" && (
            <motion.div
              key="hand"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              <HandSVG />
            </motion.div>
          )}
          {state === "text" && (
            <motion.div
              key="ibeam"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              <IBeamSVG />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
