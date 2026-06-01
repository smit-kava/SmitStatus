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

// ---- Common Layout wrapper ----------------------
function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-doraemon-bg text-gray-900">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
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

      {/* ── 404 Not Found ── */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={<NotFoundPage />}
      />
    </Routes>
  )
}
