"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  lang: string
  dictionary: any
}

export function AnimatedHeader({ lang, dictionary = {} }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
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
        {/* Animated gradient background */}
        <motion.div
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
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* SVG clipPath definition - more angled wave */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="headerWave" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H1 V0.7 C0.85,0.75 0.7,0.8 0.55,0.75 C0.4,0.7 0.25,0.65 0.1,0.75 C0.05,0.8 0.025,0.82 0,0.8 V0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Animated subtle wave pattern overlay */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ zIndex: 1, opacity: 0.1 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
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
        </motion.div>

        {/* Content container - reduced vertical padding */}
        <div className="container mx-auto px-6 py-3 flex items-center justify-between relative z-10">
          <motion.div
            className="flex items-center space-x-6 cursor-pointer"
            onClick={() => handleNavigation(`/${lang}`)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo with animation */}
            <motion.div
              className="h-16 w-16 relative flex items-center justify-center"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {logoError ? (
                <motion.div
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-gray-500 font-medium">HO</span>
                </motion.div>
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
            </motion.div>
            <div className="font-thin text-white tracking-wider font-heading">
              <motion.div
                className="text-3xl md:text-4xl lg:text-5xl leading-none"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                DR. HENRIQUE
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl lg:text-5xl leading-none"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                OLIVEIRA
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "about" : "about"))}
              style={{
                color: isActive(lang === "pt" ? "/about" : "/about") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/about" : "/about") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
              onMouseEnter={() => setHoveredItem("about")}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {nav.about}

              {/* Animated underline */}
              <AnimatePresence>
                {hoveredItem === "about" && !isActive(lang === "pt" ? "/about" : "/about") && (
                  <motion.div
                    className="h-0.5 bg-white rounded-full mt-0.5"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <motion.button
                onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "services" : "services"))}
                onMouseEnter={() => {
                  setHoveredItem("services")
                  setServicesDropdownOpen(true)
                }}
                style={{
                  color: isAnyServiceActive() ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                }}
                className={`transition-colors flex items-center ${isAnyServiceActive() ? "font-medium" : "hover:text-white"}`}
                disabled={isNavigating}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {nav.services}
                <ChevronDown className="ml-1 h-4 w-4" />

                {/* Animated underline */}
                <AnimatePresence>
                  {hoveredItem === "services" && !isAnyServiceActive() && (
                    <motion.div
                      className="h-0.5 bg-white rounded-full mt-0.5 absolute bottom-0 left-0"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              {servicesDropdownOpen && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <motion.button
                      onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "technologies" : "technologies"))}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                        isActive(lang === "pt" ? "/technologies" : "/technologies") ? "bg-gray-100" : ""
                      }`}
                      role="menuitem"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {nav.technologies || (lang === "pt" ? "Tecnologias" : "Technologies")}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "dermatology" : "dermatology"))}
              style={{
                color: isActive(lang === "pt" ? "/dermatology" : "/dermatology")
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/dermatology" : "/dermatology") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
              onMouseEnter={() => setHoveredItem("dermatology")}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {nav.dermatology}

              {/* Animated underline */}
              <AnimatePresence>
                {hoveredItem === "dermatology" && !isActive(lang === "pt" ? "/dermatology" : "/dermatology") && (
                  <motion.div
                    className="h-0.5 bg-white rounded-full mt-0.5"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "aesthetic" : "aesthetic"))}
              style={{
                color: isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
              onMouseEnter={() => setHoveredItem("aesthetic")}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {nav.aesthetic}

              {/* Animated underline */}
              <AnimatePresence>
                {hoveredItem === "aesthetic" && !isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") && (
                  <motion.div
                    className="h-0.5 bg-white rounded-full mt-0.5"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "contact" : "contact"))}
              style={{
                color: isActive(lang === "pt" ? "/contact" : "/contact") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
              }}
              className={`transition-colors ${isActive(lang === "pt" ? "/contact" : "/contact") ? "font-medium" : "hover:text-white"}`}
              disabled={isNavigating}
              onMouseEnter={() => setHoveredItem("contact")}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {nav.contact}

              {/* Animated underline */}
              <AnimatePresence>
                {hoveredItem === "contact" && !isActive(lang === "pt" ? "/contact" : "/contact") && (
                  <motion.div
                    className="h-0.5 bg-white rounded-full mt-0.5"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              {["pt", "en"].map((l) => (
                <motion.button
                  key={l}
                  onClick={() => handleNavigation(getLanguageUrl(l))}
                  className={`rounded-full w-10 h-10 flex items-center justify-center transition ${
                    lang === l
                      ? "bg-white text-[#ff5c8d] font-medium shadow-md"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/50"
                  }`}
                  aria-label={`Switch to ${l === "pt" ? "Portuguese" : "English"}`}
                  disabled={isNavigating}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {l.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              {["pt", "en"].map((l) => (
                <motion.button
                  key={l}
                  onClick={() => handleNavigation(getLanguageUrl(l))}
                  className={`rounded-full w-10 h-10 flex items-center justify-center transition ${
                    lang === l
                      ? "bg-white text-[#ff5c8d] font-medium shadow-md"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/50"
                  }`}
                  aria-label={`Switch to ${l === "pt" ? "Portuguese" : "English"}`}
                  disabled={isNavigating}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {l.toUpperCase()}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="md:hidden text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 relative z-10"
              style={{ backgroundColor: "rgba(255, 92, 141, 0.95)" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-6 flex flex-col space-y-4">
                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "about" : "about"))}
                  style={{
                    color: isActive(lang === "pt" ? "/about" : "/about") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left ${isActive(lang === "pt" ? "/about" : "/about") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {nav.about}
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "services" : "services"))}
                  style={{
                    color: isActive(lang === "pt" ? "/services" : "/services")
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left ${isActive(lang === "pt" ? "/services" : "/services") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {nav.services}
                </motion.button>

                {/* Technologies sub-item with indentation */}
                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "technologies" : "technologies"))}
                  style={{
                    color: isActive(lang === "pt" ? "/technologies" : "/technologies")
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left pl-6 ${isActive(lang === "pt" ? "/technologies" : "/technologies") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  — {nav.technologies || (lang === "pt" ? "Tecnologias" : "Technologies")}
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "dermatology" : "dermatology"))}
                  style={{
                    color: isActive(lang === "pt" ? "/dermatology" : "/dermatology")
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left ${isActive(lang === "pt" ? "/dermatology" : "/dermatology") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {nav.dermatology}
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "aesthetic" : "aesthetic"))}
                  style={{
                    color: isActive(lang === "pt" ? "/aesthetic" : "/aesthetic")
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left ${isActive(lang === "pt" ? "/aesthetic" : "/aesthetic") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {nav.aesthetic}
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation(getLocalizedUrl(lang === "pt" ? "contact" : "contact"))}
                  style={{
                    color: isActive(lang === "pt" ? "/contact" : "/contact") ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                  }}
                  className={`py-2 text-left ${isActive(lang === "pt" ? "/contact" : "/contact") ? "font-medium" : "hover:text-white"}`}
                  disabled={isNavigating}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {nav.contact}
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}
