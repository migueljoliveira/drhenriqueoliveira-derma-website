import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.about.title} | Dr. Henrique Oliveira`,
    description: dict.about.subtitle,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/about`,
      languages: {
        en: `https://drhenriqueoliveira.com/en/about`,
        pt: `https://drhenriqueoliveira.com/pt/about`,
      },
    },
    openGraph: {
      title: `${dict.about.title} | Dr. Henrique Oliveira`,
      description: dict.about.subtitle,
      url: `https://drhenriqueoliveira.com/${params.lang}/about`,
      siteName: "Dr. Henrique Oliveira",
      images: [
        {
          url: "/dr-oliveira-1.png",
          width: 800,
          height: 600,
          alt: "Dr. Henrique Oliveira",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.about.title} | Dr. Henrique Oliveira`,
      description: dict.about.subtitle,
      images: ["/dr-oliveira-1.png"],
    },
  }
}
