import { motion } from "framer-motion"
import { Code2, Terminal, Database, Cloud } from "lucide-react"

const gadgets = [
  {
    name: "React",
    description: "Front-end Engine",
    icon: Code2,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    textColor: "text-[#005b8f]",
  },
  {
    name: "Python",
    description: "Logic & AI Core",
    icon: Terminal,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    name: "PostgreSQL",
    description: "Infinite Memory",
    icon: Database,
    iconColor: "text-yellow-700",
    iconBg: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    name: "AWS",
    description: "Cloud Skyreach",
    icon: Cloud,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    textColor: "text-[#005b8f]",
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-2 tracking-tight"
        >
          My Digital Gadgetry
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold tracking-widest text-gray-500 uppercase"
        >
          THE TOOLS IN MY 4D POCKET
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gadgets.map((gadget, i) => (
          <div key={gadget.name} className={`animate-float${i % 3 === 0 ? '' : i % 3 === 1 ? '-delayed' : '-slow'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 h-full"
            >
              <div className={`w-14 h-14 rounded-full ${gadget.iconBg} flex items-center justify-center mb-6`}>
                <gadget.icon className={`w-6 h-6 ${gadget.iconColor}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${gadget.textColor}`}>
                {gadget.name}
              </h3>
              <p className="text-gray-500 font-medium">{gadget.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
