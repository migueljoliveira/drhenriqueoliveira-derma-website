"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function NavigationIndicator() {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Show indicator when navigation starts
    setIsNavigating(true)

    // Hide indicator after navigation completes
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isNavigating) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-[#ff6bd0] animate-pulse"></div>
    </div>
  )
}
