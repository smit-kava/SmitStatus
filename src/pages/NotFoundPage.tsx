import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Home, ArrowLeft } from "@/components/ui/GlobalIcons"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/routes/routes"

gsap.registerPlugin(useGSAP)

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo('.not-found-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    gsap.to('.not-found-404', {
      scale: 1.02,
      duration: 1.5,
      ease: "easeInOut",
      yoyo: true,
      repeat: -1
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-doraemon-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-doraemon-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-doraemon-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="not-found-content opacity-0 text-center space-y-6 relative z-10">
        <h1 className="not-found-404 text-[10rem] font-black leading-none bg-linear-to-r from-doraemon-blue to-doraemon-darkBlue bg-clip-text text-transparent">
          404
        </h1>
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
      </div>
    </div>
  )
}
