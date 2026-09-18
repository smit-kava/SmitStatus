import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Menu, X, Home, Wrench, Clock, Mail, FileText, FolderOpen, NotificationsActive } from "@/components/ui/GlobalIcons"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import doraemonFly from "@/assets/navImages/Doremon.png"
import doraemonRun from "@/assets/navImages/Doraemon Running png.png"
import nobitaSit from "@/assets/navImages/Nobita.png"
import logoSmit from "@/assets/logo_smit.svg"
import SearchTab from "@/components/ui/SearchTab"
import { GSAPPresence } from "@/components/ui/GSAPPresence"

gsap.registerPlugin(useGSAP)

const navLinks = [
  { label: "Pocket", href: "home", icon: Home },
  { label: "Gadgets", href: "skills", icon: Wrench },
  { label: "Projects", href: "projects", icon: FolderOpen },
  { label: "Timeline", href: "experience", icon: Clock },
  { label: "Contact", href: "contact", icon: Mail },
]

// ─── Section Reveal Hook ───────────────────────────────────────────────────────
export function useSectionReveal(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])
  const variants = {
    hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }
  return { ref: setRef, variants, isVisible }
}

// ─── Doraemon Right Scroll Sidebar ────────────────────────────────────────────
function DoraemonScrollSidebar({
  sections, activeSection, scrollTo, scrollProgress, isHome, sidebarRef, onMouseDown,
}: {
  sections: typeof navLinks
  activeSection: string
  scrollTo: (id: string) => void
  scrollProgress: number
  isHome: boolean
  sidebarRef: React.RefObject<HTMLDivElement | null>
  onMouseDown: (e: React.MouseEvent) => void
}) {
  const doraemonRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (!doraemonRef.current) return;
    gsap.to(doraemonRef.current, {
      rotate: 5,
      y: -4,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }, [])

  if (!isHome) return null

  // Track geometry constants
  const TRACK_TOP_OFFSET = 24
  const TRACK_BOTTOM_OFFSET = 96 

  return (
    <div
      ref={sidebarRef}
      className="hidden md:flex fixed right-0 top-0 h-screen z-40 flex-col items-center pointer-events-none select-none"
      style={{ width: "64px" }}
    >
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes glassShimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%)  skewX(-12deg); }
        }
      `}</style>

      {/* ── Liquid glass pill background ── */}
      <div
        className="absolute pointer-events-auto cursor-ns-resize overflow-hidden"
        style={{
          top: `${TRACK_TOP_OFFSET}px`,
          bottom: `${TRACK_BOTTOM_OFFSET - 24}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "36px",
          borderRadius: "18px",
          background: [
            "linear-gradient(160deg,",
            "  rgba(255,255,255,0.28) 0%,",
            "  rgba(180,225,255,0.14) 45%,",
            "  rgba(255,255,255,0.10) 100%)",
          ].join(""),
          backdropFilter: "blur(20px) saturate(180%) brightness(1.06)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.06)",
          border: "1px solid rgba(255,255,255,0.50)",
          outline: "1px solid rgba(0,130,200,0.12)",
          outlineOffset: "-2px",
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.18) inset",
            "0 1px 0 rgba(255,255,255,0.60) inset",
            "0 -1px 0 rgba(0,80,140,0.06) inset",
            "0 8px 32px -4px rgba(0,90,160,0.14)",
            "0 2px 8px -2px rgba(0,163,255,0.10)",
          ].join(", "),
        }}
        onMouseDown={onMouseDown}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.40), transparent)",
              filter: "blur(4px)",
              animation: "glassShimmer 4s ease-in-out infinite",
              animationDelay: "1.2s",
            }}
          />
          <div style={{
            position: "absolute",
            top: "6px",
            left: "20%", right: "20%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.75) 50%, transparent)",
            borderRadius: "100%",
          }} />
        </div>
      </div>

      {/* ── Track center line ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: `${TRACK_TOP_OFFSET + 16}px`,
          bottom: `${TRACK_BOTTOM_OFFSET}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          borderRadius: "1px",
          background: "linear-gradient(180deg, rgba(0,163,255,0.08), rgba(0,163,255,0.22) 50%, rgba(0,163,255,0.08))",
        }}
      />

      {/* ── Progress fill ── */}
      <div
        className="absolute pointer-events-none origin-top transition-all duration-75 ease-linear"
        style={{
          top: `${TRACK_TOP_OFFSET + 16}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          borderRadius: "1px",
          background: "linear-gradient(180deg, #00C3FF 0%, #0080c8 100%)",
          boxShadow: "0 0 8px rgba(0,195,255,0.65)",
          height: `calc((${scrollProgress} / 100) * (100% - ${TRACK_TOP_OFFSET + 16 + TRACK_BOTTOM_OFFSET}px))`,
        }}
      />

      {/* ── Section dots ── */}
      <div
        className="absolute flex flex-col justify-between pointer-events-auto"
        style={{
          top: `${TRACK_TOP_OFFSET + 32}px`,
          bottom: `${TRACK_BOTTOM_OFFSET + 24}px`,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {sections.map((link) => {
          const isActive = activeSection === link.href
          return (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              title={link.label}
              className="group relative flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ width: "36px", height: "36px" }}
            >
              {/* Active glow ring */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                  background: "rgba(0,163,255,0.10)",
                  border: "1.5px solid rgba(0,163,255,0.50)",
                  backdropFilter: "blur(4px)",
                }}
              />
              {/* Dot */}
              <div
                className="rounded-full z-10 transition-all duration-300"
                style={{
                  width: isActive ? 13 : 8,
                  height: isActive ? 13 : 8,
                  backgroundColor: isActive ? "#00A3FF" : "rgba(0,100,148,0.28)",
                  boxShadow: isActive
                    ? "0 0 0 3px rgba(0,163,255,0.20), 0 0 12px rgba(0,163,255,0.80)"
                    : "none",
                }}
              />
              {/* Tooltip — pops LEFT */}
              <div
                className="absolute pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                style={{
                  right: "calc(100% + 8px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: [
                    "linear-gradient(135deg,",
                    "  rgba(255,255,255,0.26) 0%,",
                    "  rgba(200,232,255,0.18) 100%)",
                  ].join(""),
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 2px 12px rgba(0,100,148,0.12)",
                  color: isActive ? "#005b8f" : "#64748b",
                }}
              >
                {link.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Doraemon rides the track ── */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-75 ease-linear"
        style={{
          top: `calc(${TRACK_TOP_OFFSET + 16}px + (${scrollProgress} / 100) * (100% - ${TRACK_TOP_OFFSET + 16 + TRACK_BOTTOM_OFFSET}px))`,
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
        onMouseDown={onMouseDown}
      >
        <img
          ref={doraemonRef}
          src={doraemonFly}
          alt="Doraemon"
          style={{ width: "40px", height: "40px", objectFit: "contain", transform: "rotate(-5deg)" }}
          className="drop-shadow-lg select-none pointer-events-none"
        />
      </div>

      {/* ── Golden Bell at the bottom — bigger & bolder ── */}
      <div
        className="absolute pointer-events-auto"
        style={{ bottom: "28px", left: "50%", transform: "translateX(-50%)" }}
      >
        <div style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          border: "2.5px solid rgba(252,212,0,0.65)",
          animation: "pulseRing 2.4s ease-out infinite",
        }} />
        <div style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          border: "2px solid rgba(252,212,0,0.35)",
          animation: "pulseRing 2.4s ease-out infinite",
          animationDelay: "0.8s",
        }} />
        <button
          onClick={() => scrollTo("contact")}
          className="group transition-transform hover:scale-110 active:scale-95 hover:-translate-y-1"
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: [
              "linear-gradient(145deg,",
              "  rgba(255,235,80,0.40) 0%,",
              "  rgba(252,212,0,0.28) 50%,",
              "  rgba(200,160,0,0.18) 100%)",
            ].join(""),
            backdropFilter: "blur(14px) saturate(160%)",
            WebkitBackdropFilter: "blur(14px) saturate(160%)",
            border: "2px solid rgba(252,212,0,0.70)",
            boxShadow: [
              "0 0 0 1px rgba(255,240,80,0.25) inset",
              "0 1px 0 rgba(255,255,180,0.55) inset",
              "0 0 18px rgba(252,212,0,0.55)",
              "0 4px 12px rgba(180,140,0,0.25)",
            ].join(", "),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            color: "#7a5c00",
          }}
          title="Contact me"
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,200,0.45) 0%, transparent 60%)",
            }}
          />
          <NotificationsActive sx={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAppLoading, setIsAppLoading] = useState(
    () => typeof document !== 'undefined' ? document.documentElement.classList.contains("app-loading") : false
  )
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === ROUTES.HOME

  const sidebarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  
  // Animation refs
  const flyRef = useRef<HTMLImageElement>(null)
  const sitRef = useRef<HTMLImageElement>(null)
  const flyGroupRef = useRef<HTMLDivElement>(null)
  const runningWrapperRef = useRef<HTMLDivElement>(null)
  const runningImageRef = useRef<HTMLImageElement>(null)

  // Initialization animations
  useGSAP(() => {
    if (navRef.current && !isAppLoading) {
      gsap.fromTo(navRef.current, 
        { y: -64, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }
      )
    }
  }, [isAppLoading])

  // Mascots animations
  useGSAP(() => {
    if (flyGroupRef.current) {
      gsap.to(flyGroupRef.current, { y: -4, duration: 1.5, yoyo: true, repeat: -1, ease: "power1.inOut" })
    }
    if (flyRef.current) {
      gsap.to(flyRef.current, { x: 3, duration: 1.75, yoyo: true, repeat: -1, ease: "power1.inOut" })
    }
    if (sitRef.current) {
      gsap.to(sitRef.current, { x: -2, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut", delay: 0.2 })
    }
    
    if (runningWrapperRef.current) {
      gsap.fromTo(runningWrapperRef.current,
        { x: "-8vw" },
        { x: "108vw", duration: 14, repeat: -1, ease: "none" }
      )
    }
    if (runningImageRef.current) {
      gsap.to(runningImageRef.current, { y: -6, duration: 0.19, yoyo: true, repeat: -1, ease: "power1.inOut" })
    }
  }, [isHome, isAppLoading])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsAppLoading(document.documentElement.classList.contains("app-loading"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const updateScrollFromMouse = (clientY: number) => {
    if (!sidebarRef.current) return
    const rect = sidebarRef.current.getBoundingClientRect()
    const TRACK_TOP_OFFSET = 24 + 16
    const TRACK_BOTTOM_OFFSET = 96
    const trackTop = rect.top + TRACK_TOP_OFFSET
    const trackHeight = rect.height - TRACK_TOP_OFFSET - TRACK_BOTTOM_OFFSET
    const relativeY = clientY - trackTop
    const pct = Math.max(0, Math.min(1, relativeY / trackHeight))
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: pct * maxScroll, behavior: "auto" })
  }

  const handleSidebarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    updateScrollFromMouse(e.clientY)
    const handleMouseMove = (ev: MouseEvent) => updateScrollFromMouse(ev.clientY)
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0)
      if (!isHome) return
      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.href)
        if (el && el.getBoundingClientRect().top <= 90) {
          setActiveSection(link.href)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    const t = setTimeout(handleScroll, 100)
    return () => { clearTimeout(t); window.removeEventListener("scroll", handleScroll) }
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
    const target = sessionStorage.getItem("scrollTarget") || pendingScroll
    if (!target) return
    let attempts = 0
    const interval = setInterval(() => {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        sessionStorage.removeItem("scrollTarget")
        setPendingScroll(null)
        clearInterval(interval)
      } else if (++attempts > 100) {
        sessionStorage.removeItem("scrollTarget")
        setPendingScroll(null)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isHome, location.pathname, pendingScroll])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (isHome && el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      sessionStorage.setItem("scrollTarget", id)
      setPendingScroll(id)
      if (!isHome) navigate(ROUTES.HOME)
    }
  }

  // ── Liquid glass navbar style ──────────────────────────────────────────────
  const glassStyle: React.CSSProperties = isScrolled
    ? {
      background: [
        "linear-gradient(135deg,",
        "  rgba(255,255,255,0.22) 0%,",
        "  rgba(200,232,255,0.14) 40%,",
        "  rgba(255,255,255,0.10) 100%)",
      ].join(""),
      backdropFilter: "blur(28px) saturate(200%) brightness(1.08)",
      WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.08)",
      border: "1px solid rgba(255,255,255,0.45)",
      outline: "1px solid rgba(0,130,200,0.10)",
      outlineOffset: "-2px",
      boxShadow: [
        "0 0 0 1px rgba(255,255,255,0.12) inset",
        "0 1px 0 rgba(255,255,255,0.55) inset",
        "0 -1px 0 rgba(0,80,140,0.08) inset",
        "0 8px 32px -6px rgba(0,90,160,0.18)",
        "0 2px 8px -2px rgba(0,130,200,0.12)",
      ].join(", "),
    }
    : {}

  const navContainerStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 50,
    top: isScrolled ? "12px" : "0px",
    left: "0px",
    right: "0px",
    width: isScrolled ? "92%" : "100%",
    maxWidth: isScrolled ? "1200px" : "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: isScrolled ? (isOpen ? "24px" : "9999px") : isOpen ? "24px" : "0px",
    transition: "top 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), border-radius 0.35s cubic-bezier(0.4,0,0.2,1), background 0.4s ease, box-shadow 0.4s ease",
    ...glassStyle,
    ...(isMobile ? {
      background: "linear-gradient(135deg, #ffffff 0%, var(--color-background, #f4faff) 100%)",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      border: "1px solid color-mix(in srgb, var(--color-primary, #0080c8) 12%, transparent)",
      outline: "none",
      boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary, #0080c8) 8%, transparent)",
    } : {}),
  }

  if (isAppLoading) return null

  return (
    <>
      <DoraemonScrollSidebar
        sections={navLinks}
        activeSection={activeSection}
        scrollTo={scrollTo}
        scrollProgress={scrollProgress}
        isHome={isHome}
        sidebarRef={sidebarRef}
        onMouseDown={handleSidebarMouseDown}
      />

      {/* ── Top progress bar ── */}
      {isHome && (
        <div className="fixed top-0 left-0 w-full z-[60]" style={{ height: "3px" }}>
          <div
            className="h-full rounded-r-full transition-all duration-75 ease-linear"
            style={{
              width: `${scrollProgress}%`,
              background: "linear-gradient(90deg, transparent, #00A3FF, #00A3FF)",
              boxShadow: "0 0 8px rgba(0,163,255,0.6)",
            }}
          />
        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        style={{ ...navContainerStyle, opacity: 0 }}
      >
        {/* Water ripple shimmer overlay */}
        {isScrolled && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ borderRadius: "inherit" }}
          >
            <div
              className="absolute top-0 h-full w-1/3 opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                filter: "blur(8px)",
                animation: "glassShimmer 5s ease-in-out infinite",
              }}
            />
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 50%, transparent)",
                borderRadius: "100%",
              }}
            />
          </div>
        )}

        <div className={`relative w-full transition-all duration-300 ${isScrolled ? "px-6 sm:px-8 lg:px-10" : "px-6 sm:px-10 lg:px-16"}`}>
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button 
              onClick={() => scrollTo("home")} 
              className="flex items-center focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              <img
                src={logoSmit}
                alt="Smit Kava — SK Code Bracket Logo"
                className="h-9 lg:h-10 w-auto object-contain"
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,100,148,0.18))" }}
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.href
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      color: isActive ? "#005b8f" : "#64748b",
                      background: isActive ? "rgba(0,100,148,0.08)" : "transparent",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5">
              {/* Search Bar */}
              <div className="w-40 lg:w-56 transition-all duration-300">
                <SearchTab />
              </div>

              <div className="flex-shrink-0" style={{ position: "relative" }}>
                <ThemeSwitcher />
              </div>

              {/* Hire Me */}
              <button
                onClick={() => scrollTo("contact")}
                className="group relative overflow-hidden px-5 py-2 rounded-xl text-sm font-bold text-white tracking-wide whitespace-nowrap flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0080c8 0%, #005b8f 100%)",
                  boxShadow: "0 3px 10px rgba(0,100,148,0.25)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg -translate-x-[110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
                />
                <span className="relative z-10">Hire Me</span>
              </button>

              {/* Mascots */}
              {isHome && (
                <div
                  ref={flyGroupRef}
                  className="flex items-end pointer-events-none -mb-1"
                >
                  <img
                    ref={flyRef}
                    src={doraemonFly} alt="Doraemon"
                    className="h-10 lg:h-12 w-auto object-contain drop-shadow-md"
                  />
                  <img
                    ref={sitRef}
                    src={nobitaSit} alt="Nobita"
                    className="h-8 lg:h-10 w-auto object-contain drop-shadow-md -ml-2"
                  />
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-transform active:scale-90"
                style={{ color: "#005b8f", background: "rgba(0,100,148,0.07)" }}
              >
                <div className="w-5 h-5 relative">
                  <GSAPPresence
                    isPresent={!isOpen}
                    enterAnimation={el => gsap.fromTo(el, { rotate: 90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.15 })}
                    exitAnimation={el => gsap.to(el, { rotate: -90, opacity: 0, duration: 0.15 })}
                    className="absolute inset-0"
                  >
                    {!isOpen && <Menu className="w-5 h-5" />}
                  </GSAPPresence>
                  <GSAPPresence
                    isPresent={isOpen}
                    enterAnimation={el => gsap.fromTo(el, { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.15 })}
                    exitAnimation={el => gsap.to(el, { rotate: 90, opacity: 0, duration: 0.15 })}
                    className="absolute inset-0"
                  >
                    {isOpen && <X className="w-5 h-5" />}
                  </GSAPPresence>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <GSAPPresence
          isPresent={isOpen}
          enterAnimation={(el) => gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" })}
          exitAnimation={(el) => gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power2.out" })}
          className="md:hidden overflow-hidden rounded-b-[24px]"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--color-primary, #0080c8) 12%, transparent)" }}
        >
          {isOpen && (
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon
                const isMobileActive = activeSection === link.href
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors nav-mobile-item"
                    style={{
                      color: isMobileActive ? "#005b8f" : "#64748b",
                      background: isMobileActive ? "rgba(0,100,148,0.07)" : "transparent",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {isMobileActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006494]" />}
                  </button>
                )
              })}
              <div className="flex flex-col gap-2 pt-3 nav-mobile-item">
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #0080c8, #005b8f)" }}
                >
                  Hire Me
                </button>
                <a
                  href="/Smit_Kava_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ color: "#005b8f", border: "1.5px solid rgba(0,100,148,0.25)" }}
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </a>
              </div>
            </div>
          )}
        </GSAPPresence>
      </nav>

      {/* ── Running Doraemon below navbar ── */}
      {isHome && (
        <div className="fixed top-16 left-0 right-0 z-40 h-0 overflow-visible pointer-events-none">
          <div ref={runningWrapperRef} className="absolute top-2">
            <img
              ref={runningImageRef}
              src={doraemonRun} alt=""
              className="h-8 sm:h-10 w-auto object-contain drop-shadow"
            />
          </div>
        </div>
      )}
    </>
  )
}