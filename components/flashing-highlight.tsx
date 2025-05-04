"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FlashingHighlightProps {
  children: ReactNode
  color?: string
  intensity?: "low" | "medium" | "high"
  className?: string
}

export function FlashingHighlight({
  children,
  color = "#f96c8b",
  intensity = "medium",
  className = "",
}: FlashingHighlightProps) {
  // Define glow intensity based on the prop
  const getIntensity = () => {
    switch (intensity) {
      case "low":
        return { opacity: [0.2, 0.4, 0.2], blur: "5px" }
      case "medium":
        return { opacity: [0.3, 0.6, 0.3], blur: "8px" }
      case "high":
        return { opacity: [0.4, 0.8, 0.4], blur: "12px" }
      default:
        return { opacity: [0.3, 0.6, 0.3], blur: "8px" }
    }
  }

  const intensityValues = getIntensity()

  return (
    <span className={`relative inline-block ${className}`}>
      {/* The actual content */}
      <span className="relative z-10">{children}</span>

      {/* The flashing effect layer */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          textShadow: `0 0 ${intensityValues.blur} ${color}`,
        }}
        animate={{
          opacity: intensityValues.opacity,
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
