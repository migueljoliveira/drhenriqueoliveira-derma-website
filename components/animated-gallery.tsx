"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface AnimatedGalleryProps {
  images: GalleryImage[]
  aspectRatio?: "square" | "portrait" | "landscape"
  columns?: 2 | 3 | 4
}

export function AnimatedGallery({ images, aspectRatio = "square", columns = 3 }: AnimatedGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        navigateImage(-1)
      } else if (e.key === "ArrowRight") {
        navigateImage(1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, selectedIndex])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const navigateImage = (step: number) => {
    if (selectedIndex === null) return

    setDirection(step)
    const newIndex = (selectedIndex + step + images.length) % images.length
    setSelectedIndex(newIndex)
  }

  const handleImageError = (index: number) => {
    console.error(`Error loading image at index ${index}:`, images[index].src)
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  // Function to determine if an image is a direct URL (starts with http)
  const isDirectUrl = (src: string) => {
    return src.startsWith("http")
  }

  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "portrait":
        return "aspect-[3/4]"
      case "landscape":
        return "aspect-[4/3]"
      case "square":
      default:
        return "aspect-square"
    }
  }

  // Determine grid columns class
  const getColumnsClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 4:
        return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
      case 3:
      default:
        return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
    }
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${getColumnsClass()} gap-4`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`${getAspectRatioClass()} relative overflow-hidden rounded-lg cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            onClick={() => openLightbox(index)}
          >
            {imageErrors[index] || isDirectUrl(image.src) ? (
              // Use regular img tag for direct URLs or if Next.js Image fails
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
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
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500"
                onError={() => handleImageError(index)}
                unoptimized={true}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-3 text-white text-sm">
                <span className="sr-only">View larger image: </span>
                {image.alt}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage(-1)
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage(1)
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image container */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
              onClick={closeLightbox}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  initial={(direction) => ({
                    opacity: 0,
                    x: direction * 100,
                    scale: 0.9,
                  })}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={(direction) => ({
                    opacity: 0,
                    x: direction * -100,
                    scale: 0.9,
                  })}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative max-w-4xl max-h-[80vh] w-auto h-auto">
                    {imageErrors[selectedIndex] || isDirectUrl(images[selectedIndex].src) ? (
                      <img
                        src={images[selectedIndex].src || "/placeholder.svg"}
                        alt={images[selectedIndex].alt}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          closeLightbox()
                        }}
                      />
                    ) : (
                      <Image
                        src={images[selectedIndex].src || "/placeholder.svg"}
                        alt={images[selectedIndex].alt}
                        width={1200}
                        height={800}
                        className="object-contain max-h-[80vh] rounded-lg shadow-2xl cursor-pointer"
                        priority
                        unoptimized={true}
                        onError={() => handleImageError(selectedIndex)}
                        onClick={(e) => {
                          e.stopPropagation()
                          closeLightbox()
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
