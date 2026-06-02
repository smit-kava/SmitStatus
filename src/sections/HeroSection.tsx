import { motion } from "framer-motion"
import { Star, Bell, Rocket } from "lucide-react"
import heroImage from "@/assets/hero_image.png"

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section id="home" className="min-h-[90vh] pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative flex flex-col justify-center w-full z-0">
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
              Full Stack Developer & Software Architect. I build scalable, delightful tools that feel like magic from a 4D pocket, turning complex problems into simple solutions.
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

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative z-10 flex justify-center lg:justify-end"
        >
          <div className="w-4/5 sm:w-3/4 lg:w-[85%] relative group cursor-pointer">
            <div className="animate-float-delayed">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00334e]/10 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 -z-10 blur-xl transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>
              <img
                src={heroImage}
                alt="Futuristic Developer Setup"
                className="w-full h-auto rounded-[2.5rem] shadow-2xl object-cover transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Bell Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollTo("contact")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-doraemon-yellow rounded-full shadow-lg shadow-yellow-500/30 flex items-center justify-center z-50 cursor-pointer"
      >
        <Bell className="w-6 h-6 text-yellow-900" fill="currentColor" />
      </motion.button>
    </section>

    {/* Full Width Bottom Information Block */}
    <div className="w-full bg-[#f0f5fa] py-16 sm:py-20 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
        <div className="flex-1 relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <Rocket className="w-6 h-6 text-doraemon-red shrink-0 mt-1" />
            <h2 className="text-2xl lg:text-3xl font-bold text-doraemon-blue leading-tight max-w-[15ch]">
              From the 22nd Century of Tech
            </h2>
          </div>
          <div className="w-12 h-1.5 bg-doraemon-yellow rounded-full ml-9"></div>
        </div>
        <div className="flex-1 relative z-10">
          <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
            As a seasoned Software Architect and Full Stack Developer, I approach every codebase as if it were a high-tech gadget meant to change lives. My philosophy is rooted in "Helpful Innovation"—building systems that are not just technically robust, but intuitively useful. With over a decade of experience navigating the ever-evolving tech landscape, I specialize in bridging the gap between futuristic vision and present-day execution.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
