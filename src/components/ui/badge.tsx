import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "tech"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" && "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        variant === "secondary" && "bg-white/10 text-white/70 border border-white/20",
        variant === "outline" && "border border-white/20 text-white/60",
        variant === "tech" && "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
