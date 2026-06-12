import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "@/components/ui/GlobalIcons"
import { useEffect } from "react"

interface DetailDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  date?: string
  badge?: string
  description: string
  accentColor?: string
  icon?: React.ReactNode
  website?: string | null
}

export default function DetailDialog({
  isOpen,
  onClose,
  title,
  subtitle,
  date,
  badge,
  description,
  accentColor = "#00a0e9",
  icon,
  website,
}: DetailDialogProps) {
  // Prevent body scrolling when the dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000a14]/70 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-[#00172c] border rounded-2xl flex flex-col overflow-hidden shadow-2xl z-10"
            style={{ borderColor: `${accentColor}44` }}
          >
            {/* Accent colored top bar glow */}
            <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />

            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-[#002f5c] bg-[#000c17]/60">
              <div className="flex gap-3 items-start pr-4">
                {icon && (
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {icon}
                  </div>
                )}
                <div className="flex flex-col">
                  {badge && (
                    <span 
                      className="inline-self-start text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-1.5"
                      style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                      {badge}
                    </span>
                  )}
                  <h3 className="font-bold text-xl text-white leading-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <span className="text-sm text-gray-400 mt-0.5">
                      {subtitle}
                    </span>
                  )}
                  {date && (
                    <span className="text-xs font-semibold text-gray-500 mt-1">
                      {date}
                    </span>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content / Description */}
            <div className="px-6 py-6 overflow-y-auto max-h-[50vh] text-gray-300 text-sm leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{description}</p>
            </div>

            {/* Footer / Actions */}
            {website && (
              <div className="px-6 py-4 border-t border-[#002f5c] bg-[#000c17]/30 flex justify-end">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all hover:brightness-110"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 80%, #000) 100%)`,
                    boxShadow: `0 4px 12px ${accentColor}25`,
                  }}
                >
                  Visit Website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
