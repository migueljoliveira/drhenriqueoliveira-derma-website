import type React from "react"
import { Footer } from "@/components/footer"
import { NavigationIndicator } from "@/components/navigation-indicator"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import { AnimatedHeader } from "@/components/animated-header"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt" ? "Dr. Henrique Oliveira - Dermatologista" : "Dr. Henrique Oliveira - Dermatologist"

  const description =
    params.lang === "pt"
      ? "Especialista em Dermatologia estética e cosmética com mais de 30 anos de experiência. Atendimento em Coimbra e Viseu."
      : "Specialist in Aesthetic and Cosmetic Dermatology with over 30 years of experience. Practice in Coimbra and Viseu."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}`,
      languages: {
        en: "https://drhenriqueoliveira.com/en",
        pt: "https://drhenriqueoliveira.com/pt",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}`,
      siteName: title,
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }]
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  // Ensure we have a valid language parameter
  const validLang = params.lang && ["en", "pt"].includes(params.lang) ? params.lang : "pt"

  // Get dictionary with error handling
  let dictionary
  try {
    dictionary = await getDictionary(validLang)
  } catch (error) {
    console.error("Failed to load dictionary:", error)
    // Provide a fallback dictionary with basic navigation
    dictionary = {
      navigation: {
        about: "About",
        services: "Services",
        contact: "Contact",
      },
      footer: {
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
      },
    }
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Dr. Henrique Oliveira - Dermatologia",
            url: `https://drhenriqueoliveira.com/${validLang}`,
            logo: "https://drhenriqueoliveira.com/logo.svg",
            image: "https://drhenriqueoliveira.com/dr-oliveira-1.png",
            description:
              validLang === "pt"
                ? "Especialista em Dermatologia estética e cosmética com mais de 30 anos de experiência."
                : "Specialist in Aesthetic and Cosmetic Dermatology with over 30 years of experience.",
            address: [
              {
                "@type": "PostalAddress",
                addressLocality: "Coimbra",
                addressCountry: "Portugal",
              },
              {
                "@type": "PostalAddress",
                addressLocality: "Viseu",
                addressCountry: "Portugal",
              },
            ],
            email: "h.g.oliveira@gmail.com",
            telephone: "+351 123456789",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "14:00",
              },
            ],
            sameAs: ["https://www.facebook.com/CursoCCD/", "https://www.instagram.com/migueljoliveira"],
          }),
        }}
      />
      <Suspense fallback={<div className="h-24 bg-gradient-to-b from-pink-300 to-pink-200"></div>}>
        <NavigationIndicator />
      </Suspense>
      <Suspense fallback={<div className="h-24 bg-gradient-to-b from-pink-300 to-pink-200"></div>}>
        <AnimatedHeader lang={validLang} dictionary={dictionary} />
      </Suspense>
      <main>{children}</main>
      <Footer lang={validLang} dictionary={dictionary} />
    </>
  )
}
