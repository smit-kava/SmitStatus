import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/sections"
import { BannerScroller } from "@/components/ui"

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <BannerScroller height={260} duration={40} showImageLayer={true} />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}

