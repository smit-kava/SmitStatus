// ================================================
// APP ROOT
// Wraps the entire app with BrowserRouter and
// delegates all routing to AppRoutes.
// ================================================

import { BrowserRouter } from "react-router-dom"
import { useState, useEffect } from "react"
import AppRoutes from "@/routes/AppRoutes"
import { LoadingScreen } from "@/components/ui"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
