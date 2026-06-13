// ================================================
// APP ROOT
// Wraps the entire app with BrowserRouter and
// delegates all routing to AppRoutes.
// ================================================

import { BrowserRouter } from "react-router-dom"
import { useEffect, useState } from "react"
import AppRoutes from "@/routes/AppRoutes"
import { CustomCursor } from "@/components/ui"

function App() {
  // Only show custom cursor on non-touch / pointer-capable devices (no overhead on mobile)
  const [isPointerDevice, setIsPointerDevice] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    setIsPointerDevice(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsPointerDevice(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <BrowserRouter>
      {isPointerDevice && <CustomCursor />}
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
