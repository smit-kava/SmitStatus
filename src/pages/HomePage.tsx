"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);

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

  const handleLoadingComplete = () => {
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "easeInOut",
        onComplete: () => {
          setLoadingDone(true);
        }
      });
    } else {
      setLoadingDone(true);
    }
  };

  return (
    <>
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
      {!loadingDone && (
        <div
          ref={loadingRef}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          <LoadingScreen onComplete={handleLoadingComplete} />
        </div>
      )}
    </>
  );
}