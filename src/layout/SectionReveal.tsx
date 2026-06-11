// SectionReveal.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wrap any section with <SectionReveal> to get smooth scroll-triggered entrance.
//
// Usage:
//   import SectionReveal from "@/components/SectionReveal"
//
//   <SectionReveal>
//     <section id="skills"> ... </section>
//   </SectionReveal>
//
// Optional props:
//   delay    — stagger delay in seconds (default 0)
//   y        — vertical slide distance in px (default 52)
//   blur     — blur amount in px (default 6)
//   once     — animate only once (default true)

import { useRef, useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"

interface SectionRevealProps {
    children: React.ReactNode
    delay?: number
    y?: number
    blur?: number
    once?: boolean
    className?: string
}

export default function SectionReveal({
    children,
    delay = 0,
    y = 52,
    blur = 6,
    once = true,
    className = "",
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once) observer.disconnect()
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold: 0.12 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [once])

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
            animate={
                isVisible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y, filter: `blur(${blur}px)` }
            }
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],   // custom spring-like ease
            }}
        >
            {children}
        </motion.div>
    )
}

// ─── Staggered children reveal ────────────────────────────────────────────────
// Use <StaggerReveal> as a parent, and wrap each child in <StaggerItem>.
// The parent controls when to trigger; items stagger automatically.
//
// Usage:
//   <StaggerReveal>
//     {items.map((item, i) => (
//       <StaggerItem key={i}>
//         <Card ... />
//       </StaggerItem>
//     ))}
//   </StaggerReveal>

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
}

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 36, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
}

interface StaggerRevealProps {
    children: React.ReactNode
    className?: string
}

export function StaggerReveal({ children, className = "" }: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div className={className} variants={staggerItem}>
            {children}
        </motion.div>
    )
}