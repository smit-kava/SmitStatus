// Portfolio Data — Smit Kava's Developer Portfolio

export const personalInfo = {
  name: "Smit Kava",
  title: "Junior Software Engineer | MERN Stack Developer",
  subtitle:
    "MCA Graduate | React.js · TypeScript · Node.js · .NET Core Web API",
  tagline: "Code • Create • Innovate",
  email: "smitkava21@gmail.com",
  phone: "9638986705",
  github: "https://github.com/smit-kava",
  linkedin: "https://www.linkedin.com/in/smitkava/",
  twitter: "https://twitter.com/smit",
  location: "Jetpur, Rajkot, Gujarat, India 🇮🇳",
  availableForWork: true,
  bio: "Software Engineer with 1 year of hands-on experience (internship + full-time) building and maintaining production-grade web applications using React, TypeScript, Node.js and .NET Core Web API. Holds a Master of Computer Applications (MCA) and a B.Sc. in Information Technology, completed with distinction. Strong foundation in front-end and back-end development, database design, and REST API integration.",
  yearsOfExp: "1 Year",
  projectsCompleted: "6+",
  happyClients: "5+",
};

export const skills = {
  frontend: [
    { name: "React.js", level: 88, color: "#61DAFB" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "JavaScript", level: 85, color: "#F7DF1E" },
    { name: "HTML5", level: 92, color: "#E34C26" },
    { name: "CSS3 / Tailwind", level: 90, color: "#264DE4" },
  ],
  backend: [
    { name: ".NET Core Web API", level: 82, color: "#512BD4" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Express.js", level: 80, color: "#000000" },
    { name: "PHP Framework", level: 72, color: "#777BB4" },
    { name: "Python", level: 75, color: "#3776AB" },
    { name: "Java", level: 72, color: "#007396" },
    { name: "C / C++", level: 70, color: "#00599C" },
  ],
  database: [
    { name: "MS SQL Server", level: 84, color: "#CC2927" },
    { name: "MongoDB", level: 80, color: "#47A248" },
    { name: "PostgreSQL", level: 75, color: "#336791" },
    { name: "MySQL / phpMyAdmin", level: 80, color: "#F89820" },
  ],
  tools: [
    { name: "Git & GitHub", level: 88, color: "#F05032" },
    { name: "Visual Studio Code", level: 92, color: "#007ACC" },
    { name: "Visual Studio", level: 85, color: "#5C2D91" },
    { name: "Postman", level: 85, color: "#FF6C37" },
    { name: "REST API Integration", level: 90, color: "#005b8f" },
  ],
};

export const techStack = [
  "React.js",
  "TypeScript",
  ".NET Core Web API",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MS SQL Server",
  "JavaScript",
  "HTML5",
  "CSS3",
  "PHP Framework",
  "PostgreSQL",
  "MySQL",
  "Git",
  "Postman",
  "Python",
  "Java",
  "C/C++",
];

export const projects = [
  {
    id: 1,
    title: "NextScript – Pharma Domain Web Application",
    description:
      "Pharma-domain web application (nextscript.co.uk) built with React and TypeScript front-end and .NET Core Web API back-end. Designed RESTful APIs for seamless data flow, error handling, and third-party API integration.",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "REST APIs"],
    category: "Production Web App",
    status: "Live",
    gradient: "from-blue-600 to-cyan-500",
    github: "#",
    live: "https://nextscript.co.uk",
    featured: true,
    year: "2025 – Present",
  },
  {
    id: 2,
    title: "VumaxPro – Drilling Industry Software",
    description:
      "Contributed to an existing production product at Etech International. Built and maintained modules end-to-end for real-time drilling data monitoring and visualization.",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "SQL Server"],
    category: "Company Product",
    status: "Live",
    gradient: "from-orange-500 to-amber-500",
    github: "#",
    live: "https://www.etechinter.com",
    featured: true,
    year: "2025",
  },
  {
    id: 3,
    title: "AksharSync – Digital Marketing Platform",
    description:
      "Live digital marketing platform providing SEO, social media management, content strategy, and analytics services. Professional web presence built for real business impact.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    category: "Live Project",
    status: "Live",
    gradient: "from-yellow-500 to-amber-600",
    github: "#",
    live: "https://www.aksharsync.com",
    featured: true,
    year: "2025",
  },
  {
    id: 4,
    title: "User Management System",
    description:
      "Web-based user management system to add, update, delete, and list users with a modern React + TypeScript interface and secure RESTful APIs in .NET Core with third-party authentication.",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "REST APIs"],
    category: "Academic Project",
    status: "Completed",
    gradient: "from-purple-500 to-indigo-500",
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
  {
    id: 5,
    title: "College Attendance Management System",
    description:
      "Complete attendance system with separate admin and teacher logins to manage student and employee attendance, mark daily attendance, and generate custom date-range reports.",
    tech: ["PHP Framework", "MySQL", "phpMyAdmin"],
    category: "Academic Project",
    status: "Completed",
    gradient: "from-teal-500 to-emerald-600",
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
  {
    id: 6,
    title: "Library Management System",
    description:
      "Desktop-based library management system supporting insert, update, delete, and view operations on book records with date/time logging and validation built with C# Windows Forms & MS SQL Server.",
    tech: ["C#", ".NET Framework", "Windows Forms", "MS SQL Server"],
    category: "Desktop App",
    status: "Completed",
    gradient: "from-blue-700 to-indigo-700",
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
];

export const experiences = [
  {
    company: "Etech International",
    role: "Junior Software Engineer",
    period: "Dec 2025 – Present",
    description:
      "Internship: Dec 2025 – May 2026 | Full-Time: Jun 2026 – Present (Total: 1 Year). Working on NextScript (nextscript.co.uk), a pharma-domain web app in React/TypeScript and .NET Core Web API. Contributed to VumaxPro (Drilling Industry Software) building and maintaining modules end-to-end.",
    tech: ["React.js", "TypeScript", ".NET Core Web API", "REST APIs", "Git"],
    website: "https://www.etechinter.com",
    current: true,
  },
  {
    company: "ISTAR College, Vallabh Vidyanagar",
    role: "Master of Computer Applications (MCA)",
    period: "2024 – 2026",
    description:
      "Pursuing MCA degree. Sem I CGPA: 8.40 | Sem II CGPA: 8.80. Focused on advanced software development, full-stack architectures, and web APIs.",
    tech: ["React.js", "TypeScript", ".NET Core", "SQL Server"],
    current: true,
  },
  {
    company: "CHARUSAT University, Changa",
    role: "B.Sc. Information Technology (with Distinction)",
    period: "2022 – 2024",
    description:
      "Graduated with distinction. CGPA: 7.62. Gained strong foundations in web development, database design, and software engineering principles.",
    tech: ["Java", "Python", "C/C++", "MySQL"],
    current: false,
  },
  {
    company: "A Success School, Jetpur",
    role: "12th (HSC) — Science Stream",
    period: "May 2021",
    description:
      "Percentile Rank: 57.22. Science education building analytical and mathematical problem-solving skills.",
    tech: [],
    current: false,
  },
  {
    company: "Shree Ankur Vidhyalaya, Jetpur",
    role: "10th (SSC)",
    period: "March 2019",
    description:
      "Percentile Rank: 84.76. Completed secondary school education with academic distinction.",
    tech: [],
    current: false,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
