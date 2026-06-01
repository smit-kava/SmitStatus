import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Pocket", href: "#home" },
  { label: "Gadgets", href: "#skills" },
  { label: "Timeline", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map(link => link.href.replace("#", ""))
      const scrollPos = window.scrollY + 100

      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface-bright/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/30"
          : "bg-transparent py-2"
      )}
    >
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to={ROUTES.HOME} className="flex items-center group font-headline-md text-headline-md tracking-tight">
              <span className="text-primary">Doraemon</span>
              <span className="text-primary/80">Dev</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "relative py-2 font-label-md text-label-md transition-all duration-200",
                    isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-container"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-primary hover:rotate-90 hover:bg-surface-container-low transition-all duration-300 p-2 rounded-full">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-primary text-on-primary px-md py-2 rounded-full font-label-md text-label-md font-bold shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-lg"
          >
            <div className="px-gutter py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-xl transition-all duration-200 font-label-md text-label-md"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                className="w-full bg-primary text-on-primary mt-4 py-3 rounded-xl font-label-md text-label-md font-bold shadow-md active:scale-95 transition-transform"
                onClick={() => scrollTo("#contact")}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}