"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FlashingEffect } from "./flashing-effect"

interface FlashingServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href: string
  color?: string
  lang: string
  featured?: boolean
}

export function FlashingServiceCard({
  title,
  description,
  icon,
  href,
  color = "#773cf6",
  lang,
  featured = false,
}: FlashingServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <FlashingEffect color={color} intensity="low" interval={4} disabled={!featured || isHovered} className="h-full">
      <motion.div
        ref={cardRef}
        className="rounded-xl p-6 shadow-sm transition-all relative overflow-hidden h-full"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: isHovered ? "0 10px 30px rgba(119, 60, 246, 0.15)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background glow */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, ${color}20, transparent)`,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Icon with animation */}
        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
            style={{ backgroundColor: color, opacity: 0.2 }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 10 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {icon}
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.h4
            className="text-xl font-medium mb-2 relative z-10"
            style={{ color: "#2E2E2E" }}
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h4>

          <motion.p
            className="text-sm text-gray-700 relative z-10"
            animate={{
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>

          {/* Animated link/button */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
          >
            <Link href={href} className="inline-block text-sm font-medium" style={{ color }}>
              {lang === "pt" ? "Saiba mais" : "Learn more"} →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </FlashingEffect>
  )
}
