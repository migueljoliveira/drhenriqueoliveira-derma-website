"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  caption: string
}

interface FixedImageGalleryProps {
  images: GalleryImage[]
  lang: string
  clickToNavigate?: boolean
}

export function FixedImageGallery({ images, lang, clickToNavigate = false }: FixedImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        navigateImage(-1)
      } else if (e.key === "ArrowRight") {
        navigateImage(1)
      }
    }

    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
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

  // Handle image click based on clickToNavigate prop
  const handleImageClick = (index: number) => {
    if (clickToNavigate && lightboxOpen && selectedIndex !== null) {
      // If lightbox is open and clickToNavigate is true, navigate to next image
      navigateImage(1)
    } else {
      // Otherwise, open lightbox with the clicked image
      openLightbox(index)
    }
  }

  const handleImageError = (index: number) => {
    console.error(`Error loading image at index ${index}:`, images[index].src)
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  // Function to determine if an image is a direct URL (starts with http)
  const isDirectUrl = (src: string) => {
    return src.startsWith("http")
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
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
            onClick={() => handleImageClick(index)}
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
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-500"
                onError={() => handleImageError(index)}
                unoptimized={true} // Disable Next.js image optimization
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-3 text-white text-sm font-medium">{image.caption}</div>
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
              aria-label={lang === "pt" ? "Fechar" : "Close"}
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
              aria-label={lang === "pt" ? "Anterior" : "Previous"}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage(1)
              }}
              aria-label={lang === "pt" ? "Próximo" : "Next"}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image container */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
              onClick={(e) => {
                // Close lightbox when clicking the image container
                closeLightbox()
              }}
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
                  onClick={(e) => e.stopPropagation()}
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
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                      {images[selectedIndex].caption}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
