"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FlashingEffectProps {
  children: ReactNode
  color?: string
  intensity?: "low" | "medium" | "high"
  interval?: number
  className?: string
  disabled?: boolean
}

export function FlashingEffect({
  children,
  color = "#f96c8b",
  intensity = "medium",
  interval = 3,
  className = "",
  disabled = false,
}: FlashingEffectProps) {
  // Define glow intensity based on the prop
  const getIntensity = () => {
    switch (intensity) {
      case "low":
        return { opacity: [0.2, 0.4, 0.2], blur: "10px" }
      case "medium":
        return { opacity: [0.3, 0.6, 0.3], blur: "15px" }
      case "high":
        return { opacity: [0.4, 0.8, 0.4], blur: "20px" }
      default:
        return { opacity: [0.3, 0.6, 0.3], blur: "15px" }
    }
  }

  const intensityValues = getIntensity()

  return (
    <div className={`relative ${className}`}>
      {/* The actual content */}
      <div className="relative z-10">{children}</div>

      {/* The flashing effect layer */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `0 0 ${intensityValues.blur} ${color}`,
            borderRadius: "inherit",
          }}
          animate={{
            opacity: intensityValues.opacity,
          }}
          transition={{
            duration: interval,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  )
}
