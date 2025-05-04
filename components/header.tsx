"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  lang: string
  dictionary: any
}

export function Header({ lang, dictionary = {} }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get the current route without the language prefix
  const currentRoute = pathname.replace(`/${lang}`, "") || "/"

  const isActive = (path: string) => {
    // Handle special Portuguese routes
    if (lang === "pt") {
      switch (path) {
        case "/about":
          return currentRoute === "/dr-henrique-oliveira"
        case "/services":
          return currentRoute === "/servicos"
        case "/contact":
          return currentRoute === "/contato"
        case "/dermatology":
          return currentRoute === "/dermatologia"
        case "/aesthetic":
          return currentRoute === "/estetica"
        case "/technologies":
          return currentRoute === "/tecnologias"
        default:
          return currentRoute === path
      }
    }
    return currentRoute === path
  }

  // Check if any service page is active
  const isAnyServiceActive = () => {
    return isActive("/services") || isActive("/technologies")
  }

  // Safely access navigation items with fallbacks
  const nav = dictionary?.navigation || {
    about: "About",
    services: "Services",
    contact: "Contact",
    dermatology: "Clinical",
    aesthetic: "Aesthetic",
    technologies: "Technologies",
  }

  // Function to get the equivalent URL in another language
  const getLanguageUrl = (targetLang: string) => {
    // Map current path to equivalent in target language
    const currentPath = pathname.replace(`/${lang}`, "")

    // Handle special path translations
    if (targetLang === "pt" && lang === "en") {
      if (currentPath === "/about") return "/pt/dr-henrique-oliveira"
      if (currentPath === "/services") return "/pt/servicos"
      if (currentPath === "/contact") return "/pt/contato"
      if (currentPath === "/dermatology") return "/pt/dermatologia"
      if (currentPath === "/aesthetic") return "/pt/estetica"
      if (currentPath === "/technologies") return "/pt/tecnologias"
    } else if (targetLang === "en" && lang === "pt") {
      if (currentPath === "/dr-henrique-oliveira") return "/en/about"
      if (currentPath === "/servicos") return "/en/services"
      if (currentPath === "/contato") return "/en/contact"
      if (currentPath === "/dermatologia") return "/en/dermatology"
      if (currentPath === "/estetica") return "/en/aesthetic"
      if (currentPath === "/tecnologias") return "/en/technologies"
    }

    return `/${targetLang}${currentPath}`
  }

  // Handle navigation with debounce to prevent double clicks
  const handleNavigation = useCallback(
    (url: string) => {
      if (isNavigating) return

      setIsNavigating(true)
      router.push(url)

      // Reset after navigation
      setTimeout(() => {
        setIsNavigating(false)
      }, 500)

      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }

      // Close services dropdown if open
      if (servicesDropdownOpen) {
        setServicesDropdownOpen(false)
      }
    },
    [isNavigating, isMenuOpen, servicesDropdownOpen, router],
  )

  // Get localized URLs
  const getLocalizedUrl = (path: string) => {
    // Handle special Portuguese routes
    if (lang === "pt") {
      switch (path) {
        case "services":
          return `/${lang}/servicos`
        case "about":
          return `/${lang}/dr-henrique-oliveira`
        case "contact":
          return `/${lang}/contato`
        case "dermatology":
          return `/${lang}/dermatologia`
        case "aesthetic":
          return `/${lang}/estetica`
        case "technologies":
          return `/${lang}/tecnologias`
        default:
          return `/${lang}/${path}`
      }
    }
    return `/${lang}/${path}`
  }

  return (
    <div className="relative">
      {/* Header with more angled wave-shaped bottom and reduced height */}
      <header
        className="relative"
        style={{
          clipPath: "url(#headerWave)",
          paddingBottom: "70px", // Reduced padding to make header less tall
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Smooth gradient background - keeping the same gradient */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(135deg, 
              #ff5c8d 0%, 
              #ff6e94 15%, 
              #ff7e9b 30%, 
              #ff8aa1 45%, 
              #ff9eac 60%, 
              #ffb3b8 75%, 
              #ffc5ca 85%, 
              #ffd6dc 100%
            )
          `,
            zIndex: 0,
          }}
        ></div>

        {/* SVG clipPath definition - more angled wave */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="headerWave" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H1 V0.7 C0.85,0.75 0.7,0.8 0.55,0.75 C0.4,0.7 0.25,0.65 0.1,0.75 C0.05,0.8 0.025,0.82 0,0.8 V0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Subtle wave pattern overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1, opacity: 0.1 }}>
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Content container - reduced vertical padding */}
        <div className="container mx-auto px-6 py-3 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-6 cursor-pointer" onClick={() => handleNavigation(`/${lang}`)}>
            {/* Logo */}
            <div className="h-16 w-16 relative flex items-center justify-center">
              {logoError ? (
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-medium">HO</span>
                </div>
              ) : (
                <Image
                  src="/logo-new.jpg"
                  alt="Dr. Henrique Oliveira Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-full"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
            <div className="font-thin text-white tracking-wider font-heading">
              <div className="text-3xl md:text-4xl lg:text-5xl leading-none">DR. HENRIQUE</div>
              <div className="text-3xl md:text-4xl lg:text-5xl leading-none">OLIVEIRA</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "about" : "about"))}
              style={{
                color: isActive(lang === "pt" ? "/about" : "/about") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/about" : "/about") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
            >
              {nav.about}
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "services" : "services"))}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                style={{
                  color: isAnyServiceActive() ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                }}
                className={`transition-colors flex items-center ${isAnyServiceActive() ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.services}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {servicesDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "technologies" : "technologies"))}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                        isActive(lang === "pt" ? "/technologies" : "/technologies") ? "bg-gray-100" : ""
                      }`}
                      role="menuitem"
                    >
                      {nav.technologies || (lang === "pt" ? "Tecnologias" : "Technologies")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "dermatology" : "dermatology"))}
              style={{
                color: isActive(lang === "pt" ? "/dermatology" : "/dermatology")
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/dermatology" : "/dermatology") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
            >
              {nav.dermatology}
            </button>
            <button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "aesthetic" : "aesthetic"))}
              style={{
                color: isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
            >
              {nav.aesthetic}
            </button>
            <button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "contact" : "contact"))}
              style={{
                color: isActive(lang === "pt" ? "/contact" : "/contact") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                backgroundColor: isActive(lang === "pt" ? "/contact" : "/contact") ? "#E6F0FF" : "transparent",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/contact" : "/contact") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
            >
              {nav.contact}
            </button>
          </nav>

          {/* Language Switcher - Single instance for both desktop and mobile */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavigation(getLanguageUrl("pt"))}
              className={`rounded-full w-8 h-8 flex items-center justify-center transition ${
                lang === "pt" ? "bg-white text-[#ff5c8d] shadow-md" : "bg-white/30 text-white hover:bg-white/50"
              }`}
              aria-label="Switch to Portuguese"
              disabled={isNavigating}
            >
              PT
            </button>
            <button
              onClick={() => handleNavigation(getLanguageUrl("en"))}
              className={`rounded-full w-8 h-8 flex items-center justify-center transition ${
                lang === "en" ? "bg-white text-[#ff5c8d] shadow-md" : "bg-white/30 text-white hover:bg-white/50"
              }`}
              aria-label="Switch to English"
              disabled={isNavigating}
            >
              EN
            </button>

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              className="md:hidden ml-2 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 relative z-10" style={{ backgroundColor: "rgba(255, 92, 141, 0.95)" }}>
            <nav className="container mx-auto px-6 flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "about" : "about"))}
                style={{
                  color: isActive(lang === "pt" ? "/about" : "/about") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                }}
                className={`py-2 text-left ${isActive(lang === "pt" ? "/about" : "/about") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.about}
              </button>

              {/* Services main button */}
              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "services" : "services"))}
                style={{
                  color: isActive(lang === "pt" ? "/services" : "/services") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                }}
                className={`py-2 text-left ${isActive(lang === "pt" ? "/services" : "/services") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.services}
              </button>

              {/* Technologies sub-item with indentation */}
              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "technologies" : "technologies"))}
                style={{
                  color: isActive(lang === "pt" ? "/technologies" : "/technologies")
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.85)",
                }}
                className={`py-2 text-left pl-6 ${isActive(lang === "pt" ? "/technologies" : "/technologies") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                — {nav.technologies || (lang === "pt" ? "Tecnologias" : "Technologies")}
              </button>

              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "dermatology" : "dermatology"))}
                style={{
                  color: isActive(lang === "pt" ? "/dermatology" : "/dermatology")
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.85)",
                }}
                className={`py-2 text-left ${isActive(lang === "pt" ? "/dermatology" : "/dermatology") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.dermatology}
              </button>

              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "aesthetic" : "aesthetic"))}
                style={{
                  color: isActive(lang === "pt" ? "/aesthetic" : "/aesthetic")
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.85)",
                }}
                className={`py-2 text-left ${isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.aesthetic}
              </button>

              <button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "contact" : "contact"))}
                style={{
                  color: isActive(lang === "pt" ? "/contact" : "/contact") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                  backgroundColor: isActive(lang === "pt" ? "/contact" : "/contact") ? "#E6F0FF" : "transparent",
                }}
                className={`py-2 text-left ${isActive(lang === "pt" ? "/contact" : "/contact") ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
              >
                {nav.contact}
              </button>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
