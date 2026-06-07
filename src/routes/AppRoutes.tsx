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
import { HomePage, NotFoundPage, AllProjectsPage } from "@/pages"

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 bg-doraemon-bg relative overflow-x-hidden">
      {/* Global Static Background Effects — fixed, always visible */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-125 bg-linear-to-b from-surface-container/80 to-transparent" />
        {/* Cyan glowing blob */}
        <div
          className="absolute top-[20%] right-[-5%] w-160 h-160 bg-primary-container rounded-full blur-[140px] opacity-30 animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        {/* Yellow glow */}
        <div className="absolute bottom-[-10%] left-[-5%] w-160 h-160 bg-yellow-300 rounded-full blur-[150px] opacity-15" />
      </div>
      {/* Navbar floats fixed over the page */}
      <Navbar />
      {/* Main content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
      {/* Footer */}
      <Footer />
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

      {/* ── All Projects Page (opens in new tab) ── */}
      <Route
        path={ROUTES.PROJECTS}
        element={
          <CommonLayout>
            <AllProjectsPage />
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
