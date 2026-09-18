import { X, FileText } from "@/components/ui/GlobalIcons"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // Prevent body scrolling when the modal is open
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

  useGSAP(() => {
    if (isOpen) {
      setShouldRender(true)
      gsap.fromTo('.resume-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.resume-dialog', { opacity: 0, scale: 0.95, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
    } else if (shouldRender) {
      const tl = gsap.timeline({ onComplete: () => setShouldRender(false) })
      tl.to('.resume-dialog', { opacity: 0, scale: 0.95, y: 15, duration: 0.3, ease: "power2.in" }, 0)
      tl.to('.resume-backdrop', { opacity: 0, duration: 0.3 }, 0)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div ref={containerRef}>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop blur */}
        <div
          onClick={onClose}
          className="resume-backdrop absolute inset-0 bg-[#000a14]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <div
          className="resume-dialog relative w-full max-w-4xl h-[80vh] md:h-[85vh] bg-[#00172c] border border-[#002f5c] rounded-2xl flex flex-col overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#002f5c] bg-[#000c17]/60">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00a0e9]/15 text-[#00a0e9]">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg text-white">
                Smit Kava — Resume
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Download Button */}
              <a
                href="/Smit_Kava_Resume.pdf"
                download="Smit_Kava_Resume.pdf"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #0080c8 0%, #005b8f 100%)",
                  boxShadow: "0 2px 8px rgba(0,100,148,0.2)",
                }}
                title="Download Resume PDF"
              >
                Download PDF
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewport */}
          <div className="flex-1 bg-white relative w-full h-full overflow-hidden">
            <iframe
              src="/Smit_Kava_Resume.pdf"
              title="Smit Kava Resume"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
