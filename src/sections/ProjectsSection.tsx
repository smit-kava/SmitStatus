import { motion } from "framer-motion"
import { ArrowRight, Calendar, Layers, ExternalLink, Eye, FaGithub } from "@/components/ui/GlobalIcons"
import { Link } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import { FEATURED_PROJECTS } from "@/data/projects"

// ── Platform badge icon map ──────────────────────────────────────────────────
const platformIcon: Record<string, string> = {
  Android: "🤖",
  Mobile: "📱",
  Web: "🌐",
  Desktop: "🖥️",
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-2 tracking-tight"
          >
            Gadget Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium"
          >
            Live products, internship work & personal projects
          </motion.p>
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={ROUTES.PROJECTS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #006494 0%, #0080c8 100%)",
              boxShadow: "0 4px 14px rgba(0,100,148,0.3)",
            }}
          >
            <Eye className="w-4 h-4" />
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* ── 3 Featured Gadget Cards ─────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PROJECTS.map((project, i) => (
          <div key={project.title} className={`animate-float${i % 3 === 0 ? "-slow" : i % 3 === 1 ? "-delayed" : ""}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/60 backdrop-blur-md rounded-4xl shadow-sm border border-white/50 transition-all duration-300 hover:shadow-xl overflow-hidden h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-4/3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm ${project.badgeColor}`}>
                    {project.category}
                  </span>
                  {project.platform && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/85 backdrop-blur-sm text-gray-700 shadow-sm">
                      {platformIcon[project.platform] ?? "💡"} {project.platform}
                    </span>
                  )}
                </div>

                {/* Live / Date badge */}
                <div className="absolute top-4 right-4">
                  {project.isLive ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      Live
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 gap-2">
                  {project.isLive && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Site <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub <FaGithub className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-gray-900 font-bold text-lg leading-snug">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {project.tech.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
                      <Layers className="w-3 h-3" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <Link
          to={ROUTES.PROJECTS}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all duration-200"
          style={{ borderColor: "#006494", color: "#006494" }}
        >
          See All {8} Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
