import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Target, Heart, Rocket } from "@/components/ui/GlobalIcons"
import { Card, CardContent } from "@/components/ui/card"
import { personalInfo } from "@/data/portfolioData"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const values = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "I deliver high-performance solutions optimized for speed and scalability.",
    gradient: "from-doraemon-yellow to-orange-400",
  },
  {
    icon: Target,
    title: "Precision Focused",
    description: "Every pixel and line of code is crafted with intention and purpose.",
    gradient: "from-doraemon-blue to-cyan-500",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "I genuinely love what I do — and that passion shows in every project.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Rocket,
    title: "Always Learning",
    description: "The tech landscape evolves daily, and I evolve with it.",
    gradient: "from-purple-500 to-indigo-500",
  },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header animation
    gsap.fromTo('.about-header', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
      }
    );

    // Left visual animation
    gsap.fromTo('.about-visual',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
      }
    );

    // Right text animation
    gsap.fromTo('.about-text',
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
      }
    );

    // Values stagger
    gsap.fromTo('.about-value',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.4,
        scrollTrigger: { trigger: containerRef.current, start: "top 70%", once: true }
      }
    );

    // Floating cards animations
    gsap.to('.about-float-1', {
      y: -16,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    gsap.to('.about-float-2', {
      y: 16,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.5
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-24 bg-doraemon-bg relative overflow-hidden">
      {/* Subtle bg orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-doraemon-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-header text-center mb-16 opacity-0">
          <p className="text-doraemon-blue text-sm font-semibold tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Who Am{" "}
            <span className="bg-gradient-to-r from-doraemon-blue to-cyan-500 bg-clip-text text-transparent">
              I?
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A developer who combines technical expertise with creative thinking to build products people love.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Visual */}
          <div className="about-visual relative opacity-0">
            {/* Avatar placeholder */}
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-doraemon-blue to-cyan-400 blur-2xl opacity-30" />
              <div className="relative w-full h-full rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 flex items-center justify-center overflow-hidden shadow-sm">
                {/* Decorative circles */}
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-doraemon-blue/20" />
                <div className="absolute bottom-6 left-6 w-14 h-14 rounded-full border border-cyan-400/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-doraemon-blue to-cyan-400 opacity-10 blur-xl" />

                {/* Initials */}
                <div className="relative z-10 text-center">
                  <div className="text-7xl font-bold bg-gradient-to-br from-doraemon-blue to-cyan-500 bg-clip-text text-transparent">
                    S
                  </div>
                  <p className="text-gray-900 font-bold text-sm mt-2">{personalInfo.name}</p>
                  <p className="text-gray-500 text-xs">{personalInfo.title}</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="about-float-1 absolute -top-4 -right-4 bg-gradient-to-r from-doraemon-blue to-cyan-500 rounded-2xl p-4 shadow-xl shadow-doraemon-blue/20">
              <p className="text-white font-bold text-2xl">{personalInfo.yearsOfExp}</p>
              <p className="text-white/90 text-xs font-medium">Years Exp.</p>
            </div>

            <div className="about-float-2 absolute -bottom-4 -left-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-xl">
              <p className="text-doraemon-darkBlue font-bold text-2xl">{personalInfo.projectsCompleted}</p>
              <p className="text-gray-500 text-xs font-medium">Projects</p>
            </div>
          </div>

          {/* Right: Text */}
          <div className="about-text space-y-6 opacity-0">
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {personalInfo.bio}
              </p>
              <p className="text-gray-500 leading-relaxed">
                I specialize in building modern web applications with React, TypeScript, and Node.js.
                Whether it's a pixel-perfect UI or a robust backend API, I deliver with quality and care.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
              {[
                { label: "Name", value: personalInfo.name },
                { label: "Email", value: personalInfo.email },
                { label: "Location", value: personalInfo.location },
                { label: "Status", value: "Open to Work ✓" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-gray-900 text-sm font-semibold mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {values.map((val) => {
            const Icon = val.icon
            return (
              <div key={val.title} className="about-value opacity-0">
                <Card className="group h-full bg-white/60 backdrop-blur-md border-white/50 hover:border-doraemon-blue/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.gradient} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-gray-900 font-bold">{val.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{val.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
