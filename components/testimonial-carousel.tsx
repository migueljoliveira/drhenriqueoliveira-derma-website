"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoplaySpeed?: number
}

export function TestimonialCarousel({ testimonials, autoplaySpeed = 8000 }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Reset the timer when the active index changes
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (!isPaused && testimonials.length > 1) {
      timerRef.current = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, autoplaySpeed)
    }
  }, [isPaused, testimonials.length, autoplaySpeed])

  // Set up the timer
  useEffect(() => {
    resetTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [activeIndex, isPaused, testimonials.length, resetTimer])

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  if (!testimonials.length) return null

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        resetTimer()
      }}
      role="region"
      aria-label="Testimonials"
    >
      <div className="relative min-h-[200px] px-8 py-4">
        {/* Large decorative quote mark */}
        <div
          className="absolute top-0 left-0 text-8xl leading-none opacity-10 -translate-x-4 -translate-y-6"
          style={{ color: "#ff6bd0" }}
          aria-hidden="true"
        >
          "
        </div>

        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute w-full transition-opacity duration-1000 ${
              activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={activeIndex !== index}
          >
            <p className="italic text-lg font-serif mb-6 text-center px-6">"{testimonial.quote}"</p>
            <p className="text-sm text-gray-500 text-center">{testimonial.author}</p>
          </div>
        ))}

        {/* Large decorative closing quote mark */}
        <div
          className="absolute bottom-0 right-0 text-8xl leading-none opacity-10 translate-x-4 translate-y-6 rotate-180"
          style={{ color: "#ff6bd0" }}
          aria-hidden="true"
        >
          "
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center items-center mt-14 space-x-4">
        <button
          onClick={goToPrevious}
          className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
          style={{ color: "#31029c" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${activeIndex === index ? "w-4" : ""}`}
              style={{
                backgroundColor: activeIndex === index ? "#ff6bd0" : "#E6E6E6",
              }}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
          style={{ color: "#31029c" }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
