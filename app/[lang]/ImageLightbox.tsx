"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ImageLightboxProps {
  images: {
    src: string
    alt: string
  }[]
  lang: string
}

export default function ImageLightbox({ images, lang }: ImageLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Close lightbox when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null)
      } else if (e.key === "ArrowRight" && selectedImage !== null) {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      } else if (e.key === "ArrowLeft" && selectedImage !== null) {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, images.length])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <p className="text-white font-medium p-4">{image.alt.split(" ")[0]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
                onClick={() => setSelectedImage(null)}
                aria-label={lang === "pt" ? "Fechar imagem" : "Close image"}
              >
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev! - 1))
                  }}
                  aria-label={lang === "pt" ? "Imagem anterior" : "Previous image"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev! + 1))
                  }}
                  aria-label={lang === "pt" ? "Próxima imagem" : "Next image"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Image */}
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] rounded-lg shadow-2xl cursor-pointer"
                priority
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                <p>{images[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">
                  {lang === "pt" ? "Imagem" : "Image"} {selectedImage + 1} {lang === "pt" ? "de" : "of"} {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
