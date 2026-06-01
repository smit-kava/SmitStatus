import { motion } from "framer-motion"
import { Star, Bell } from "lucide-react"
import heroImage from "@/assets/hero_image.png"

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative flex flex-col justify-center w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          className="w-full min-w-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#854d0e] text-sm font-semibold mb-6 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            Available for 22nd Century Projects
          </div>

          <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Crafting <span className="text-doraemon-blue">Digital Gadgets</span><br />
            with Precision
          </h1>

          <p className="text-xl font-bold text-doraemon-blue mb-3">
            Full Stack Developer & Software Architect
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-[32rem] leading-relaxed">
            I build scalable, delightful tools that feel like magic from a 4D pocket, turning complex problems into simple solutions.
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
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full min-w-0 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-doraemon-blue/20 to-transparent rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 blur-xl"></div>
          <img
            src={heroImage}
            alt="Futuristic Developer Setup"
            className="w-full h-auto rounded-[2.5rem] shadow-2xl border-4 border-white object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom Information Block */}


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
  )
}
