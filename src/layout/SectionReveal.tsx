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

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

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

    useGSAP(() => {
        if (!ref.current) return;

        gsap.fromTo(ref.current,
            { opacity: 0, y },
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 88%",
                    once: once,
                    toggleActions: once ? "play none none none" : "play none none reverse"
                }
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
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

interface StaggerRevealProps {
    children: React.ReactNode
    className?: string
}

export function StaggerReveal({ children, className = "" }: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!ref.current) return;

        const items = gsap.utils.toArray('.stagger-item');
        if (items.length === 0) return;

        gsap.fromTo(items,
            { opacity: 0, y: 36 },
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 90%",
                    once: true
                }
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
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
        <div className={`stagger-item ${className}`}>
            {children}
        </div>
    )
}