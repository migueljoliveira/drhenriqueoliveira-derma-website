"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SlideshowImage {
  src: string
  alt: string
}

interface TrichologySlideshowProps {
  images: SlideshowImage[]
  interval?: number
}

export function TrichologySlideshow({ images, interval = 5000 }: TrichologySlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Set up the interval for automatic slideshow
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(goToNextSlide, interval)

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, interval])

  const handleImageError = (index: number) => {
    console.error(`Error loading image at index ${index}:`, images[index].src)
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  // Function to determine if an image is a direct URL (starts with http)
  const isDirectUrl = (src: string) => {
    return src.startsWith("http")
  }

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${index === currentIndex ? "z-10" : "z-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="relative w-full h-full">
              {imageErrors[index] || isDirectUrl(image.src) ? (
                // Use regular img tag for direct URLs or if Next.js Image fails
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={`w-full h-full object-cover ken-burns-effect-${index % 2}`}
                  onError={() => {
                    if (!imageErrors[index]) {
                      handleImageError(index)
                    }
                  }}
                />
              ) : (
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover ken-burns-effect-${index % 2}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === currentIndex}
                  unoptimized={true}
                  onError={() => handleImageError(index)}
                />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
