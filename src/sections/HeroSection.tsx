import { motion } from "framer-motion"
import {
  RocketLaunch,
  Code,
  AutoAwesome,
  Widgets,
  DataObject,
  Api,
  Storage,
  Palette,
  Inventory2,
  Timeline,
  School,
  Grade,
  Work,
  Layers,
  Star,
  LocationOn,
  LaptopMac,
  MenuBook,
  EmojiEvents,
  LocationCity,
  Stars,
  KeyboardDoubleArrowDown,
  NotificationsActive,
} from "@/components/ui/HeroIcons"
import { useEffect, useState } from "react"
import doremonImg from "@/assets/navImages/Doremon.png"

// ─── Typewriter Hook ─────────────────────────────────────────────────────────
function useTypewriter(phrases: string[], speed = 82, delSpeed = 48, pause = 1300) {
  const [text, setText] = useState("")
  const [pi, setPi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = phrases[pi]
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1))
        setCi(c => c + 1)
        if (ci + 1 === cur.length) { setDel(true); return }
      } else {
        setText(cur.slice(0, ci - 1))
        setCi(c => c - 1)
        if (ci - 1 === 0) { setDel(false); setPi(i => (i + 1) % phrases.length) }
      }
    }, del ? delSpeed : ci === cur.length ? pause : speed)
    return () => clearTimeout(t)
  }, [ci, del, pi, phrases, speed, delSpeed, pause])

  return text
}

// ─── Cloud ────────────────────────────────────────────────────────────────────
function Cloud({ delay, top }: { delay: number; top: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left: -180, zIndex: 1 }}
      animate={{ x: [0, 900] }}
      transition={{ duration: 28 + delay * 5, repeat: Infinity, ease: "linear", delay }}
    >
      <svg width="130" height="60" viewBox="0 0 130 60" fill="none">
        <ellipse cx="65" cy="45" rx="60" ry="18" fill="white" opacity="0.7" />
        <circle cx="40" cy="30" r="20" fill="white" opacity="0.7" />
        <circle cx="72" cy="22" r="26" fill="white" opacity="0.7" />
        <circle cx="100" cy="32" r="16" fill="white" opacity="0.7" />
      </svg>
    </motion.div>
  )
}

