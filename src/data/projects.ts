// ================================================
// PROJECTS DATA
// Single source of truth for all project cards.
// `featured: true`  → shown on home page (max 3)
// `featured: false` → only shown on /projects page
// ================================================

export interface Project {
  title: string;
  category: string;
  date: string;
  badgeColor: string;
  tech: string[];
  description: string;
  image: string;
  link: string;
  githubLink?: string;
  isLive: boolean;
  featured: boolean;
  platform?: string; // "Web" | "Android" | "Desktop" | "Mobile"
}

export const ALL_PROJECTS: Project[] = [
  // ── FEATURED (shown on homepage) ──────────────────────────────────────────
  {
    title: "NextScript – Pharma Domain Web Application",
    category: "LIVE PRODUCT",
    date: "2025 – Present",
    badgeColor: "bg-blue-600 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "REST APIs"],
    description:
      "Pharma-domain web application (nextscript.co.uk) developing the front-end in React & TypeScript and back-end RESTful APIs in .NET Core Web API with third-party API integrations.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    link: "https://nextscript.tech/",
    isLive: true,
    featured: true,
    platform: "Web",
  },
  {
    title: "VumaxPro – Drilling Industry Software",
    category: "COMPANY PRODUCT",
    date: "2025",
    badgeColor: "bg-orange-500 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    description:
      "Production product at Etech International. Built and maintained modules end-to-end for real-time drilling data visualization, monitoring dashboards, and dynamic data feeds.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    link: "https://www.etechinter.com",
    isLive: true,
    featured: true,
    platform: "Web",
  },
  {
    title: "AksharSync – Digital Marketing Platform",
    category: "LIVE PLATFORM",
    date: "2025",
    badgeColor: "bg-yellow-400 text-yellow-900",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    description:
      "Live digital marketing platform providing SEO, social media management, content strategy, and analytics services. A professional web presence built for real business impact.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    link: "https://www.aksharsync.com",
    isLive: true,
    featured: true,
    platform: "Web",
  },

  // ── ALL PROJECTS (visible only on /projects page) ─────────────────────────
  {
    title: "User Management System",
    category: "ACADEMIC",
    date: "2024",
    badgeColor: "bg-purple-600 text-white",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "REST APIs"],
    description:
      "Web-based user management system to add, update, delete and list users with a modern React + TypeScript interface and secure RESTful APIs using .NET Core and third-party auth.",
    image:
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Web",
  },
  {
    title: "College Attendance Management System",
    category: "ACADEMIC",
    date: "2024",
    badgeColor: "bg-teal-600 text-white",
    tech: ["PHP Framework", "MySQL", "phpMyAdmin"],
    description:
      "Complete attendance system with separate admin and teacher logins. Enabled teachers to mark daily student attendance and allowed admins to generate date-range reports.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Web",
  },
  {
    title: "Library Management System",
    category: "DESKTOP",
    date: "2024",
    badgeColor: "bg-blue-700 text-white",
    tech: ["C# .NET", "Windows Forms", "MS SQL Server"],
    description:
      "Desktop-based library management system supporting insert, update, delete and view operations on book records with date/time logging and validation using C# Windows Forms & SQL Server.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    link: "#",
    isLive: false,
    featured: false,
    platform: "Desktop",
  },
  {
    title: "License Manager – Android App",
    category: "ANDROID",
    date: "2024",
    badgeColor: "bg-green-600 text-white",
    tech: ["React Native CLI", "Android", "SQLite", "TypeScript"],
    description:
      "Android app built with React Native CLI to manage software licenses — create, track, and renew licenses with offline storage and clean mobile UI.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/smit-kava/New_Licenace",
    isLive: false,
    featured: false,
    platform: "Android",
  },
  {
    title: "Menu Custom App – Restaurant Menu Generator",
    category: "MOBILE",
    date: "2024",
    badgeColor: "bg-purple-600 text-white",
    tech: ["React Native", "Expo", "JavaScript"],
    description:
      "Custom restaurant menu app that lets owners generate, customize, and share digital menus from their phones with a beautiful card-based layout.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
    link: "#",
    githubLink: "https://github.com/smit-kava/MenuApp_custom",
    isLive: false,
    featured: false,
    platform: "Mobile",
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured);
