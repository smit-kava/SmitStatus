// ================================================
// APP ROUTES
// All application routes are defined here.
// Uses react-router-dom v6+ with <Routes> + <Route>.
//
// Layout:
//   - CommonLayout wraps Navbar + Footer around page content
//   - Every section page lives under "/"
//   - "*" catches all unknown paths → 404
// ================================================

import { Routes, Route } from "react-router-dom"
import { ROUTES } from "@/routes/routes"
import { Navbar, Footer } from "@/layout"
import { HomePage, NotFoundPage } from "@/pages"

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 bg-doraemon-bg relative flex flex-col">
      {/* Global Static Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#e6eff5]/80 to-transparent"></div>
        {/* Prominent cyan glowing blob - fixed on the right side */}
        <div className="absolute top-[20%] right-[-5%] w-[40rem] h-[40rem] bg-[#00a0e9] rounded-full blur-[140px] opacity-30 animate-pulse" style={{ animationDuration: '6s' }}></div>
        {/* Subtle yellow glow on the left */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-yellow-300 rounded-full blur-[150px] opacity-15"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

// ---- Route definitions --------------------------
export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Home / Portfolio (all sections in one scroll) ── */}
      <Route
        path={ROUTES.HOME}
        element={
          <CommonLayout>
            <HomePage />
          </CommonLayout>
        }
      />

      {/* ── 404 Not Found ── */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={<NotFoundPage />}
      />
    </Routes>
  )
}
