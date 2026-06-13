/**
 * SvgIntroTransition.tsx
 *
 * Orchestrates the full post-loading intro sequence:
 *
 *  Phase 0 — "waiting" : Pre-mounted but frozen (loading screen covers us)
 *  Phase 1 — "intro"   : DevIllustration enters full-screen center, code types
 *  Phase 2 — "slide"   : Editor slides right into hero column position
 *  Phase 3 — "done"    : Overlay gone, HeroSection fully visible
 *
 * Props:
 *   ready         — fires when loading screen is done; starts the timer
 *   introDuration — ms to stay in intro phase (default 1800)
 *   slideDuration — ms for the slide animation (default 650)
 */

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DevIllustration from "./DevIllustration";

type Phase = "waiting" | "intro" | "slide" | "done";

interface Props {
    children: ReactNode;
    /** Set to true when loading screen finishes — starts the intro timer */
    ready?: boolean;
    /** ms to stay in intro (full-screen code typing) before sliding. Default 1800 */
    introDuration?: number;
    /** ms for the slide animation itself. Default 650 */
    slideDuration?: number;
}

export default function SvgIntroTransition({
    children,
    ready = false,
    introDuration = 1800,
    slideDuration = 650,
}: Props) {
    const [phase, setPhase] = useState<Phase>("waiting");

    useEffect(() => {
        if (!ready) return;
        // Start intro and hide navbar during the entire animation sequence
        setPhase("intro");
        document.documentElement.classList.add("app-intro");

        const t1 = setTimeout(() => setPhase("slide"), introDuration);
        const t2 = setTimeout(() => {
            setPhase("done");
            document.documentElement.classList.remove("app-intro"); // navbar appears now
        }, introDuration + slideDuration + 200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            document.documentElement.classList.remove("app-intro");
        };
    }, [ready, introDuration, slideDuration]);

    // Easing curve: cubic-bezier for a snappy, elastic-ish slide
    const EASE = [0.55, 0, 0.15, 1] as const;

    // Page content fades in only during "slide" → "done"
    const pageVisible = phase === "slide" || phase === "done";
    const showOverlay  = phase === "intro" || phase === "slide";

    return (
        <>
            {/* ── Underlying page — fades in during slide phase ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: pageVisible ? 1 : 0 }}
                transition={{ duration: slideDuration / 1000, ease: "easeOut" }}
                style={{ pointerEvents: pageVisible ? "auto" : "none" }}
            >
                {children}
            </motion.div>

            {/* ── Intro overlay ── */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="intro-overlay"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 50,
                            pointerEvents: "none",
                            // Hero gradient background — seamlessly matches the section beneath
                            background:
                                phase === "intro"
                                    ? "linear-gradient(160deg,#e3f2fb 0%,#c8e9ff 28%,#f0faff 58%,#fffef0 100%)"
                                    : "transparent",
                            transition: `background ${slideDuration}ms ease`,
                        }}
                    >
                        {/* ── Code editor — animates from center → hero right column ── */}
                        <motion.div
                            initial={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                x: "-50%",
                                y: "-50%",
                                width: "min(520px, 90vw)",
                                scale: 1.05,
                                opacity: 0,
                            }}
                            animate={
                                phase === "intro"
                                    ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
                                    : {
                                          // Slide to right column of HeroSection
                                          top: "50%",
                                          left: "auto",
                                          right: "calc((100vw - min(1120px, 100vw)) / 2 + 24px)",
                                          x: "0%",
                                          y: "-50%",
                                          width: "clamp(280px, 36vw, 460px)",
                                          scale: 1,
                                          opacity: 1,
                                      }
                            }
                            transition={
                                phase === "intro"
                                    ? { duration: 0.55, ease: "easeOut" }
                                    : {
                                          duration: slideDuration / 1000,
                                          ease: EASE,
                                          left:  { duration: slideDuration / 1000, ease: EASE },
                                          right: { duration: slideDuration / 1000, ease: EASE },
                                          width: { duration: slideDuration / 1000, ease: EASE },
                                          top:   { duration: slideDuration / 1000, ease: EASE },
                                      }
                            }
                            style={{ position: "fixed" }}
                        >
                            {/* Glow ring behind editor during intro */}
                            {phase === "intro" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        position: "absolute",
                                        inset: -20,
                                        borderRadius: 24,
                                        background: "rgba(0,100,148,0.06)",
                                        filter: "blur(24px)",
                                        zIndex: -1,
                                    }}
                                />
                            )}
                            <DevIllustration />
                        </motion.div>

                        {/* ── Tagline + dots beneath editor during intro ── */}
                        <AnimatePresence>
                            {phase === "intro" && (
                                <motion.div
                                    key="tagline"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    style={{
                                        position: "fixed",
                                        bottom: "12%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        textAlign: "center",
                                        fontFamily: "'Baloo 2', cursive",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <p style={{
                                        fontSize: "clamp(13px, 2vw, 16px)",
                                        fontWeight: 700,
                                        color: "#006494",
                                        letterSpacing: "0.06em",
                                        opacity: 0.75,
                                    }}>
                                        Loading Smit's Universe…
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                                style={{
                                                    display: "inline-block",
                                                    width: 7, height: 7,
                                                    borderRadius: "50%",
                                                    background: "#006494",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}