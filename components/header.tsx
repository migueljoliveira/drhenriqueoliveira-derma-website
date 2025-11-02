"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768
    // Check on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    setIsHydrated(true)

    // Listen for resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Tratamentos", href: "#tratamentos" },
    { label: "Clínica", href: "#clinica" },
    { label: "Estética", href: "#estetica" },
    { label: "Contato", href: "#contato" },
  ]

  const LanguageSwitcher = () => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" className="text-sm font-medium">
        PT
      </Button>
      <Button variant="ghost" size="sm" className="text-sm font-medium">
        EN
      </Button>
    </div>
  )

  if (!isHydrated) {
    return (
      <header className="bg-gradient-to-r from-pink-400 to-pink-300 text-white py-4 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="font-bold text-xl">
            DR. HENRIQUE OLIVEIRA
          </Link>
          <div className="w-10" /> {/* Placeholder for menu button */}
        </div>
      </header>
    )
  }

  // Mobile menu using Sheet
  if (isMobile) {
    return (
      <header className="bg-gradient-to-r from-pink-400 to-pink-300 text-white py-4 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            DR. HENRIQUE OLIVEIRA
          </Link>

          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-pink-500">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-pink-500 text-white">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    )
  }

  // Desktop menu
  return (
    <header className="bg-gradient-to-r from-pink-400 to-pink-300 text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          DR. HENRIQUE OLIVEIRA
        </Link>

        {/* Desktop navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium hover:opacity-80 transition-opacity">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  )
}