import { en } from "./en"
import { pt } from "./pt"

// Cache dictionaries in memory
const dictionaries = {
  en,
  pt,
}

export async function getDictionary(locale: string) {
  // Ensure we have a valid language parameter
  const validLocale = locale && ["en", "pt"].includes(locale) ? locale : "pt"

  try {
    return dictionaries[validLocale as keyof typeof dictionaries]
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${validLocale}`, error)
    // Return a minimal dictionary to prevent errors
    return {
      navigation: {
        about: "About",
        services: "Services",
        gallery: "Gallery",
        contact: "Contact",
      },
      footer: {
        contact: {
          title: "Contact Us",
          address: { line1: "Av. Exemplo, 1234", line2: "São Paulo, SP" },
          phone: "(11) 9999-9999",
          email: "contato@drhenriqueoliveira.com",
        },
        links: {
          title: "Quick Links",
          about: "About Us",
          services: "Services",
          gallery: "Gallery",
          contact: "Contact",
        },
        hours: {
          title: "Office Hours",
          weekdays: { label: "Monday - Friday", hours: "9:00 - 18:00" },
          saturday: { label: "Saturday", hours: "9:00 - 14:00" },
          sunday: { label: "Sunday", hours: "Closed" },
        },
        copyright: "All rights reserved.",
      },
    }
  }
}
