"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { FlashingEffect } from "./flashing-effect"

interface FlashingIconProps {
  icon: ReactNode
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
  alwaysFlash?: boolean
}

export function FlashingIcon({
  icon,
  color = "#f96c8b",
  size = "md",
  className = "",
  alwaysFlash = false,
}: FlashingIconProps) {
  // Define size dimensions
  const getSizeDimensions = () => {
    switch (size) {
      case "sm":
        return { outer: "w-10 h-10", inner: "w-8 h-8" }
      case "md":
        return { outer: "w-14 h-14", inner: "w-12 h-12" }
      case "lg":
        return { outer: "w-20 h-20", inner: "w-16 h-16" }
      default:
        return { outer: "w-14 h-14", inner: "w-12 h-12" }
    }
  }

  const dimensions = getSizeDimensions()

  return (
    <FlashingEffect
      color={color}
      intensity="medium"
      interval={3}
      disabled={!alwaysFlash}
      className={`${dimensions.outer} rounded-full flex items-center justify-center ${className}`}
    >
      <motion.div
        className={`${dimensions.inner} rounded-full flex items-center justify-center text-white`}
        style={{ backgroundColor: color }}
        whileHover={{
          scale: 1.1,
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
    </FlashingEffect>
  )
}
