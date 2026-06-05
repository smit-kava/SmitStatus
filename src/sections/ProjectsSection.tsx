import { motion } from "framer-motion"
import { ArrowRight, Calendar, Layers, ExternalLink } from "lucide-react"

const showcase = [
  {
    title: "AksharSync – Digital Marketing Platform",
    category: "LIVE",
    date: "2025",
    badgeColor: "bg-doraemon-yellow text-yellow-900",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    description: "Live digital marketing platform providing SEO, social media management, content strategy, and analytics services. A professional web presence built for real business impact.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    link: "https://www.aksharsync.com",
    isLive: true,
  },
  {
    title: "VumaxPro – Real-Time Drilling Data Visualization",
    category: "INTERNSHIP",
    date: "2025",
    badgeColor: "bg-orange-500 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    description: "Real-time drilling data visualization system built at Etech International Pvt. Ltd. for the VHTracks platform. Live dashboards for oil & gas drilling operations with dynamic charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    link: "https://www.etechinter.com",
    isLive: true,
  },
  {
    title: "College Attendance Management System",
    category: "WEB APP",
    date: "Apr 2025",
    badgeColor: "bg-green-600 text-white",
    tech: ["React.js", ".NET Core", "SQL Server", "TypeScript"],
    description: "Full-stack college attendance system enabling faculty to mark, view, and analyze student attendance with a clean, responsive interface.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
  },
  {
    title: "User Management System",
    category: "WEB APP",
    date: "May 2024",
    badgeColor: "bg-doraemon-red text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    description: "Web-based user management system with CRUD operations using a modern React + TypeScript UI and secure RESTful APIs with third-party auth integration.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
  },
  {
    title: "Library Management System",
    category: "DESKTOP APP",
    date: "Jan 2024",
    badgeColor: "bg-doraemon-blue text-white",
    tech: ["C# .NET", "Windows Forms", "SQL Server"],
    description: "Desktop-based library management system to manage book records with CRUD operations, date/time logging, and data validation built with C# & SQL Server.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
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

        <motion.a
          href="https://www.aksharsync.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-doraemon-blue font-bold hover:opacity-80 transition-opacity"
        >
          AksharSync.com <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showcase.map((project, i) => (
          <div key={project.title} className={`animate-float${i % 3 === 0 ? '-slow' : i % 3 === 1 ? '-delayed' : ''}`}>
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
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm ${project.badgeColor}`}>
                    {project.category}
                  </span>
                </div>

                {/* Live pulse indicator OR date */}
                <div className="absolute top-4 right-4">
                  {project.isLive ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
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

                {/* Hover overlay with link */}
                {project.isLive && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white text-sm font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
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
    </section>
  )
}
