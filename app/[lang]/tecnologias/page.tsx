import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import TechnologiesClientPage from "@/components/TechnologiesClientPage"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Tecnologias Avançadas | Dr. Henrique Oliveira"
      : "Advanced Technologies | Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Conheça as tecnologias avançadas utilizadas nos tratamentos dermatológicos e estéticos do Dr. Henrique Oliveira."
      : "Learn about the advanced technologies used in Dr. Henrique Oliveira's dermatological and aesthetic treatments."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira-derma.com/${params.lang}/tecnologias`,
      languages: {
        en: "https://drhenriqueoliveira-derma.com/en/technologies",
        pt: "https://drhenriqueoliveira-derma.com/pt/tecnologias",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira-derma.com/${params.lang}/tecnologias`,
      siteName: "Dr. Henrique Oliveira",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export default function TecnologiasPage({ params }: { params: { lang: string } }) {
  return <TechnologiesClientPage />
}
