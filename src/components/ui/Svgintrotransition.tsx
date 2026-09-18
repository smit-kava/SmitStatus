/**
 * SvgIntroTransition.tsx
 * GSAP Version
 *
 * Orchestrates the full post-loading intro sequence:
 *
 *  Phase 0 — "waiting" : Pre-mounted but frozen (loading screen covers us)
 *  Phase 1 — "intro"   : DevIllustration enters full-screen center, code types
 *  Phase 2 — "slide"   : Editor slides right into hero column position
 *  Phase 3 — "done"    : Overlay gone, HeroSection fully visible
 */

import { useState, useEffect, type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DevIllustration from "./DevIllustration";
import { GSAPPresence } from "./GSAPPresence";

gsap.registerPlugin(useGSAP);

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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    // Start intro and hide navbar during the entire animation sequence
    setPhase("intro");
    document.documentElement.classList.add("app-intro");

    const t1 = setTimeout(() => setPhase("slide"), introDuration);
    const t2 = setTimeout(
      () => {
        setPhase("done");
        document.documentElement.classList.remove("app-intro"); // navbar appears now
      },
      introDuration + slideDuration + 200
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.classList.remove("app-intro");
    };
  }, [ready, introDuration, slideDuration]);

  const pageVisible = phase === "slide" || phase === "done";
  const showOverlay = phase === "intro" || phase === "slide";

  useGSAP(() => {
    // Page fade-in
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        opacity: pageVisible ? 1 : 0,
        duration: slideDuration / 1000,
        ease: "power2.out",
      });
      pageRef.current.style.pointerEvents = pageVisible ? "auto" : "none";
    }

    if (editorRef.current) {
      if (phase === "intro") {
        gsap.to(editorRef.current, {
          opacity: 1, 
          scale: 1, 
          xPercent: -50, 
          yPercent: -50,
          top: "50%", 
          left: "50%", 
          right: "auto",
          width: "min(520px, 90vw)",
          duration: 0.55, 
          ease: "power2.out",
          overwrite: "auto"
        });
      } else if (phase === "slide") {
        // Easing curve equivalent to [0.55, 0, 0.15, 1] is roughly power3.inOut
        gsap.to(editorRef.current, {
          top: "50%",
          left: "auto",
          right: "calc((100vw - min(1120px, 100vw)) / 2 + 24px)",
          xPercent: 0,
          yPercent: -50,
          width: "clamp(280px, 36vw, 460px)",
          scale: 1,
          opacity: 1,
          duration: slideDuration / 1000,
          ease: "power3.inOut",
          overwrite: "auto"
        });
      }
    }
  }, [phase, slideDuration]);

  return (
    <div ref={containerRef}>
      {/* ── Underlying page — fades in during slide phase ── */}
      <div ref={pageRef} style={{ opacity: 0, pointerEvents: "none" }}>
        {children}
      </div>

      {/* ── Intro overlay ── */}
      <GSAPPresence
        isPresent={showOverlay}
        exitAnimation={(el) => gsap.to(el, { opacity: 0, duration: 0.3, delay: 0.1 })}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          background: phase === "intro"
            ? "linear-gradient(160deg,#e3f2fb 0%,#c8e9ff 28%,#f0faff 58%,#fffef0 100%)"
            : "transparent",
          transition: `background ${slideDuration}ms ease`,
        }}
      >
        {showOverlay && (
          <>
            {/* ── Code editor — animates from center → hero right column ── */}
            <div
              ref={editorRef}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1.05)",
                width: "min(520px, 90vw)",
                opacity: 0,
              }}
            >
              {/* Glow ring behind editor during intro */}
              <GSAPPresence
                isPresent={phase === "intro"}
                enterAnimation={el => gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 })}
                exitAnimation={el => gsap.to(el, { opacity: 0, duration: 0.3 })}
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: 24,
                  background: "rgba(0,100,148,0.06)",
                  filter: "blur(24px)",
                  zIndex: -1,
                }}
              >
                {phase === "intro" && <div />}
              </GSAPPresence>
              <DevIllustration />
            </div>

            {/* ── Tagline + dots beneath editor during intro ── */}
            <GSAPPresence
              isPresent={phase === "intro"}
              enterAnimation={el => gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 })}
              exitAnimation={el => gsap.to(el, { opacity: 0, y: -8, duration: 0.3 })}
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
              {phase === "intro" && (
                <div>
                  <p
                    style={{
                      fontSize: "clamp(13px, 2vw, 16px)",
                      fontWeight: 700,
                      color: "#006494",
                      letterSpacing: "0.06em",
                      opacity: 0.75,
                    }}
                  >
                    Loading Smit's Universe…
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <Dot key={i} delay={i * 0.2} />
                    ))}
                  </div>
                </div>
              )}
            </GSAPPresence>
          </>
        )}
      </GSAPPresence>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1.5,
      opacity: 1,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      delay,
      ease: "power1.inOut"
    });
  }, [delay]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#006494",
        opacity: 0.4,
      }}
    />
  );
}
