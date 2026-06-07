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
  { label: "Pocket",   href: "home",       icon: Home },
  { label: "Gadgets",  href: "skills",     icon: Wrench },
  { label: "Projects", href: "projects",   icon: FolderOpen },
  { label: "Timeline", href: "experience", icon: Clock },
  { label: "Contact",  href: "contact",    icon: Mail },
]

// Page background = #f4faff  (--color-doraemon-bg)
// Navbar will always match this color — fully merged with the page

export default function Navbar() {
  const [isOpen, setIsOpen]               = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const navigate  = useNavigate()
  const location  = useLocation()
  const isHome    = location.pathname === ROUTES.HOME

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
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

  const scrollTo = (id: string) => {
    setIsOpen(false)
    if (isHome) {
      // Already on home — just scroll to section
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // On another page — navigate home then scroll after a tick
      navigate(ROUTES.HOME)
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 400)
    }
  }

  return (
    <>
      {/* ════════════════════════════════════════════
          NAVBAR — Same color as page (#f4faff)
          No border, no shadow, fully merged look
          ════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: isHome
            ? "transparent"
            : "rgba(244,250,255,0.92)",
          backdropFilter: isHome ? "none" : "blur(16px)",
          borderBottom: isHome ? "none" : "1px solid rgba(0,100,148,0.08)",
        }}
      >
        {/* ── Main bar — full width ── */}
        <div className="w-full px-6 sm:px-10 lg:px-16">
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
        {/* ── Scroll progress bar — home page only ── */}
        {isHome && (
        <div className="absolute bottom-0 left-0 w-full" style={{ height: "2px", background: "transparent" }}>
          <motion.div
            className="h-full relative rounded-r-full"
            style={{
              width: `${scrollProgress}%`,
              background: "linear-gradient(90deg, transparent, #00A3FF, #00A3FF)",
              boxShadow: "0 0 6px rgba(0,163,255,0.4)",
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        )}

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
              style={{
                // Same page color — no popup effect, feels like an extension
                background: "var(--color-background)",
                borderTop: "none",
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
