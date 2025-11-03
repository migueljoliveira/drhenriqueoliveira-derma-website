import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title = "Dermatologia Estética | Dr. Henrique Oliveira"

  const description =
    "Tratamentos estéticos avançados para rejuvenescimento facial e corporal. Procedimentos minimamente invasivos com resultados naturais."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira-derma.com/${params.lang}/estetica`,
      languages: {
        en: "https://drhenriqueoliveira-derma.com/en/aesthetic",
        pt: "https://drhenriqueoliveira-derma.com/pt/estetica",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira-derma.com/${params.lang}/estetica`,
      siteName: "Dr. Henrique Oliveira",
      locale: "pt_PT",
      type: "website",
    },
  }
}

export default async function AestheticPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Extract aesthetic dermatology and related items from the services dictionary
  const aestheticItems = dict.services.items.filter((item: any) =>
    ["Aesthetic Dermatology", "Dermatologia Estética", "Advanced Technologies", "Tecnologias Avançadas"].includes(
      item.title,
    ),
  )

  // Define detailed alt texts
  const altTexts = {
    facialExamination:
      "Médico dermatologista examinando o rosto de uma paciente para tratamento cosmético, avaliando a qualidade da pele com luvas médicas",
    facialMarking:
      "Procedimento de marcação facial pré-tratamento estético, onde o médico desenha linhas de orientação no rosto da paciente com touca cirúrgica",
    seniorAssessment:
      "Avaliação facial personalizada em paciente sênior com marcações para procedimento de rejuvenescimento, demonstrando planejamento preciso de tratamento",
  }

  return (
    <>
      <Script
        id="aesthetic-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            about: {
              "@type": "MedicalBusiness",
              name: "Dr. Henrique Oliveira - Dermatologia",
              medicalSpecialty: ["Aesthetic Dermatology", "Cosmetic Dermatology"],
            },
            mainEntity: {
              "@type": "MedicalProcedure",
              name: "Procedimentos Estéticos",
              howPerformed: "Procedimentos minimamente invasivos realizados em consultório",
            },
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Dermatologia Estética</h1>
              <p className="text-lg text-gray-700">
                Procedimentos estéticos avançados para rejuvenescimento e harmonização facial com resultados naturais.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-16">
              {aestheticItems.map((service: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-10"
                  style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
                >
                  <div className="md:w-2/5">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={index === 0 ? "/facial-examination-aesthetic.jpeg" : "/facial-marking-procedure.jpeg"}
                        alt={index === 0 ? altTexts.facialExamination : altTexts.facialMarking}
                        fill
                        className="object-cover rounded-xl shadow-md"
                      />
                    </div>
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

        {/* Aesthetic Procedures Section */}
        <section className="py-10 bg-[#e8e8e8]">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  Procedimentos Estéticos
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Dr. Henrique Oliveira oferece uma ampla gama de procedimentos estéticos minimamente invasivos para
                  melhorar a aparência da pele e restaurar sua vitalidade.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#FAFAFA] rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                    Rejuvenescimento Facial
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Toxina botulínica (Botox)",
                      "Preenchimentos com ácido hialurônico",
                      "Bioestimuladores de colágeno",
                      "Skinbooster para hidratação profunda",
                      "Peelings químicos",
                      "Microagulhamento",
                      "Harmonização facial completa",
                    ].map((procedure, i) => (
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
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                    Tecnologias Avançadas
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Radiofrequência para firmeza da pele",
                      "Laser para rejuvenescimento",
                      "Luz intensa pulsada (IPL)",
                      "Ultrassom microfocado",
                      "Criolipólise para redução de gordura",
                      "PDRN e PRF para bioestimulação",
                      "Terapia fotodinâmica",
                    ].map((procedure, i) => (
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
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section Placeholder */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  Resultados
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Os procedimentos estéticos proporcionam resultados naturais e duradouros.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className="relative aspect-[4/3] w-full mb-4">
                    <Image
                      src="/senior-facial-assessment.jpeg"
                      alt={altTexts.seniorAssessment}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium" style={{ color: "#2E2E2E" }}>
                    Avaliação Personalizada
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Cada procedimento é cuidadosamente planejado de acordo com as necessidades individuais de cada
                    paciente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10" style={{ backgroundColor: "#e8e8e8" }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
                Agende sua consulta para uma avaliação estética personalizada
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                Entre em contato para agendar uma consulta com Dr. Henrique Oliveira.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${params.lang}/contato`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition text-white"
                  style={{ backgroundColor: "#f96c8b" }}
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
