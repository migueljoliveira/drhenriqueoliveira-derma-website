"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Pause, Play } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface KenBurnsSlideshowProps {
  images: GalleryImage[]
  interval?: number
  showControls?: boolean
  autoplay?: boolean
}

export function KenBurnsSlideshow({
  images,
  interval = 6000,
  showControls = false,
  autoplay = true,
}: KenBurnsSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(!autoplay)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [kenBurnsParams, setKenBurnsParams] = useState({
    scale: 1.05,
    x: 0,
    y: 0,
  })
  const [imageError, setImageError] = useState<boolean>(false)

  // Check if URL is external (starts with http or https)
  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
  }

  // Generate random parameters for Ken Burns effect
  const generateRandomKenBurnsParams = useCallback(() => {
    // Random scale between 1.05 and 1.15
    const scale = 1.05 + Math.random() * 0.1
    // Random x and y translation between -2% and 2%
    const x = (Math.random() - 0.5) * 4
    const y = (Math.random() - 0.5) * 4

    setKenBurnsParams({ scale, x, y })
  }, [])

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    // Generate new random Ken Burns parameters for the next slide
    generateRandomKenBurnsParams()
    // Reset error state for new image
    setImageError(false)
  }, [images.length, generateRandomKenBurnsParams])

  // Reset the timer when the current index changes or when paused state changes
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    // Only set a new timer if not paused and we have multiple images
    if (!isPaused && images.length > 1) {
      timerRef.current = setTimeout(goToNext, interval)
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [currentIndex, isPaused, interval, images.length, goToNext])

  // Initialize Ken Burns parameters on first render
  useEffect(() => {
    generateRandomKenBurnsParams()
  }, [generateRandomKenBurnsParams])

  // Handle click to go to next slide
  const handleClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    goToNext()
  }

  // Handle image error
  const handleImageError = () => {
    console.error(`Error loading image at index ${currentIndex}: ${images[currentIndex].src}`)
    setImageError(true)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md aspect-[16/9]">
      {/* Main slideshow container */}
      <div
        className="relative w-full h-full bg-gray-100 cursor-pointer"
        onClick={handleClick}
        role="button"
        aria-label="Next slide"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick()
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: kenBurnsParams.scale,
                x: `${kenBurnsParams.x}%`,
                y: `${kenBurnsParams.y}%`,
              }}
              transition={{
                duration: interval / 1000,
                ease: "linear",
              }}
              className="w-full h-full"
            >
              {isExternalUrl(images[currentIndex].src) || imageError ? (
                // Use regular img tag for external URLs or if Next.js Image fails
                <img
                  src={images[currentIndex].src || "/placeholder.svg"}
                  alt={images[currentIndex].alt}
                  className="object-cover w-full h-full"
                  onError={handleImageError}
                />
              ) : (
                // Use Next.js Image for internal paths
                <Image
                  src={images[currentIndex].src || "/placeholder.svg"}
                  alt={images[currentIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  unoptimized={true}
                  onError={handleImageError}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Play/Pause control */}
        {showControls && (
          <button
            onClick={(e) => {
              e.stopPropagation() // Prevent triggering the parent click
              setIsPaused((prev) => !prev)
            }}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors z-10"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </button>
        )}

        {/* Progress indicators */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation() // Prevent triggering the parent click
                  setCurrentIndex(index)
                  generateRandomKenBurnsParams()
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-6 bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
