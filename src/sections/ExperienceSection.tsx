import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Check, Star, Briefcase, ExternalLink } from "lucide-react"

const timeline = [
  {
    degree: "Software Developer Intern",
    year: "Dec 2024 – Present",
    institution: "Etech International Pvt. Ltd.",
    description: "Completed 6 months of internship and currently continuing. Working on VumaxPro — real-time drilling data visualization for the VHTracks platform. Building live monitoring dashboards for oil & gas drilling operations.",
    nodeColor: "bg-green-500",
    nodeIcon: Briefcase,
    alignment: "right",
    website: "https://www.etechinter.com",
    isCurrent: true,
    badgeLabel: "CURRENTLY WORKING",
  },
  {
    degree: "Master of Computer Applications (MCA)",
    year: "2024 – 2026",
    institution: "ISTAR College, Vallabh Vidyanagar",
    description: "Currently pursuing MCA. Overall CGPA: 9.00 | Latest SGPA: 8.45. Focused on advanced software engineering, full-stack web development, and backend API design.",
    nodeColor: "bg-[#006494]",
    nodeIcon: Check,
    alignment: "left",
    website: null,
    isCurrent: true,
    badgeLabel: "Complete",
  },
  {
    degree: "Bachelor of Science in IT (B.Sc. IT)",
    year: "2022 – 2024",
    institution: "Charusat University, Changa",
    description: "Graduated with distinction. CGPA: 7.62. Built strong foundations in programming, data structures, databases, web technologies, and core computer science principles.",
    nodeColor: "bg-[#c00014]",
    nodeIcon: GraduationCap,
    alignment: "right",
    website: null,
    isCurrent: false,
    badgeLabel: null,
  },
  {
    degree: "Higher Secondary (12th Standard)",
    year: "May 2021",
    institution: "Science Stream",
    description: "Completed higher secondary education with a science focus, cultivating analytical thinking and problem-solving skills that form the backbone of technology studies.",
    nodeColor: "bg-[#fcd400]",
    nodeIcon: BookOpen,
    alignment: "left",
    website: null,
    isCurrent: false,
    badgeLabel: null,
  },
  {
    degree: "Secondary School (10th Standard)",
    year: "March 2019",
    institution: "General Education",
    description: "Completed secondary school, building a strong academic foundation with a focus on mathematics, science, and logical reasoning.",
    nodeColor: "bg-[#10b981]",
    nodeIcon: Star,
    alignment: "right",
    website: null,
    isCurrent: false,
    badgeLabel: null,
  },
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
          Journey & Experience
        </motion.h2>
        <p className="text-gray-500 text-base mt-2 font-medium">Internship · Education · Milestones</p>
      </div>

      <div className="relative">
        {/* Timeline central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`flex items-center justify-between w-full ${item.alignment === "right" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Empty half */}
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
                  <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-shadow h-full">

                    {/* Active badge */}
                    {item.badgeLabel && (
                      <div className="mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${item.isCurrent && item.nodeColor === "bg-green-500" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {item.isCurrent && item.nodeColor === "bg-green-500" && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                          )}
                          {item.badgeLabel}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={`text-xl font-bold ${item.alignment === "right" ? "text-[#006494]" : "text-[#c00014]"}`}>
                        {item.degree}
                      </h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md whitespace-nowrap shrink-0">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-gray-900 font-bold">{item.institution}</h4>
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-doraemon-blue hover:text-doraemon-blue/70 transition-colors"
                          title="Visit company website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

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
