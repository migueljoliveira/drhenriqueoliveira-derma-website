import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"
import { TrichologySlideshow } from "@/components/trichology-slideshow"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Dermatologia Clínica | Dr. Henrique Oliveira"
      : "Clinical Dermatology | Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Tratamentos dermatológicos clínicos para diversas condições da pele, cabelo e unhas. Diagnóstico e tratamento personalizado."
      : "Clinical dermatology treatments for various skin, hair, and nail conditions. Personalized diagnosis and treatment."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/${params.lang === "pt" ? "dermatologia" : "dermatology"}`,
      languages: {
        en: "https://drhenriqueoliveira.com/en/dermatology",
        pt: "https://drhenriqueoliveira.com/pt/dermatologia",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}/${params.lang === "pt" ? "dermatologia" : "dermatology"}`,
      siteName: "Dr. Henrique Oliveira",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export default async function DermatologyPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Extract clinical dermatology and related items from the services dictionary
  const clinicalItems = dict.services.items.filter((item: any) =>
    [
      "Clinical Dermatology",
      "Dermatologia Clínica",
      "Surgical Dermatology",
      "Dermatologia Cirúrgica",
      "Trichology and Onychology",
      "Tricologia e Onicologia",
    ].includes(item.title),
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

  // Define detailed alt texts based on language
  const altTexts = {
    moleExamination:
      params.lang === "pt"
        ? "Exame dermatológico de uma lesão cutânea com lupa, realizado por um dermatologista usando luvas médicas azuis"
        : "Dermatological examination of a skin lesion with magnifying glass, performed by a dermatologist wearing blue medical gloves",
    inflammatorySkin:
      params.lang === "pt"
        ? "Braço de criança com condição inflamatória da pele mostrando erupção cutânea avermelhada, demonstrando sintomas que requerem tratamento dermatológico"
        : "Child's arm with inflammatory skin condition showing reddish rash, demonstrating symptoms requiring dermatological treatment",
    eyelidLesion:
      params.lang === "pt"
        ? "Close-up de uma verruga filiforme na pálpebra, um tipo comum de lesão cutânea tratada em consultas de tricologia e onicologia"
        : "Close-up of a filiform wart on the eyelid, a common type of skin lesion treated in trichology and onychology consultations",
  }

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
              name: params.lang === "pt" ? "Condições Dermatológicas" : "Dermatological Conditions",
              possibleTreatment: {
                "@type": "MedicalTherapy",
                name:
                  params.lang === "pt" ? "Tratamentos Dermatológicos Clínicos" : "Clinical Dermatological Treatments",
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
              <h1 className="heading-xl mb-6">
                {params.lang === "pt" ? "Dermatologia Clínica" : "Clinical Dermatology"}
              </h1>
              <p className="text-lg text-gray-700">
                {params.lang === "pt"
                  ? "Diagnóstico e tratamento especializado para diversas condições dermatológicas."
                  : "Specialized diagnosis and treatment for various dermatological conditions."}
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
                    {index === 2 ? (
                      <div className="relative aspect-square w-full rounded-xl shadow-md overflow-hidden">
                        <TrichologySlideshow />
                      </div>
                    ) : (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={
                            index === 0
                              ? "/mole-examination.jpeg"
                              : index === 1
                                ? "/inflammatory-skin-condition.jpeg"
                                : "/eyelid-lesion.jpeg"
                          }
                          alt={
                            index === 0
                              ? altTexts.moleExamination
                              : index === 1
                                ? altTexts.inflammatorySkin
                                : altTexts.eyelidLesion
                          }
                          fill
                          className="object-cover rounded-xl shadow-md"
                        />
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
                            className="inline-block w-2 h-3 mt-2 mr-2"
                            style={{
                              border: "1px solid #f5c8df",
                              borderRadius: "0 50% 50% 50%",
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
                  {params.lang === "pt"
                    ? "Tratamento de uma ampla variedade de condições dermatológicas com abordagens personalizadas e eficazes."
                    : "Treatment of a wide variety of dermatological conditions with personalized and effective approaches."}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relevantConditions.map((category: any, index: number) => (
                  <div key={index} className="bg-[#f8ebef] rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.conditions.map((condition: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span
                            className="inline-block w-2 h-3 mt-2 mr-2"
                            style={{
                              border: "1px solid #f5c8df",
                              borderRadius: "0 50% 50% 50%",
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
                {params.lang === "pt"
                  ? "Agende sua consulta para uma avaliação dermatológica completa"
                  : "Schedule your appointment for a complete dermatological evaluation"}
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                {params.lang === "pt"
                  ? "Entre em contato para agendar uma consulta com Dr. Henrique Oliveira."
                  : "Contact to schedule an appointment with Dr. Henrique Oliveira."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${params.lang}/${params.lang === "pt" ? "contato" : "contact"}`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                  style={{ backgroundColor: "#f96c8b", color: "white" }}
                >
                  {params.lang === "pt" ? "Agendar Consulta" : "Schedule Appointment"}
                </Link>
                <Link
                  href={`/${params.lang}/faq`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                  style={{ backgroundColor: "#e8e8e8", color: "#31029c" }}
                >
                  {params.lang === "pt" ? "Ver Perguntas Frequentes" : "View FAQs"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
