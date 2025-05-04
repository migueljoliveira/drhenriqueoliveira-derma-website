"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface GalleryImage {
  name: string
  image: string
  alt: string
}

interface AnimatedClickableGalleryProps {
  images: GalleryImage[]
}

export function AnimatedClickableGallery({ images }: AnimatedClickableGalleryProps) {
  const [activeIndices, setActiveIndices] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  })

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const handleImageClick = (gridIndex: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [gridIndex]: (prev[gridIndex] + 1) % images.length,
    }))
  }

  // Create a 2x2 grid with 4 positions
  const gridPositions = [0, 1, 2, 3]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {gridPositions.map((position) => {
        const imageIndex = activeIndices[position] || 0
        const image = images[imageIndex]

        return (
          <motion.div
            key={position}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(position)}
            onMouseEnter={() => setHoveredItem(position)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 transition-transform duration-500 transform"
              animate={{
                scale: hoveredItem === position ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Image src={image.image || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />

              {/* Gradient overlay with animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end"
                animate={{
                  opacity: hoveredItem === position ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-full p-4"
                  animate={{
                    y: hoveredItem === position ? 0 : 5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-white font-medium"
                    animate={{
                      scale: hoveredItem === position ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {image.name}
                  </motion.p>

                  {/* Click indicator */}
                  <motion.p
                    className="text-white/70 text-xs mt-1"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredItem === position ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Click to see more
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated border on hover */}
            {hoveredItem === position && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.5)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
