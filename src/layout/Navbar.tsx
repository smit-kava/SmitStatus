import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Wrench, Clock, Mail, FileText, FolderOpen } from "@/components/ui/GlobalIcons"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import doraemonFly from "@/assets/navImages/Doremon.png"
import doraemonRun from "@/assets/navImages/Doraemon Running png.png"
import nobitaSit from "@/assets/navImages/Nobita.png"
import logoSmit from "@/assets/logo_smit.svg"

const navLinks = [
  { label: "Pocket", href: "home", icon: Home },
  { label: "Gadgets", href: "skills", icon: Wrench },
  { label: "Projects", href: "projects", icon: FolderOpen },
  { label: "Timeline", href: "experience", icon: Clock },
  { label: "Contact", href: "contact", icon: Mail },
]

// Page background = #f4faff  (--color-doraemon-bg)
// Navbar will always match this color — fully merged with the page

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === ROUTES.HOME

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
      setScrollProgress(progress)

      // Active section detection (only meaningful on home page)
      if (!isHome) return
      for (const link of [...navLinks].reverse()) {
        const section = document.getElementById(link.href)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 90) {
            setActiveSection(link.href)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    const t = setTimeout(handleScroll, 100)
    return () => {
      clearTimeout(t)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHome])

  // Handle deferred scrolling to a section when arriving from another page or when loading completes
  useEffect(() => {
    if (!isHome) return

    const target = sessionStorage.getItem("scrollTarget") || pendingScroll
    if (!target) return

    let attempts = 0
    const interval = setInterval(() => {
      const element = document.getElementById(target)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        sessionStorage.removeItem("scrollTarget")
        setPendingScroll(null)
        clearInterval(interval)
      } else {
        attempts++
        // Stop trying after 10 seconds (100 * 100ms) to avoid infinite loops
        if (attempts > 100) {
          sessionStorage.removeItem("scrollTarget")
          setPendingScroll(null)
          clearInterval(interval)
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isHome, location.pathname, pendingScroll])

  const scrollTo = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (isHome && element) {
      // Already on home and element is rendered — scroll immediately
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // If we are on another page, or if the element is not rendered yet, navigate to home and store target
      sessionStorage.setItem("scrollTarget", id)
      setPendingScroll(id)
      if (!isHome) {
        navigate(ROUTES.HOME)
      }
    }
  }

  return (
    <>
      {/* ── Scroll progress bar — home page only (always fixed at very top of screen) ── */}
      {isHome && (
        <div className="fixed top-0 left-0 w-full z-60" style={{ height: "3px", background: "transparent" }}>
          <motion.div
            className="h-full relative rounded-r-full"
            style={{
              width: `${scrollProgress}%`,
              background: "linear-gradient(90deg, transparent, #00A3FF, #00A3FF)",
              boxShadow: "0 0 8px rgba(0,163,255,0.6)",
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}

      {/* ── Navbar Container ── */}
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed z-50 transition-all duration-300 ease-in-out"
        style={{
          // Floating Layout
          top: (isHome && !isScrolled) ? "0px" : "12px",
          left: "0px",
          right: "0px",
          width: (isHome && !isScrolled) ? "100%" : "92%",
          maxWidth: (isHome && !isScrolled) ? "100%" : "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: (isHome && !isScrolled && !isOpen)
            ? "0px"
            : isOpen
              ? "24px"
              : "9999px",

          // Liquid Glass Style (Dynamic themed background)
          background: (isHome && !isScrolled)
            ? "transparent"
            : "color-mix(in srgb, var(--color-background) 75%, transparent)",
          backdropFilter: (isHome && !isScrolled) ? "none" : "blur(24px) saturate(180%)",
          border: (isHome && !isScrolled)
            ? "none"
            : "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
          boxShadow: (isHome && !isScrolled)
            ? "none"
            : "0 12px 30px -10px color-mix(in srgb, var(--color-primary) 15%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
        }}
      >
        {/* ── Main bar — Transitioning padding ── */}
        <div className={`w-full transition-all duration-300 ${
          (isHome && !isScrolled)
            ? "px-6 sm:px-10 lg:px-16"
            : "px-6 sm:px-8 lg:px-10"
        }`}>
          <div className="flex items-center justify-between h-16">

            {/* ─── Logo ─── */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to={ROUTES.HOME} className="flex items-center">
                <img
                   src={logoSmit}
                  alt="Smit Kava — SK Code Bracket Logo"
                  className="h-9 lg:h-10 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(0,100,148,0.18))" }}
                />
              </Link>
            </motion.div>

            {/* ─── Desktop Nav Links ─── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.href
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                    style={{
                      color: isActive ? "#005b8f" : "#64748b",
                      background: isActive
                        ? "rgba(0, 100, 148, 0.08)"
                        : "transparent",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </motion.button>
                )
              })}
            </nav>

            {/* ─── Right Actions ─── */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitcher />

              {/* Hire Me */}
              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-5 py-2 rounded-xl text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #0080c8 0%, #005b8f 100%)",
                  boxShadow: "0 3px 12px rgba(0,100,148,0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                  initial={{ x: "-110%" }}
                  whileHover={{ x: "110%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Hire Me</span>
              </motion.button>

              {/* Floating mascots — home page only */}
              {isHome && (
                <motion.div
                  className="flex items-end pointer-events-none -mb-1"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.img
                    src={doraemonFly}
                    alt="Doraemon"
                    className="h-10 lg:h-12 w-auto object-contain drop-shadow-md"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.img
                    src={nobitaSit}
                    alt="Nobita"
                    className="h-8 lg:h-10 w-auto object-contain drop-shadow-md -ml-2"
                    animate={{ x: [0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                </motion.div>
              )}
            </div>

            {/* ─── Mobile Hamburger ─── */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeSwitcher />
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg"
                style={{
                  color: "#005b8f",
                  background: "rgba(0,100,148,0.07)",
                }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="md:hidden overflow-hidden rounded-b-[24px]"
              style={{
                background: "transparent",
                borderTop: "1px solid color-mix(in srgb, var(--color-primary) 12%, transparent)",
              }}
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const Icon = link.icon
                  const isMobileActive = activeSection === link.href
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => scrollTo(link.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                      style={{
                        color: isMobileActive ? "#005b8f" : "#64748b",
                        background: isMobileActive ? "rgba(0,100,148,0.07)" : "transparent",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                      {isMobileActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006494]" />
                      )}
                    </motion.button>
                  )
                })}

                <div className="flex flex-col gap-2 pt-3">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0080c8, #005b8f)" }}
                  >
                    Hire Me
                  </button>
                  <a
                    href="/Smit_Kava_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                    style={{ color: "#005b8f", border: "1.5px solid rgba(0,100,148,0.25)" }}
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Running Doraemon — floats just below navbar ── */}
      <div className="fixed top-16 left-0 right-0 z-40 h-0 overflow-visible pointer-events-none">
        <motion.div
          className="absolute top-2"
          animate={{ x: ["-8vw", "108vw"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <motion.img
            src={doraemonRun}
            alt=""
            className="h-8 sm:h-10 w-auto object-contain drop-shadow"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.38, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </>
  )
}
