import { motion } from "framer-motion"
import { Home, ArrowLeft } from "@/components/ui/GlobalIcons"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/routes/routes"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-doraemon-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-doraemon-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-doraemon-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 relative z-10"
      >
        <motion.h1
          className="text-[10rem] font-black leading-none bg-linear-to-r from-doraemon-blue to-doraemon-darkBlue bg-clip-text text-transparent"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          404
        </motion.h1>
        <p className="text-gray-900 text-2xl font-bold">Page Not Found</p>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button variant="doraemon" size="lg" asChild className="gap-2">
            <Link to={ROUTES.HOME}>
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2 border-doraemon-blue text-doraemon-darkBlue hover:bg-doraemon-blue/10">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
