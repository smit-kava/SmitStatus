import { motion } from "framer-motion"
import { Star, Bell, Rocket } from "lucide-react"
import heroImage from "@/assets/smit_hero_image.png"

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section id="home" className="min-h-[100vh] pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative flex flex-col justify-center w-full z-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full relative z-10">
          {/* Left Content */}
          <motion.div
            className="w-full min-w-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="animate-float">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#854d0e] text-sm font-semibold mb-4 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                Available for 22nd Century Projects
              </div>

              <h1 className="text-4xl lg:text-[3rem] font-extrabold text-gray-900 leading-[1.1] mb-4 tracking-tight">
                Crafting <span className="text-doraemon-blue">Digital Gadgets</span><br />
                with Precision
              </h1>

              <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-[36rem] leading-relaxed">
                MCA Student & Aspiring Full-Stack Developer. I build modern web apps using React.js, TypeScript, and .NET Core Web API — turning ideas into clean, functional digital experiences.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("skills")}
                  className="bg-[#005b8f] hover:bg-[#004770] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Explore Pocket
                </button>
                <button
                  onClick={() => scrollTo("experience")}
                  className="border-2 border-[#005b8f] text-[#005b8f] px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-all duration-200"
                >
                  See My Journey
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Image - Custom SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative z-10 flex justify-center lg:justify-end"
          >
            <div className="w-full sm:w-[90%] lg:w-[95%] relative group cursor-pointer">
              <div className="animate-float-delayed">
                <div className="absolute inset-0 bg-linear-to-tr from-[#00334e]/10 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 -z-10 blur-xl transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>

                <div className="w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] bg-white shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100">
                  {/* Background decorative circles */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-doraemon-blue/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-doraemon-yellow/20 rounded-full blur-3xl"></div>

                  {/* SVG Illustration */}
                  <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-md z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Monitor */}
                    <rect x="50" y="40" width="300" height="180" rx="12" fill="#1e293b" />
                    <rect x="60" y="50" width="280" height="150" rx="8" fill="#0f172a" />
                    {/* Stand */}
                    <path d="M180 220 L220 220 L230 260 L170 260 Z" fill="#94a3b8" />
                    <rect x="140" y="260" width="120" height="10" rx="4" fill="#64748b" />

                    {/* Screen Content - Code Lines */}
                    <rect x="80" y="70" width="140" height="8" rx="4" fill="#3b82f6" opacity="0.8" />
                    <rect x="80" y="90" width="100" height="8" rx="4" fill="#10b981" opacity="0.8" />
                    <rect x="100" y="110" width="120" height="8" rx="4" fill="#eab308" opacity="0.8" />
                    <rect x="100" y="130" width="80" height="8" rx="4" fill="#ef4444" opacity="0.8" />
                    <rect x="80" y="150" width="160" height="8" rx="4" fill="#8b5cf6" opacity="0.8" />

                    {/* Smit Kava Text Logo on Screen */}
                    <text x="270" y="125" fontFamily="monospace" fontSize="32" fontWeight="bold" fill="var(--color-primary)" textAnchor="middle">My</text>
                    <text x="270" y="145" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">Portfolio</text>

                    {/* Floating elements */}
                    <circle cx="340" cy="70" r="15" fill="var(--color-doraemon-yellow)" opacity="0.2" />
                    <path d="M335 65 L345 75 M345 65 L335 75" stroke="var(--color-doraemon-yellow)" strokeWidth="2" strokeLinecap="round" />

                    <rect x="30" y="180" width="30" height="30" rx="8" fill="var(--color-primary)" opacity="0.2" />
                    <text x="45" y="200" fontFamily="monospace" fontSize="16" fontWeight="bold" fill="var(--color-primary)" textAnchor="middle">{"{}"}</text>
                  </svg>


                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Bell Button with Vibration */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollTo("contact")}
          className="fixed bottom-8 right-8 w-14 h-14 bg-doraemon-yellow rounded-full shadow-lg shadow-yellow-500/30 flex items-center justify-center z-50 cursor-pointer overflow-visible"
        >
          {/* Ringing Bell Icon */}
          <motion.div
            animate={{
              rotate: [0, -20, 20, -15, 15, -10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ originX: 0.5, originY: 0.2 }}
          >
            <Bell className="w-6 h-6 text-yellow-900" fill="currentColor" />
          </motion.div>

          {/* Pulsing Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400"
            animate={{
              scale: [1, 1.6, 1.6],
              opacity: [0.8, 0, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.button>
      </section>

      {/* Full Width Bottom Information Block */}
      <div className="w-full bg-[#f0f5fa] py-16 sm:py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          <div className="flex-1 relative z-10">
            <div className="flex items-start gap-2 mb-4">
              <Rocket className="w-10 h-10 text-doraemon-red shrink-0 mt-3" />
              <h1 className="text-2xl lg:text-4xl font-bold text-doraemon-blue leading-tight">
                From the 22nd Century of <br /> Tech
              </h1>
            </div>
            <div className="w-12 h-1.5 bg-doraemon-yellow rounded-full ml-14"></div>
          </div>
          <div className="flex-1 relative z-10">
            <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
              Currently pursuing my MCA at ISTAR College, Vallabh Vidyanagar with a CGPA of 8.80 in Semester II. I hold a B.Sc. IT with distinction from Charusat University (CGPA 7.62) and am actively learning and building real-world projects using React.js, TypeScript, .NET Core Web API, and SQL Server. I'm passionate about clean code, intuitive UX, and growing as a developer every single day.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
