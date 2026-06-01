// ================================================
// HOME PAGE
// Assembles all portfolio sections on the "/" route.
// All sections imported via the barrel at @/sections
// ================================================

import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/sections"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
