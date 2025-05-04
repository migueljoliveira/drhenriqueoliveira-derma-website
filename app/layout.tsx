import type React from "react"
import { Inter, Playfair_Display, Raleway } from "next/font/google"
import "./globals.css"
import { ScrollRestoration } from "@/components/scroll-restoration"
import type { Metadata } from "next"

// Font setup
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://drhenriqueoliveira.com"),
  title: {
    default: "Dr. Henrique Oliveira - Dermatologista",
    template: "%s | Dr. Henrique Oliveira",
  },
  description:
    "Especialista em Dermatologia estética e cosmética com mais de 30 anos de experiência. Atendimento em Coimbra e Viseu.",
  keywords: ["dermatologista", "dermatologia", "estética", "cosmética", "pele", "Coimbra", "Viseu", "Portugal"],
  authors: [{ name: "Dr. Henrique Oliveira" }],
  creator: "Dr. Henrique Oliveira",
  publisher: "Dr. Henrique Oliveira",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.jpg" }],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://drhenriqueoliveira.com",
    siteName: "Dr. Henrique Oliveira - Dermatologista",
    title: "Dr. Henrique Oliveira - Dermatologista",
    description:
      "Especialista em Dermatologia estética e cosmética com mais de 30 anos de experiência. Atendimento em Coimbra e Viseu.",
    images: [
      {
        url: "/dr-oliveira-1.png",
        width: 800,
        height: 600,
        alt: "Dr. Henrique Oliveira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Henrique Oliveira - Dermatologista",
    description:
      "Especialista em Dermatologia estética e cosmética com mais de 30 anos de experiência. Atendimento em Coimbra e Viseu.",
    images: ["/dr-oliveira-1.png"],
    creator: "@drhenriqueoliveira",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://drhenriqueoliveira.com",
    languages: {
      en: "https://drhenriqueoliveira.com/en",
      pt: "https://drhenriqueoliveira.com/pt",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${playfair.variable} ${raleway.variable} font-sans`}>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  )
}
