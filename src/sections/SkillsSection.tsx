import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Terminal, Database, Server, Cpu, Layout, FileCode2, Zap, GitBranch, Globe } from "@/components/ui/GlobalIcons"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const gadgets = [
  {
    name: "React.js",
    description: "Front-end Engine",
    icon: Code2,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    hoverBg: "group-hover:bg-[#00a0e9]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-[#005b8f]",
  },
  {
    name: "TypeScript",
    description: "Type-safe Code",
    icon: FileCode2,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50",
    hoverBg: "group-hover:bg-[#3178C6]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-blue-700",
  },
  {
    name: "JavaScript (ES6+)",
    description: "Interactive Engine",
    icon: Zap,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-50",
    hoverBg: "group-hover:bg-[#f7df1e]",
    hoverIconColor: "group-hover:text-black",
    textColor: "text-yellow-700",
  },
  {
    name: "HTML5 & CSS3",
    description: "Web Structure & Style",
    icon: Layout,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#e34c26]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-orange-600",
  },
  {
    name: ".NET Core Web API",
    description: "REST API Architecture",
    icon: Server,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    hoverBg: "group-hover:bg-[#512BD4]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-purple-700",
  },
  {
    name: "Node.js & Express.js",
    description: "MERN Backend Runtime",
    icon: Globe,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    hoverBg: "group-hover:bg-[#339933]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-teal-700",
  },
  {
    name: "SQL Server & MongoDB",
    description: "Relational & NoSQL Vault",
    icon: Database,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    hoverBg: "group-hover:bg-[#CC2927]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-red-700",
  },
  {
    name: "PostgreSQL & MySQL",
    description: "Database Systems",
    icon: Database,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    hoverBg: "group-hover:bg-[#336791]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-blue-800",
  },
  {
    name: "Java, Python, C & C++",
    description: "Programming Fundamentals",
    icon: Terminal,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    hoverBg: "group-hover:bg-[#3776AB]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-green-700",
  },
  {
    name: "Git, Visual Studio & Postman",
    description: "Dev & API Toolkit",
    icon: GitBranch,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#F05032]",
    hoverIconColor: "group-hover:text-white",
    textColor: "text-orange-700",
  },
]

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header animation
    gsap.fromTo('.skills-header', 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
      }
    );

    // Cards stagger
    gsap.fromTo('.skills-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: "top 70%", once: true }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <h2 className="skills-header opacity-0 text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          My Digital Gadgetry
        </h2>
        <p className="skills-header opacity-0 text-sm font-bold tracking-widest text-gray-500 uppercase">
          THE TOOLS IN MY 4D POCKET
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gadgets.map((gadget, i) => (
          <div key={gadget.name} className={`animate-float${i % 3 === 0 ? '' : i % 3 === 1 ? '-delayed' : '-slow'}`}>
            <div className="skills-card opacity-0 group bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/50 transition-all duration-300 h-full cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5">
              <div className={`w-14 h-14 rounded-full ${gadget.iconBg} ${gadget.hoverBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
                <gadget.icon className={`w-6 h-6 ${gadget.iconColor} ${gadget.hoverIconColor} transition-colors duration-300`} />
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${gadget.textColor}`}>
                {gadget.name}
              </h3>
              <p className="text-gray-500 font-medium">{gadget.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
