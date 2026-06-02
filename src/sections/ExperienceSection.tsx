import { motion } from "framer-motion"
import { GraduationCap, Check } from "lucide-react"

const education = [
  {
    degree: "Master's Degree (MSc IT)",
    year: "2020",
    institution: "ISTAR Institute",
    description: "Advanced specialization in distributed systems and software architecture, graduating with top honors.",
    nodeColor: "bg-[#005b8f]",
    nodeIcon: Check,
    alignment: "right"
  },
  {
    degree: "BSc IT",
    year: "2018",
    institution: "Charusat University",
    description: "Laying the foundation of programming logic, data structures, and computer science fundamentals.",
    nodeColor: "bg-[#e60000]",
    nodeIcon: GraduationCap,
    alignment: "left"
  }
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="text-center mb-20 flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center text-doraemon-yellow mb-4">
          <GraduationCap className="w-10 h-10" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 tracking-tight"
        >
          Academic Foundation
        </motion.h2>
      </div>

      <div className="relative">
        {/* Timeline central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>

        <div className="space-y-12">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`flex items-center justify-between w-full ${item.alignment === "right" ? "flex-row-reverse" : "flex-row"
                }`}
            >
              {/* Empty half for spacing */}
              <div className="w-5/12"></div>

              {/* Node */}
              <div className="z-10 w-8 h-8 flex items-center justify-center rounded-full border-4 border-[#f4f7fb] shadow-sm bg-white">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${item.nodeColor}`}>
                  <item.nodeIcon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Card */}
              <div className="w-5/12">
                <div className={`animate-float${i % 2 === 0 ? '-slow' : '-delayed'} h-full`}>
                  <div className="bg-white/60 backdrop-blur-md p-6 rounded-[1.5rem] shadow-sm border border-white/50 hover:shadow-md transition-shadow h-full">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={`text-xl font-bold ${item.alignment === "right" ? "text-[#005b8f]" : "text-[#e60000]"}`}>
                        {item.degree}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-gray-900 font-bold mb-3">{item.institution}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
