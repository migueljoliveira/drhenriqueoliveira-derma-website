"use client"

import { useState } from "react"
import Image from "next/image"

interface GalleryImage {
  name: string
  image: string
  alt: string
}

interface ClickableGalleryProps {
  images: GalleryImage[]
}

export function ClickableGallery({ images }: ClickableGalleryProps) {
  const [activeIndices, setActiveIndices] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  })

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
          <div
            key={position}
            className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => handleImageClick(position)}
          >
            <div className="absolute inset-0 transition-transform duration-500 transform">
              <Image
                src={image.image || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <p className="text-white font-medium p-4">{image.name}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
