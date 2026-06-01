// ================================================
// APP ROOT
// Wraps the entire app with BrowserRouter and
// delegates all routing to AppRoutes.
// ================================================

import { BrowserRouter } from "react-router-dom"
import AppRoutes from "@/routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
