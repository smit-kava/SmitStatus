"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/sections";
import { BannerScroller, LoadingScreen } from "@/components/ui";
import SvgIntroTransition from "@/components/ui/Svgintrotransition";
import SectionReveal from "@/layout/SectionReveal";

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);

  // Lock scroll + signal loading state to other components (e.g. Navbar)
  useEffect(() => {
    if (!loadingDone) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("app-loading");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("app-loading");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("app-loading");
    };
  }, [loadingDone]);

  return (
    <>
      {/*
       * ── ARCHITECTURE ─────────────────────────────────────────────────────
       *
       * Both layers are mounted from the start:
       *
       *  [Layer 1 — z:9999] LoadingScreen  ← covers everything
       *  [Layer 2 — z:50  ] SvgIntroTransition (waiting) + page content
       *
       * When loading completes:
       *   1. LoadingScreen fades out  (0.5 s)
       *   2. SvgIntroTransition.ready=true → code editor appears center screen
       *   3. After 1.8 s → editor slides to hero right column
       *   4. HeroSection fades in underneath
       * ────────────────────────────────────────────────────────────────────
       */}

      {/* ── Layer 2: SVG intro + page (always mounted, starts frozen) ── */}
      <SvgIntroTransition ready={loadingDone} introDuration={1800} slideDuration={700}>
        <main className="flex flex-col w-full">
          <SectionReveal>
            <HeroSection />
          </SectionReveal>
          <SectionReveal>
            <SkillsSection />
          </SectionReveal>
          <SectionReveal>
            <ProjectsSection />
          </SectionReveal>
          <SectionReveal>
            <BannerScroller showImageLayer={true} />
          </SectionReveal>
          <SectionReveal>
            <ExperienceSection />
          </SectionReveal>
          <SectionReveal>
            <ContactSection />
          </SectionReveal>
        </main>
      </SvgIntroTransition>

      {/* ── Layer 1: Loading screen on top — exits to reveal SVG intro beneath ── */}
      <AnimatePresence>
        {!loadingDone && (
          <motion.div
            key="loading-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            <LoadingScreen onComplete={() => setLoadingDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}