"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoplaySpeed?: number
}

export function TestimonialSlider({ testimonials, autoplaySpeed = 8000 }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isPaused, setIsPaused] = useState(false)

  const goToNext = useCallback(() => {
    if (isAnimating) return

    setDirection("right")
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }, [isAnimating, testimonials.length])

  const goToPrevious = useCallback(() => {
    if (isAnimating) return

    setDirection("left")
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }, [isAnimating, testimonials.length])

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [goToNext, autoplaySpeed, isPaused, testimonials.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrevious])

  if (!testimonials.length) return null

  return (
    <div
      className="relative max-w-3xl mx-auto px-6 my-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden relative">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isAnimating
              ? direction === "right"
                ? "translate-x-[-100%] opacity-0"
                : "translate-x-[100%] opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <p className="italic text-lg font-serif mb-6 text-center">"{testimonials[currentIndex].quote}"</p>
          <p className="text-sm text-gray-500 text-center">{testimonials[currentIndex].author}</p>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={goToPrevious}
          className="p-2.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return
                setDirection(index > currentIndex ? "right" : "left")
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsAnimating(false)
                }, 500)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? "bg-[#ff6bd0] w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
          disabled={isAnimating}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
