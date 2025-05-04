"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"
import { motion } from "framer-motion"

interface FooterProps {
  lang: string
  dictionary: any
}

export function Footer({ lang, dictionary }: FooterProps) {
  // Safely access footer data with fallbacks
  const dict = dictionary?.footer || {
    contact: {
      title: "Contact Us",
      address: { line1: "Coimbra", line2: "Viseu" },
      phone: "(11) 9999-9999",
      email: "h.g.oliveira@gmail.com",
    },
    links: {
      title: "Quick Links",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    hours: {
      title: "Office Hours",
      weekdays: { label: "Monday - Friday", hours: "9:00 - 18:00" },
      saturday: { label: "Saturday", hours: "9:00 - 14:00" },
      sunday: { label: "Sunday", hours: "Closed" },
    },
    copyright: "All rights reserved.",
  }

  return (
    <footer style={{ backgroundColor: "#FFFFFF" }} className="pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={{ color: "#2E2E2E" }}>
              {dict.contact.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <MapPin className="h-5 w-5 mr-2 mt-0.5" style={{ color: "#ff6bd0" }} />
                </motion.div>
                <span className="text-gray-700">
                  {dict.contact.address.line1}
                  <br />
                  {dict.contact.address.line2}
                </span>
              </li>
              <li className="flex items-center">
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Phone className="h-5 w-5 mr-2" style={{ color: "#ff6bd0" }} />
                </motion.div>
                <span className="text-gray-700">{dict.contact.phone}</span>
              </li>
              <li className="flex items-center">
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Mail className="h-5 w-5 mr-2" style={{ color: "#ff6bd0" }} />
                </motion.div>
                <span className="text-gray-700">{dict.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={{ color: "#2E2E2E" }}>
              {dict.links.title}
            </h3>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={`/${lang}/about`} className="text-gray-700 hover:text-[#31029c] transition-colors">
                    {dict.links.about}
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={`/${lang}/services`} className="text-gray-700 hover:text-[#31029c] transition-colors">
                    {dict.links.services}
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={`/${lang}/contact`} className="text-gray-700 hover:text-[#31029c] transition-colors">
                    {dict.links.contact}
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-medium mb-4" style={{ color: "#2E2E2E" }}>
              {dict.hours.title}
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-700">{dict.hours.weekdays.label}:</span>
                <span className="text-gray-700">{dict.hours.weekdays.hours}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">{dict.hours.saturday.label}:</span>
                <span className="text-gray-700">{dict.hours.saturday.hours}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">{dict.hours.sunday.label}:</span>
                <span className="text-gray-700">{dict.hours.sunday.hours}</span>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.2 }}>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" style={{ color: "#ff6bd0" }} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -10 }} transition={{ duration: 0.2 }}>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" style={{ color: "#ff6bd0" }} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#260279] text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Dr. Henrique Oliveira. {dict.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
