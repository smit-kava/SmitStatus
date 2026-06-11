"use client";

import { useState } from "react";
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

  return (
    <>
      {/* ── 1. Loading screen — auto-completes, then unmounts ── */}
      {!loadingDone && (
        <LoadingScreen onComplete={() => setLoadingDone(true)} />
      )}

      {/* ── 2. After loading: SVG intro → slides left → hero appears ── */}
      {loadingDone && (
        <SvgIntroTransition introDuration={3400} slideDuration={900}>
          <main className="flex flex-col w-full">
            <SectionReveal>
              <HeroSection />
              <SkillsSection />
              <ProjectsSection />
              <BannerScroller showImageLayer={true} />
              <ExperienceSection />
              <ContactSection />
            </SectionReveal>
          </main>
        </SvgIntroTransition>
      )}
    </>
  );
}