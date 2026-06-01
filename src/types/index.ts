export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  category: string
  status: "Live" | "In Progress" | "Completed"
  gradient: string
  github: string
  live: string
  featured: boolean
  year: string
}

export interface Skill {
  name: string
  level: number
  color: string
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  current: boolean
}

export interface NavLink {
  label: string
  href: string
}

export interface SectionProps {
  id?: string
  className?: string
}
