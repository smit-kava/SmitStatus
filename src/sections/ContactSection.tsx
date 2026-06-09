import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, Check } from "@/components/ui/GlobalIcons"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => {
      setStatus("sent")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="animate-float-delayed">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-md rounded-4xl shadow-xl shadow-blue-900/5 relative overflow-hidden border border-white/50"
        >
          {/* Top red accent line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-doraemon-red"></div>

          <div className="grid md:grid-cols-2 gap-12 p-10 sm:p-14">
            {/* Left: Info */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Call via <span className="text-doraemon-red relative inline-block">
                  Anywhere Door
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-doraemon-red rounded-full"></span>
                </span>
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                Ready to teleport your project from idea to reality? Drop a message and let's start the journey from the 22nd century today.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#006494]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-900 font-bold">smitkava21@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base</p>
                    <p className="text-gray-900 font-bold">Jetpur, Rajkot – Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-inner border border-white/40">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nobita Nobi"
                    className="w-full px-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-doraemon-blue outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nobita@sewashitower.com"
                    className="w-full px-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-doraemon-blue outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can my gadgets help you today?"
                    className="w-full px-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-doraemon-blue outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full bg-[#006494] hover:bg-[#004d72] text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-900/20 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {status === "idle" && (
                    <>
                      Send via Door <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                  {status === "sending" && "Teleporting..."}
                  {status === "sent" && (
                    <span className="flex items-center gap-1">
                      Delivered! <Check className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
