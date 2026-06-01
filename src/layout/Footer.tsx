import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest full-width py-lg mt-xl border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto space-y-md md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="font-headline-sm text-headline-sm text-primary">DoraemonDev</span>
          <p className="font-body-md text-body-md text-on-surface-variant">© {new Date().getFullYear()} Built with 4D Magic Pocket Technology</p>
        </div>
        <div className="flex space-x-lg">
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }}
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 font-semibold"
          >
            GitHub
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }}
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 font-semibold"
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ y: -2 }}
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 font-semibold"
          >
            Resume
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
