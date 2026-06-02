import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

const showcase = [
  {
    title: "AI Dashboard Analytics",
    category: "ACTIVE GADGET",
    badgeColor: "bg-doraemon-yellow text-yellow-900",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    link: "#",
  },
  {
    title: "E-Commerce Platform",
    category: "TOP RATED",
    badgeColor: "bg-doraemon-red text-white",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    link: "#",
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
            Featured inventions and digital solutions
          </motion.p>
        </div>

        <motion.a
          href="#"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-[#005b8f] font-bold hover:text-blue-900 transition-colors"
        >
          View All Gadgets <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {showcase.map((project, i) => (
          <div key={project.title} className={`animate-float${i % 2 === 0 ? '-slow' : '-delayed'}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group block relative bg-white/60 backdrop-blur-md rounded-[2rem] p-4 shadow-sm border border-white/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-sm ${project.badgeColor}`}>
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-8">
                  <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
