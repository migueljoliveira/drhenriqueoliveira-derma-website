"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FlashingSectionProps {
  children: ReactNode
  color?: string
  borderPosition?: "top" | "bottom" | "left" | "right" | "all"
  className?: string
}

export function FlashingSection({
  children,
  color = "#f96c8b",
  borderPosition = "left",
  className = "",
}: FlashingSectionProps) {
  // Define border styles based on position
  const getBorderStyles = () => {
    switch (borderPosition) {
      case "top":
        return { borderTop: `2px solid ${color}` }
      case "bottom":
        return { borderBottom: `2px solid ${color}` }
      case "left":
        return { borderLeft: `2px solid ${color}` }
      case "right":
        return { borderRight: `2px solid ${color}` }
      case "all":
        return { border: `2px solid ${color}` }
      default:
        return { borderLeft: `2px solid ${color}` }
    }
  }

  const borderStyles = getBorderStyles()

  return (
    <div className={`relative ${className}`} style={borderStyles}>
      {/* The actual content */}
      <div className="relative z-10">{children}</div>

      {/* The flashing effect layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `0 0 15px ${color}`,
          opacity: 0,
        }}
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
