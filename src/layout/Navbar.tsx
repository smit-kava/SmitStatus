import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Settings, Home, Wrench, Clock, Mail, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import { cn } from "@/lib/utils"
import doraemonFly from "@/assets/navImages/Doremon.png"
import doraemonRun from "@/assets/navImages/Doraemon Running png.png"
import nobitaSit from "@/assets/navImages/Nobita.png"

const navLinks = [
  { label: "Pocket", href: "#home", icon: Home },
  { label: "Gadgets", href: "#skills", icon: Wrench },
  { label: "Timeline", href: "#experience", icon: Clock },
  { label: "Contact", href: "#contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)

  // Static image setup

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0

      setScrollProgress(progress)
      setScrolled(currentScroll > 20)

      const sections = navLinks.map(link => link.href.replace("#", ""))
      const scrollPos = currentScroll + 100

      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setIsOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-white/20"
            : "bg-white/30 backdrop-blur-md"
        )}
      >
        {/* Liquid glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 pointer-events-none" />

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#0070F3] via-[#00A3FF] to-[#0070F3]"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Link to={ROUTES.HOME} className="flex items-center gap-2">
                <span className="text-xl lg:text-2xl font-bold text-[#0070F3]">
                  Doraemon
                </span>
                <span className="text-xl lg:text-2xl font-bold text-gray-700">
                  Dev
                </span>
              </Link>
              <div className="absolute inset-0 rounded-full bg-[#0070F3]/0 group-hover:bg-[#0070F3]/5 blur-xl transition-all duration-500 -z-10" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = activeSection === link.href.replace("#", "")

                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative px-4 lg:px-5 py-2.5 rounded-full transition-all duration-300",
                      "flex items-center gap-2",
                      isActive
                        ? "text-[#0070F3] bg-white/50 backdrop-blur-sm"
                        : "text-gray-600 hover:text-[#0070F3] hover:bg-white/30 backdrop-blur-sm"
                    )}
                  >
                    <Icon className="w-4 h-4 lg:w-4 lg:h-4" />
                    <span className="font-medium text-sm lg:text-sm">
                      {link.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-[#0070F3] rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-gray-500 hover:text-[#0070F3] hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => scrollTo("#contact")}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 lg:px-6 py-2 rounded-full font-medium text-sm overflow-hidden group bg-[#0070F3] shadow-lg shadow-[#0070F3]/20"
              >
                <div className="absolute inset-0 bg-[#0050C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-medium">Hire Me</span>
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Floating Doraemon and Nobita */}
              <motion.div
                className="flex items-end -mb-2 pointer-events-none"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.img
                  src={doraemonFly}
                  alt="Doraemon"
                  className="h-10 lg:h-12 w-auto object-contain drop-shadow-md z-10 pointer-events-auto cursor-pointer"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={nobitaSit}
                  alt="Nobita"
                  className="h-8 lg:h-10 w-auto object-contain drop-shadow-md -ml-3"
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-[#0070F3] hover:bg-white/50 backdrop-blur-sm transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-lg"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => scrollTo(link.href)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                        "text-gray-700 hover:text-[#0070F3]",
                        "hover:bg-white/50 backdrop-blur-sm",
                        activeSection === link.href.replace("#", "") && "bg-white/50 text-[#0070F3]"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                      {activeSection === link.href.replace("#", "") && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0070F3]"
                        />
                      )}
                    </motion.button>
                  )
                })}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full mt-4 px-4 py-3 rounded-xl font-medium text-white bg-[#0070F3] active:scale-98 transition-transform shadow-lg shadow-[#0070F3]/20"
                  onClick={() => scrollTo("#contact")}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Animation Layer - Pure Doraemon & Nobita */}
        <div className="absolute bottom-0 left-0 right-0 h-0 overflow-visible pointer-events-none">

          {/* Continuous Running Doraemon (Left to Right) */}
          <motion.div
            className="absolute bottom-[-10px] z-50"
            animate={{ x: ["-10vw", "110vw"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <motion.img
              src={doraemonRun}
              alt="Running Doraemon"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Liquid glass bottom line */}
          <motion.div
            className="absolute bottom-[-2px] left-0 h-[2px] bg-gradient-to-r from-[#0070F3]/40 via-[#00A3FF]/60 to-transparent"
            style={{ width: `${scrollProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.nav>

      {/* Gentle scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrolled ? 0 : 0.4, y: scrolled ? 20 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 text-xs text-gray-400 bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm pointer-events-none"
      >
        ↓ scroll ↓
      </motion.div>


    </>
  )
}