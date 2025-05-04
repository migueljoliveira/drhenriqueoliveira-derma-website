"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Pause, Play } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface AutoSlideshowProps {
  images: GalleryImage[]
  interval?: number
  aspectRatio?: "square" | "portrait" | "landscape" | "auto"
  showControls?: boolean
  autoplay?: boolean
}

export function AutoSlideshow({
  images,
  interval = 5000,
  aspectRatio = "landscape",
  showControls = true,
  autoplay = true,
}: AutoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(!autoplay)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Function to go to the previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Reset the timer when the current index changes or when paused state changes
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (!isPaused && images.length > 1) {
      timerRef.current = setTimeout(goToNext, interval)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [currentIndex, isPaused, interval, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === " ") {
        // Space bar toggles pause
        e.preventDefault()
        setIsPaused((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "portrait":
        return "aspect-[3/4]"
      case "landscape":
        return "aspect-[4/3]"
      case "square":
        return "aspect-square"
      case "auto":
      default:
        return ""
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-md">
      {/* Main slideshow container */}
      <div className={`relative w-full ${getAspectRatioClass()} bg-gray-100`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Play/Pause control */}
        {showControls && (
          <button
            onClick={() => setIsPaused((prev) => !prev)}
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
                onClick={() => {
                  setCurrentIndex(index)
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
