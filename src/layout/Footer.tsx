import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaInstagram, FaFileAlt } from "@/components/ui/GlobalIcons"
import logoSmit from "@/assets/logo_smit.svg"

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/smit-kava",
    icon: FaGithub,
    color: "hover:bg-[#333333] hover:border-[#333333] hover:text-white"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/smitkava/",
    icon: FaLinkedin,
    color: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/smit__603/",
    icon: FaInstagram,
    color: "hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent"
  },
  {
    name: "Resume",
    url: "/Smit_Kava_Resume.pdf",
    icon: FaFileAlt,
    color: "hover:bg-doraemon-blue hover:border-doraemon-blue hover:text-white"
  }
]

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest full-width py-lg mt-xl border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto space-y-md md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-2">
          <img
            src={logoSmit}
            alt="Smit Kava — SK Code Bracket Logo"
            className="h-8 w-auto object-contain"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,100,148,0.18))" }}
          />
          <p className="font-body-md text-body-md text-on-surface-variant">© {new Date().getFullYear()} Built with 4D Magic Pocket Technology</p>
        </div>
        <div className="flex space-x-4">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 transition-all duration-300 ${link.color}`}
              >
                <Icon className="w-5 h-5" />
                {/* Tooltip */}
                <span className="absolute -top-10 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {link.name}
                  {/* Tooltip Triangle */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