// ─── Floating Tag ─────────────────────────────────────────────────────────────
function FloatTag({
  children, className, delay = 0,
}: { children: React.ReactNode; className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute bg-white rounded-xl px-3 py-1.5 text-[10px] font-bold whitespace-nowrap shadow-md z-20 flex items-center gap-1 ${className}`}
      animate={{ y: [0, -7, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────
function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-blue-300 bg-white text-blue-700 text-[11px] font-bold cursor-default select-none"
      style={{ fontFamily: "'Comic Neue', cursive" }}
      whileHover={{ scale: 1.06, y: -2, backgroundColor: "#006494", color: "white", borderColor: "#006494" }}
      transition={{ duration: 0.18 }}
    >
      <span className="text-[14px]">{icon}</span>
      {label}
    </motion.div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function Stat({ icon, num, label }: { icon: React.ReactNode; num: string; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-2xl text-center min-w-[70px]"
      style={{ background: "rgba(255,255,255,0.72)", border: "1.5px solid rgba(0,100,148,0.18)" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
    >
      <span className="text-blue-700 text-[18px]">{icon}</span>
      <span className="text-[1.2rem] font-extrabold text-blue-900" style={{ fontFamily: "'Baloo 2', cursive" }}>{num}</span>
      <span className="text-[10px] font-bold text-slate-500" style={{ fontFamily: "'Comic Neue', cursive" }}>{label}</span>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const phrases = [
    "Building Web Apps",
    "React.js Enthusiast",
    ".NET Core Developer",
    "MCA @ ISTAR College",
    "Clean Code Lover",
    "Future Full-Stack Dev",
  ]
  const typeText = useTypewriter(phrases)

  const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const itemAnim = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } }

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
        style={{
          background: "linear-gradient(165deg,#e6eff5 0%,#cae6ff 35%,#f4faff 60%,#fefce8 100%)",
          fontFamily: "'Baloo 2', cursive",
        }}
      >
        {/* Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[{ delay: 0, top: "6%" }, { delay: 8, top: "18%" }, { delay: 14, top: "4%" }].map((c, i) => (
            <Cloud key={i} delay={c.delay} top={c.top} />
          ))}
        </div>

        {/* Twinkling stars */}
        {[
          { top: "9%", left: "14%", color: "#fcd400", size: 7, delay: 0.3 },
          { top: "7%", left: "38%", color: "#c00014", size: 9, delay: 1 },
          { top: "16%", left: "62%", color: "#fcd400", size: 6, delay: 0.7 },
          { top: "5%", left: "80%", color: "#00a0e9", size: 5, delay: 1.6 },
          { top: "22%", left: "52%", color: "#006494", size: 7, delay: 2.1 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, background: s.color, zIndex: 2 }}
            animate={{ opacity: [1, 0.15, 1], scale: [1, 0.45, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: s.delay }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 grid lg:grid-cols-[1fr_300px] gap-6 items-center min-h-screen">

          {/* ── Left ─────────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col"
            variants={containerAnim}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div
              variants={itemAnim}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 w-fit border-2"
              style={{ background: "rgba(252,212,0,0.3)", borderColor: "#fcd400", color: "#00334e", fontFamily: "'Comic Neue',cursive", fontWeight: 700, fontSize: "0.78rem" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 16 }}
            >
              <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              <RocketLaunch sx={{ fontSize: 16, color: "#d97706" }} />
              Available for Projects
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemAnim}
              className="text-4xl lg:text-5xl font-extrabold leading-tight mb-2 tracking-tight"
              style={{ color: "#00334e" }}
            >
              Hi! I'm{" "}
              <motion.span
                style={{ color: "#c00014", display: "inline-block" }}
                animate={{ rotate: [0, 0, -4, 4, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
              >
                Smit Kava
              </motion.span>
              <span className="flex items-center gap-1 text-2xl lg:text-3xl font-bold mt-1" style={{ color: "#006494" }}>
                <Code sx={{ fontSize: "1.1rem" }} />
                Full-Stack Developer
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemAnim}
              className="flex items-center gap-2 mb-3 min-h-[26px]"
              style={{ fontFamily: "'Comic Neue',cursive", fontWeight: 700, fontSize: "0.95rem", color: "#006494" }}
            >
              <AutoAwesome sx={{ fontSize: 18, color: "#fcd400" }} />
              <span style={{ borderRight: "2.5px solid #006494", paddingRight: 3 }}>{typeText}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemAnim}
              className="text-[0.87rem] leading-relaxed max-w-[380px] mb-5"
              style={{ fontFamily: "'Comic Neue',cursive", color: "#141d21" }}
            >
              MCA Student at ISTAR College &bull; CGPA 8.80<br />
              Building modern web apps with React.js, TypeScript &amp; .NET Core — turning ideas into clean, functional digital experiences.
            </motion.p>

            {/* Pills */}
            <motion.div variants={itemAnim} className="flex flex-wrap gap-2 mb-5">
              <Pill icon={<Widgets sx={{ fontSize: 14 }} />} label="React.js" />
              <Pill icon={<DataObject sx={{ fontSize: 14 }} />} label="TypeScript" />
              <Pill icon={<Api sx={{ fontSize: 14 }} />} label=".NET Core" />
              <Pill icon={<Storage sx={{ fontSize: 14 }} />} label="SQL Server" />
              <Pill icon={<Palette sx={{ fontSize: 14 }} />} label="Tailwind CSS" />
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemAnim} className="flex gap-3 flex-wrap mb-5">
              <motion.button
                onClick={() => scrollTo("skills")}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm"
                style={{ background: "#006494", fontFamily: "'Baloo 2',cursive", boxShadow: "0 4px 16px rgba(0,100,148,.35)" }}
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,100,148,.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Inventory2 sx={{ fontSize: 18 }} />
                Explore Pocket
              </motion.button>
              <motion.button
                onClick={() => scrollTo("experience")}
                className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm"
                style={{ border: "2.5px solid #006494", background: "transparent", color: "#006494", fontFamily: "'Baloo 2',cursive" }}
                whileHover={{ y: -3, background: "#006494", color: "white" }}
                whileTap={{ scale: 0.97 }}
              >
                <Timeline sx={{ fontSize: 18 }} />
                See Journey
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemAnim} className="flex gap-2.5 flex-wrap">
              <Stat icon={<School sx={{ fontSize: 18 }} />} num="8.80" label="MCA CGPA" />
              <Stat icon={<Grade sx={{ fontSize: 18 }} />} num="7.62" label="B.Sc CGPA" />
              <Stat icon={<Work sx={{ fontSize: 18 }} />} num="5+" label="Projects" />
              <Stat icon={<Layers sx={{ fontSize: 18 }} />} num="3+" label="Tech Stack" />
            </motion.div>
          </motion.div>

          {/* ── Right ────────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Character card */}
            <motion.div
              className="relative flex flex-col items-center rounded-[28px] p-5 w-[268px]"
              style={{ background: "rgba(255,255,255,0.6)", border: "2px solid rgba(0,100,148,0.15)", boxShadow: "0 12px 40px rgba(0,100,148,0.14)" }}
              animate={{ y: [0, -13, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={doremonImg}
                alt="Doraemon on broom"
                className="w-[200px] h-[210px] object-contain"
                style={{ filter: "drop-shadow(0 8px 20px rgba(0,100,148,0.25))" }}
              />
              <div className="flex items-center gap-1 text-blue-700 font-bold text-[0.74rem] mt-2" style={{ fontFamily: "'Baloo 2',cursive" }}>
                <Star sx={{ fontSize: 14, color: "#fcd400" }} />
                Doraemon Mode : ON
              </div>
            </motion.div>

            {/* Floating tags */}
            <FloatTag className="border-2 border-yellow-300 text-amber-900 top-3 -right-4" delay={0}>
              <LocationOn sx={{ fontSize: 14, color: "#d97706" }} />
              ISTAR College
            </FloatTag>
            <FloatTag className="border-2 border-blue-300 text-blue-900 top-[100px] -right-6" delay={1}>
              <LaptopMac sx={{ fontSize: 14, color: "#006494" }} />
              React + .NET
            </FloatTag>
            <FloatTag className="border-2 border-green-300 text-green-900 bottom-[72px] -right-5" delay={0.5}>
              <MenuBook sx={{ fontSize: 14, color: "#15803d" }} />
              MCA Student
            </FloatTag>
          </motion.div>
        </div>
      </section>

      {/* ── Info Band ────────────────────────────────────────────────────── */}
      <div
        className="w-full py-4 border-t-2 border-dashed"
        style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(0,100,148,0.2)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-5 items-center">
          {[
            { icon: <RocketLaunch sx={{ fontSize: 18 }} />, bg: "#006494", title: "22nd Century Tech", sub: "From the future" },
            { icon: <Code sx={{ fontSize: 18 }} />, bg: "#c00014", title: "Full-Stack Builder", sub: "React · TypeScript · .NET Core" },
            { icon: <EmojiEvents sx={{ fontSize: 18 }} />, bg: "#15803d", title: "Distinction Holder", sub: "B.Sc IT · Charusat University" },
            { icon: <LocationCity sx={{ fontSize: 18 }} />, bg: "#7c3aed", title: "Vallabh Vidyanagar", sub: "Gujarat, India" },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: item.bg }}>
                {item.icon}
              </div>
              <div>
                <div className="text-[0.78rem] font-bold text-blue-900" style={{ fontFamily: "'Baloo 2',cursive" }}>{item.title}</div>
                <div className="text-[10px] text-slate-500" style={{ fontFamily: "'Comic Neue',cursive" }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-[0.78rem] font-bold" style={{ fontFamily: "'Baloo 2',cursive" }}>
            <Stars sx={{ fontSize: 15, color: "#fcd400" }} />
            CGPA 8.80
          </div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────────────────── */}
      <motion.div
        className="flex items-center justify-center gap-1.5 py-3 text-slate-400 text-[11px]"
        style={{ fontFamily: "'Comic Neue',cursive" }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <KeyboardDoubleArrowDown sx={{ fontSize: 16 }} />
        Scroll to explore the 4D pocket
        <KeyboardDoubleArrowDown sx={{ fontSize: 16 }} />
      </motion.div>

      {/* ── Bell FAB ──────────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => scrollTo("contact")}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center z-50 overflow-visible"
        style={{ background: "rgba(252,212,0,0.3)", border: "3px solid #fcd400", boxShadow: "0 4px 18px rgba(252,212,0,.5)" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: [0, 0, -18, 18, -9, 9, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <NotificationsActive sx={{ fontSize: 24, color: "#00334e" }} />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-300"
          animate={{ scale: [1, 2.1, 2.1], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.button>
    </>
  )
}