/**
 * SvgIntroTransition.tsx
 *
 * Orchestrates the full post-loading intro sequence:
 *
 *  Phase 0 — "intro"   : DevIllustration enters full-screen center, scales up,
 *                         types for ~3.2 s so user sees the code animation.
 *  Phase 1 — "slide"   : Editor slides left into its hero column position
 *                         while the hero section fades in behind it.
 *  Phase 2 — "done"    : Normal HeroSection is fully visible, intro wrapper gone.
 *
 * Usage in App.tsx / page root:
 *
 *   <SvgIntroTransition>
 *     <HeroSection />
 *     {... rest of page ...}
 *   </SvgIntroTransition>
 */

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import DevIllustration from "./DevIllustration";

type Phase = "intro" | "slide" | "done";

interface Props {
    children: ReactNode;
    /** ms to stay in intro (full-screen code typing) before sliding. Default 3400 */
    introDuration?: number;
    /** ms for the slide animation itself. Default 900 */
    slideDuration?: number;
}

export default function SvgIntroTransition({
    children,
    introDuration = 3400,
    slideDuration = 900,
}: Props) {
    const [phase, setPhase] = useState<Phase>("intro");
    const overlayControls = useAnimation();

    useEffect(() => {
        // After introDuration → start slide
        const t1 = setTimeout(() => setPhase("slide"), introDuration);
        // After slide completes → hide overlay entirely
        const t2 = setTimeout(() => setPhase("done"), introDuration + slideDuration + 200);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [introDuration, slideDuration]);

    // Easing curve: cubic-bezier for a snappy, elastic-ish slide
    const EASE = [0.55, 0, 0.15, 1] as const;

    return (
        <>
            {/* ── Underlying page (always mounted, fades in during slide) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "intro" ? 0 : 1 }}
                transition={{ duration: slideDuration / 1000, ease: "easeOut" }}
                style={{
                    pointerEvents: phase === "intro" ? "none" : "auto",
                }}
            >
                {children}
            </motion.div>

            {/* ── Intro overlay ── */}
            <AnimatePresence>
                {phase !== "done" && (
                    <motion.div
                        key="intro-overlay"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 50,
                            pointerEvents: "none",
                            // Light background matching hero gradient during intro
                            background:
                                phase === "intro"
                                    ? "linear-gradient(160deg,#e3f2fb 0%,#c8e9ff 28%,#f0faff 58%,#fffef0 100%)"
                                    : "transparent",
                            transition: `background ${slideDuration}ms ease`,
                        }}
                    >
                        {/* ── SVG wrapper — animated from center to left column ── */}
                        <motion.div
                            initial={{
                                // Start: centered in viewport, large
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
                                    ? {
                                        opacity: 1,
                                        scale: 1,
                                        x: "-50%",
                                        y: "-50%",
                                    }
                                    : {
                                        // Slide phase: move to right-column position of hero
                                        // mirrors `.hright` in HeroSection — right half, vertically centered
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
                                        // Stagger sub-properties for a fluid feel
                                        left: { duration: slideDuration / 1000, ease: EASE },
                                        right: { duration: slideDuration / 1000, ease: EASE },
                                        width: { duration: slideDuration / 1000, ease: EASE },
                                        top: { duration: slideDuration / 1000, ease: EASE },
                                    }
                            }
                            style={{ position: "fixed" }}
                        >
                            {/* Drop shadow ring behind the editor during intro phase */}
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

                        {/* ── "Intro" phase: animated tagline below the editor ── */}
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

                                    {/* Animated dots */}
                                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                                style={{
                                                    display: "inline-block",
                                                    width: 7,
                                                    height: 7,
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