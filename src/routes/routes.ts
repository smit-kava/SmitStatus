// ================================================
// ROUTE PATH CONSTANTS
// All app route paths defined in one place
// ================================================

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SKILLS: "/skills",
  PROJECTS: "/projects",
  EXPERIENCE: "/experience",
  CONTACT: "/contact",
  // Wildcard / 404
  NOT_FOUND: "*",
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
