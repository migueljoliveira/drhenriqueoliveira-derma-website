import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"
import { TrichologySlideshow } from "@/components/trichology-slideshow"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title = "Dermatologia Clínica | Dr. Henrique Oliveira"
  const description =
    "Tratamentos dermatológicos clínicos para diversas condições da pele, cabelo e unhas. Diagnóstico e tratamento personalizado."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/dermatologia`,
      languages: {
        en: "https://drhenriqueoliveira.com/en/dermatology",
        pt: "https://drhenriqueoliveira.com/pt/dermatologia",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}/dermatologia`,
      siteName: "Dr. Henrique Oliveira",
      locale: "pt_PT",
      type: "website",
    },
  }
}

export default async function DermatologyPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Extract clinical dermatology and related items from the services dictionary
  // Filter to only include the first and third items (Clinical and Trichology)
  const clinicalItems = dict.services.items.filter((item: any) =>
    ["Clinical Dermatology", "Dermatologia Clínica", "Trichology and Onychology", "Tricologia e Onicologia"].includes(
      item.title,
    ),
  )

  // Extract relevant conditions
  const relevantConditions = dict.services.conditions.categories.filter((category: any) =>
    [
      "Inflammatory Diseases",
      "Doenças Inflamatórias",
      "Common Problems",
      "Problemas Comuns",
      "Skin Lesions",
      "Lesões Cutâneas",
    ].includes(category.title),
  )

  // Define detailed alt texts
  const altTexts = {
    drySkin:
      "Close-up de pele seca com textura escamosa, mostrando detalhes da superfície cutânea tratada em dermatologia clínica",
  }

  const trichologyImages = [
    {
      src: "/hair-closeup.jpeg",
      alt: "Hair closeup showing follicles and scalp",
    },
    {
      src: "/nail-fungus.jpeg",
      alt: "Nail fungus condition showing affected fingernails",
    },
  ]

  return (
    <>
      <Script
        id="dermatology-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            about: {
              "@type": "MedicalBusiness",
              name: "Dr. Henrique Oliveira - Dermatologia",
              medicalSpecialty: ["Dermatology", "Clinical Dermatology"],
            },
            mainEntity: {
              "@type": "MedicalCondition",
              name: "Condições Dermatológicas",
              possibleTreatment: {
                "@type": "MedicalTherapy",
                name: "Tratamentos Dermatológicos Clínicos",
              },
            },
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Dermatologia Clínica</h1>
              <p className="text-lg text-gray-700">
                Diagnóstico e tratamento especializado para diversas condições dermatológicas.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-16">
              {clinicalItems.map((service: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-10"
                  style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
                >
                  <div className="md:w-2/5">
                    {index === 0 ? (
                      <div className="relative aspect-square w-full">
                        <Image
                          src="/dry-skin-closeup.jpeg"
                          alt={altTexts.drySkin}
                          fill
                          className="object-cover rounded-xl shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square">
                        <TrichologySlideshow images={trichologyImages} />
                      </div>
                    )}
                  </div>
                  <div className="md:w-3/5">
                    <h2 className="heading-md mb-4" style={{ color: "#2E2E2E" }}>
                      {service.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span
                            className="inline-block w-2 h-2 mt-2 mr-2 relative"
                            style={{
                              border: "1px solid #f5c8df",
                              borderRadius: "0% 50% 50% 50%",
                              transform: "rotate(45deg)",
                              backgroundColor: "transparent",
                            }}
                          ></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions Treated Section */}
        <section className="py-16 bg-[#e8e8e8]">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  {dict.services.conditions.title}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Tratamento de uma ampla variedade de condições dermatológicas com abordagens personalizadas e
                  eficazes.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relevantConditions.map((category: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.conditions.map((condition: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span
                            className="inline-block w-2 h-2 mt-2 mr-2 relative"
                            style={{
                              border: "1px solid #f5c8df",
                              borderRadius: "0% 50% 50% 50%",
                              transform: "rotate(45deg)",
                              backgroundColor: "transparent",
                            }}
                          ></span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16" style={{ backgroundColor: "#e8e8e8" }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
                Agende sua consulta para uma avaliação dermatológica completa
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                Entre em contato para agendar uma consulta com Dr. Henrique Oliveira.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${params.lang}/contato`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                  style={{ backgroundColor: "#f96c8b", color: "white" }}
                >
                  Agendar Consulta
                </Link>
                <Link
                  href={`/${params.lang}/faq`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                  style={{ backgroundColor: "#e8e8e8", color: "#31029c" }}
                >
                  Ver Perguntas Frequentes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
