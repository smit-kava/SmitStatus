// ================================================
// PROJECTS DATA
// Single source of truth for all project cards.
// `featured: true`  → shown on home page (max 3)
// `featured: false` → only shown on /projects page
// ================================================

export interface Project {
  title: string
  category: string
  date: string
  badgeColor: string
  tech: string[]
  description: string
  image: string
  link: string
  githubLink?: string
  isLive: boolean
  featured: boolean
  platform?: string // "Web" | "Android" | "Desktop" | "Mobile"
}

export const ALL_PROJECTS: Project[] = [
  // ── FEATURED (shown on homepage) ──────────────────────────────────────────
  {
    title: "AksharSync – Digital Marketing Platform",
    category: "LIVE",
    date: "2025",
    badgeColor: "bg-yellow-400 text-yellow-900",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    description:
      "Live digital marketing platform providing SEO, social media management, content strategy, and analytics services. A professional web presence built for real business impact.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    link: "https://www.aksharsync.com",
    isLive: true,
    featured: true,
    platform: "Web",
  },
  {
    title: "VumaxPro – Real-Time Drilling Data Visualization",
    category: "INTERNSHIP",
    date: "2025",
    badgeColor: "bg-orange-500 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    description:
      "Real-time drilling data visualization system built at Etech International Pvt. Ltd. for the VHTracks platform. Live dashboards for oil & gas drilling operations with dynamic charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    link: "https://www.etechinter.com",
    isLive: true,
    featured: true,
    platform: "Web",
  },
  {
    title: "License Manager – Android App",
    category: "ANDROID",
    date: "2024",
    badgeColor: "bg-green-600 text-white",
    tech: ["React Native CLI", "Android", "SQLite", "TypeScript"],
    description:
      "Android app built with React Native CLI to manage software licenses — create, track, and renew licenses with offline storage and clean mobile UI.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/smit-kava/New_Licenace",
    isLive: false,
    featured: true,
    platform: "Android",
  },

  // ── ALL PROJECTS (visible only on /projects page) ─────────────────────────
  {
    title: "Menu Custom App – Restaurant Menu Generator",
    category: "MOBILE",
    date: "2024",
    badgeColor: "bg-purple-600 text-white",
    tech: ["React Native", "Expo", "JavaScript"],
    description:
      "Custom restaurant menu app that lets owners generate, customize, and share digital menus from their phones with a beautiful card-based layout.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/smit-kava/MenuApp_custom",
    isLive: false,
    featured: false,
    platform: "Mobile",
  },
  {
    title: "Online Book Store – E-Commerce Platform",
    category: "WEB APP",
    date: "2024",
    badgeColor: "bg-blue-600 text-white",
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    description:
      "Full-stack online bookstore with browsing, search, cart, and checkout functionality. Users can explore books by category, add to cart, and complete purchases seamlessly.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/smit-kava/Online_Book_Strore",
    isLive: false,
    featured: false,
    platform: "Web",
  },
  {
    title: "College Attendance Management System",
    category: "WEB APP",
    date: "Apr 2025",
    badgeColor: "bg-teal-600 text-white",
    tech: ["React.js", ".NET Core", "SQL Server", "TypeScript"],
    description:
      "Full-stack college attendance system enabling faculty to mark, view, and analyze student attendance with a clean, responsive interface.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Web",
  },
  {
    title: "User Management System",
    category: "WEB APP",
    date: "May 2024",
    badgeColor: "bg-red-600 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    description:
      "Web-based user management system with CRUD operations using a modern React + TypeScript UI and secure RESTful APIs with third-party auth integration.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Web",
  },
  {
    title: "Library Management System",
    category: "DESKTOP APP",
    date: "Jan 2024",
    badgeColor: "bg-blue-700 text-white",
    tech: ["C# .NET", "Windows Forms", "SQL Server"],
    description:
      "Desktop-based library management system to manage book records with CRUD operations, date/time logging, and data validation built with C# & SQL Server.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Desktop",
  },
]

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured)
