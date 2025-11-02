import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Dermatologia Estética | Dr. Henrique Oliveira"
      : "Aesthetic Dermatology | Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Tratamentos estéticos avançados para rejuvenescimento facial e corporal. Procedimentos minimamente invasivos com resultados naturais."
      : "Advanced aesthetic treatments for facial and body rejuvenation. Minimally invasive procedures with natural results."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira-derma.com/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`,
      languages: {
        en: "https://drhenriqueoliveira-derma.com/en/aesthetic",
        pt: "https://drhenriqueoliveira-derma.com/pt/estetica",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira-derma.com/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`,
      siteName: "Dr. Henrique Oliveira",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
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

  // Define detailed alt texts based on language
  const altTexts = {
    facialExamination:
      params.lang === "pt"
        ? "Médico dermatologista examinando o rosto de uma paciente para tratamento cosmético, avaliando a qualidade da pele com luvas médicas"
        : "Dermatologist examining a patient's face for cosmetic treatment, assessing skin quality with medical gloves",
    facialMarking:
      params.lang === "pt"
        ? "Procedimento de marcação facial pré-tratamento estético, onde o médico desenha linhas de orientação no rosto da paciente com touca cirúrgica"
        : "Pre-aesthetic treatment facial marking procedure, where the doctor draws guidance lines on the patient's face with surgical cap",
    seniorAssessment:
      params.lang === "pt"
        ? "Avaliação facial personalizada em paciente sênior com marcações para procedimento de rejuvenescimento, demonstrando planejamento preciso de tratamento"
        : "Personalized facial assessment on senior patient with markings for rejuvenation procedure, demonstrating precise treatment planning",
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
              name: params.lang === "pt" ? "Procedimentos Estéticos" : "Aesthetic Procedures",
              howPerformed:
                params.lang === "pt"
                  ? "Procedimentos minimamente invasivos realizados em consultório"
                  : "Minimally invasive procedures performed in-office",
            },
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">
                {params.lang === "pt" ? "Dermatologia Estética" : "Aesthetic Dermatology"}
              </h1>
              <p className="text-lg text-gray-700">
                {params.lang === "pt"
                  ? "Procedimentos estéticos avançados para rejuvenescimento e harmonização facial com resultados naturais."
                  : "Advanced aesthetic procedures for facial rejuvenation and harmonization with natural results."}
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
        <section className="py-10" style={{ backgroundColor: "#e8e8e8" }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  {params.lang === "pt" ? "Procedimentos Estéticos" : "Aesthetic Procedures"}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {params.lang === "pt"
                    ? "Dr. Henrique Oliveira oferece uma ampla gama de procedimentos estéticos minimamente invasivos para melhorar a aparência da pele e restaurar sua vitalidade."
                    : "Dr. Henrique Oliveira offers a wide range of minimally invasive aesthetic procedures to improve skin appearance and restore its vitality."}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#f8ebef] rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                    {params.lang === "pt" ? "Rejuvenescimento Facial" : "Facial Rejuvenation"}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      params.lang === "pt" ? "Toxina botulínica (Botox)" : "Botulinum toxin (Botox)",
                      params.lang === "pt" ? "Preenchimentos com ácido hialurônico" : "Hyaluronic acid fillers",
                      params.lang === "pt" ? "Bioestimuladores de colágeno" : "Collagen biostimulators",
                      params.lang === "pt" ? "Skinbooster para hidratação profunda" : "Skinbooster for deep hydration",
                      params.lang === "pt" ? "Peelings químicos" : "Chemical peels",
                      params.lang === "pt" ? "Microagulhamento" : "Microneedling",
                      params.lang === "pt" ? "Harmonização facial completa" : "Complete facial harmonization",
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

                <div className="bg-[#f8ebef] rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-medium mb-4" style={{ color: "#2E2E2E" }}>
                    {params.lang === "pt" ? "Tecnologias Avançadas" : "Advanced Technologies"}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      params.lang === "pt"
                        ? "Radiofrequência para firmeza da pele"
                        : "Radiofrequency for skin firmness",
                      params.lang === "pt" ? "Laser para rejuvenescimento" : "Laser for rejuvenation",
                      params.lang === "pt" ? "Luz intensa pulsada (IPL)" : "Intense pulsed light (IPL)",
                      params.lang === "pt" ? "Ultrassom microfocado" : "Microfocused ultrasound",
                      params.lang === "pt" ? "Criolipólise para redução de gordura" : "Cryolipolysis for fat reduction",
                      params.lang === "pt" ? "PDRN e PRF para bioestimulação" : "PDRN and PRF for biostimulation",
                      params.lang === "pt" ? "Terapia fotodinâmica" : "Photodynamic therapy",
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
                  {params.lang === "pt" ? "Resultados" : "Results"}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {params.lang === "pt"
                    ? "Os procedimentos estéticos proporcionam resultados naturais e duradouros."
                    : "The aesthetic procedures provide natural and long-lasting results."}
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
                    {params.lang === "pt" ? "Avaliação Personalizada" : "Personalized Assessment"}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {params.lang === "pt"
                      ? "Cada procedimento é cuidadosamente planejado de acordo com as necessidades individuais de cada paciente."
                      : "Each procedure is carefully planned according to the individual needs of each patient."}
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
                {params.lang === "pt"
                  ? "Agende sua consulta para uma avaliação estética personalizada"
                  : "Schedule your appointment for a personalized aesthetic evaluation"}
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                {params.lang === "pt"
                  ? "Entre em contato para agendar uma consulta com Dr. Henrique Oliveira."
                  : "Contact to schedule an appointment with Dr. Henrique Oliveira."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${params.lang}/${params.lang === "pt" ? "contato" : "contact"}`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition text-white"
                  style={{ backgroundColor: "#f96c8b" }}
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
