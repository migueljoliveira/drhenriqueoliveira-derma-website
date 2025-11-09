"use client"

import { Menu, X } from "lucide-react"

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 to-pink-400">
        <nav className="max-w-6xl mx-auto px-2 md:px-4 h-12 md:h-24 flex items-center justify-between gap-1 md:gap-2">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-pink-500 font-bold text-sm">HO</span>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-white font-light text-sm leading-tight">DR HENRIQUE</span>
              <span className="text-white font-light text-sm leading-tight">OLIVEIRA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-white/80 font-light text-sm">
              Sobre
            </a>
            <a href="#" className="text-white hover:text-white/80 font-light text-sm">
              Tratamentos
            </a>
            <a href="#" className="text-white hover:text-white/80 font-light text-sm">
              Clínica
            </a>
            <a href="#" className="text-white hover:text-white/80 font-light text-sm">
              Estética
            </a>
            <a href="#" className="text-white hover:text-white/80 font-light text-sm">
              Contato
            </a>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-white text-sm hover:bg-opacity-30">
                PT
              </button>
              <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-white text-sm hover:bg-opacity-30">
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white hover:bg-white hover:bg-opacity-10 rounded flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-pink-500 border-t border-white border-opacity-20">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-white hover:text-white/80 font-light text-sm py-2">
                Sobre
              </a>
              <a href="#" className="block text-white hover:text-white/80 font-light text-sm py-2">
                Tratamentos
              </a>
              <a href="#" className="block text-white hover:text-white/80 font-light text-sm py-2">
                Clínica
              </a>
              <a href="#" className="block text-white hover:text-white/80 font-light text-sm py-2">
                Estética
              </a>
              <a href="#" className="block text-white hover:text-white/80 font-light text-sm py-2">
                Contato
              </a>
              <div className="flex gap-2 pt-2 border-t border-white border-opacity-20">
                <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-white text-sm hover:bg-opacity-30 flex-1">
                  PT
                </button>
                <button className="px-3 py-1 bg-white bg-opacity-20 rounded text-white text-sm hover:bg-opacity-30 flex-1">
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
