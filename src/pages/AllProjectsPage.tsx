import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Layers, ExternalLink, RocketLaunch, Search } from "@/components/ui/GlobalIcons"
import { FaGithub, WebIcon, DesktopIcon, MobileIcon, AndroidIcon } from "@/components/ui/GlobalIcons"
import { Link } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import { ALL_PROJECTS, type Project } from "@/data/projects"
import { useState } from "react"

// ── Filter config ────────────────────────────────────────────────────────────
const FILTERS = [
  { label: "All", value: "All", icon: RocketLaunch, color: "#006494" },
  { label: "Web", value: "Web", icon: WebIcon, color: "#0284c7" },
  { label: "Android", value: "Android", icon: AndroidIcon, color: "#16a34a" },
  { label: "Mobile", value: "Mobile", icon: MobileIcon, color: "#7c3aed" },
  { label: "Desktop", value: "Desktop", icon: DesktopIcon, color: "#b45309" },
] as const
type FilterValue = (typeof FILTERS)[number]["value"]

// ── Platform icon ────────────────────────────────────────────────────────────
function PlatformIcon({ platform }: { platform?: string }) {
  if (platform === "Web")     return <WebIcon     sx={{ fontSize: 12 }} />
  if (platform === "Desktop") return <DesktopIcon  sx={{ fontSize: 12 }} />
  if (platform === "Android") return <AndroidIcon  sx={{ fontSize: 12 }} />
  return <MobileIcon sx={{ fontSize: 12 }} />
}

// ── Compact Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      key={project.title}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.38 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm overflow-hidden flex flex-col"
      style={{ transition: "box-shadow 0.25s" }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-36">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm ${project.badgeColor}`}>
            {project.category}
          </span>
          {project.platform && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/85 text-gray-700 shadow-sm">
              <PlatformIcon platform={project.platform} />
              {project.platform}
            </span>
          )}
        </div>

        {/* Live / Date */}
        <div className="absolute top-3 right-3">
          {project.isLive ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500 text-white rounded-full text-[10px] font-bold shadow-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-semibold text-gray-600">
              <Calendar className="w-2.5 h-2.5" />
              {project.date}
            </span>
          )}
        </div>

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 gap-2">
          {project.isLive && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white text-[11px] font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full hover:bg-white/35 transition-colors"
            >
              Visit <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white text-[11px] font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full hover:bg-white/35 transition-colors"
            >
              GitHub <FaGithub className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h3 className="text-gray-900 font-bold text-sm leading-snug line-clamp-2">{project.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-md">
              <Layers className="w-2.5 h-2.5" />
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded-md">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── All Projects Page ────────────────────────────────────────────────────────
export default function AllProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All")

  const filtered =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.platform === activeFilter)

  const activeConf = FILTERS.find((f) => f.value === activeFilter)!
  const ActiveIcon = activeConf.icon

  return (
    <div
      className="min-h-screen relative pt-20"
      style={{ fontFamily: "'Baloo 2', cursive" }}
    >
      {/* ── Page Hero Header ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <h1
            className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2"
            style={{ color: "#00334e" }}
          >
            All{" "}
            <span style={{ color: "#006494" }}>Projects</span>
          </h1>
          <p
            className="text-slate-500 font-medium text-sm mb-8"
            style={{ fontFamily: "'Comic Neue', cursive" }}
          >
            {ALL_PROJECTS.length} projects across Web, Android, Mobile &amp; Desktop
          </p>
        </motion.div>

        {/* ── Attractive Filter Pills ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="flex flex-wrap gap-3"
        >
          {FILTERS.map((f) => {
            const count =
              f.value === "All"
                ? ALL_PROJECTS.length
                : ALL_PROJECTS.filter((p) => p.platform === f.value).length
            if (count === 0) return null
            const isActive = activeFilter === f.value
            const IconComp = f.icon
            return (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all duration-200 shadow-sm"
                style={{
                  borderColor: isActive ? f.color : "rgba(0,100,148,0.15)",
                  background: isActive ? f.color : "rgba(255,255,255,0.7)",
                  color: isActive ? "white" : f.color,
                  boxShadow: isActive
                    ? `0 4px 16px ${f.color}40`
                    : "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <IconComp sx={{ fontSize: 16 }} />
                <span>{f.label}</span>
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : `${f.color}18`,
                    color: isActive ? "white" : f.color,
                  }}
                >
                  {count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active filter result line */}
        <motion.p
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs font-semibold flex items-center gap-1"
          style={{ color: activeConf.color, fontFamily: "'Comic Neue', cursive" }}
        >
          <ActiveIcon sx={{ fontSize: 14 }} /> Showing {filtered.length} {activeFilter === "All" ? "total" : activeFilter} project{filtered.length !== 1 ? "s" : ""}
        </motion.p>
      </div>

      {/* ── Project Grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3"
            >
              <Search sx={{ fontSize: 48, color: "#64748b" }} />
              <p className="font-semibold">No projects found for this filter.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
