import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Tratamentos Dermatológicos | Dr. Henrique Oliveira"
      : "Dermatology Treatments | Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Conheça nossos tratamentos dermatológicos médicos e estéticos. Especialista em acne, rosácea, rejuvenescimento da pele e mais."
      : "Discover our medical and aesthetic dermatology treatments. Specialist in acne, rosacea, skin rejuvenation and more."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/services`,
      languages: {
        en: "https://drhenriqueoliveira.com/en/services",
        pt: "https://drhenriqueoliveira.com/pt/servicos",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}/services`,
      siteName: "Dr. Henrique Oliveira",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            about: {
              "@type": "MedicalBusiness",
              name: "Dr. Henrique Oliveira - Dermatologia",
              medicalSpecialty: ["Dermatology", "Aesthetic Dermatology", "Cosmetic Dermatology"],
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "MedicalProcedure",
                    name: params.lang === "pt" ? "Dermatologia Clínica" : "Clinical Dermatology",
                    description:
                      params.lang === "pt"
                        ? "Diagnóstico e tratamento de doenças da pele, cabelo e unhas."
                        : "Diagnosis and treatment of skin, hair, and nail diseases.",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "MedicalProcedure",
                    name: params.lang === "pt" ? "Dermatologia Estética" : "Aesthetic Dermatology",
                    description:
                      params.lang === "pt"
                        ? "Procedimentos estéticos minimamente invasivos para rejuvenescimento facial."
                        : "Minimally invasive aesthetic procedures for facial rejuvenation.",
                  },
                },
              ],
            },
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">{dict.services.title}</h1>
              <p className="text-lg text-gray-700">{dict.services.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Main Services Categories */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Clinical Dermatology Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-karolina-grabowska-4046564.jpg-lmZJspJhp0XtBWG9qEvQCW0SG4rPvv.jpeg" // Direct URL to dry skin image
                    alt={params.lang === "pt" ? "Dermatologia Clínica" : "Clinical Dermatology"}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="p-6">
                  <h2 className="heading-md mb-4" style={{ color: "#2E2E2E" }}>
                    {params.lang === "pt" ? "Dermatologia Clínica" : "Clinical Dermatology"}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    {params.lang === "pt"
                      ? "Diagnóstico e tratamento especializado para diversas condições dermatológicas, incluindo acne, rosácea, psoríase, dermatite e mais."
                      : "Specialized diagnosis and treatment for various dermatological conditions, including acne, rosacea, psoriasis, dermatitis, and more."}
                  </p>
                  <Link
                    href={`/${params.lang}/${params.lang === "pt" ? "dermatologia" : "dermatology"}`}
                    className="inline-block px-6 py-2 rounded-lg text-white text-sm transition"
                    style={{ backgroundColor: "#f96c8b" }}
                  >
                    {params.lang === "pt" ? "Saiba Mais" : "Learn More"}
                  </Link>
                </div>
              </div>

              {/* Aesthetic Dermatology Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="/dermatology-aesthetic.jpg"
                    alt={params.lang === "pt" ? "Dermatologia Estética" : "Aesthetic Dermatology"}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="p-6">
                  <h2 className="heading-md mb-4" style={{ color: "#2E2E2E" }}>
                    {params.lang === "pt" ? "Dermatologia Estética" : "Aesthetic & Surgical Dermatology"}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    {params.lang === "pt"
                      ? "Procedimentos estéticos avançados para rejuvenescimento facial e corporal, incluindo toxina botulínica, preenchimentos, bioestimuladores e mais."
                      : "Advanced aesthetic and surgical procedures for facial and body rejuvenation, including botulinum toxin, fillers, biostimulators, excisions, and more."}
                  </p>
                  <Link
                    href={`/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`}
                    className="inline-block px-6 py-2 rounded-lg text-white text-sm transition"
                    style={{ backgroundColor: "#a09f9e" }}
                  >
                    {params.lang === "pt" ? "Saiba Mais" : "Learn More"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-10 bg-[#f8ebef]">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  {params.lang === "pt" ? "Serviços Adicionais" : "Additional Services"}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {params.lang === "pt"
                    ? "Conheça nossos serviços especializados"
                    : "Discover our specialized services"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Advanced Technologies Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src="/dermatology-laser.jpg"
                      alt={params.lang === "pt" ? "Tecnologias Avançadas" : "Advanced Technologies"}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="heading-md mb-4" style={{ color: "#2E2E2E" }}>
                      {params.lang === "pt" ? "Tecnologias Avançadas" : "Advanced Technologies"}
                    </h2>
                    <p className="text-gray-700 mb-6">
                      {params.lang === "pt"
                        ? "Equipamentos de última geração para tratamentos eficazes e seguros, com resultados comprovados cientificamente."
                        : "State-of-the-art equipment for effective and safe treatments with scientifically proven results."}
                    </p>
                    <Link
                      href={`/${params.lang}/${params.lang === "pt" ? "tecnologias" : "technologies"}`}
                      className="inline-block px-6 py-2 rounded-lg text-white text-sm transition"
                      style={{ backgroundColor: "#f96c8b" }}
                    >
                      {params.lang === "pt" ? "Saiba Mais" : "Learn More"}
                    </Link>
                  </div>
                </div>

                {/* Trichology and Onychology Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stockvault-hair97289.jpg-FoxcWEWt65bS1QdK4KCh30jB2opmXt.jpeg" // Direct URL to hair closeup image
                      alt={params.lang === "pt" ? "Tricologia e Onicologia" : "Trichology and Onychology"}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="heading-md mb-4" style={{ color: "#2E2E2E" }}>
                      {params.lang === "pt" ? "Tricologia e Onicologia" : "Trichology and Onychology"}
                    </h2>
                    <p className="text-gray-700 mb-6">
                      {params.lang === "pt"
                        ? "Diagnóstico e tratamento especializado para problemas capilares e das unhas, utilizando protocolos personalizados para cada tipo de condição."
                        : "Specialized diagnosis and treatment for hair and nail problems, using personalized protocols for each condition."}
                    </p>
                    <Link
                      href={`/${params.lang}/${params.lang === "pt" ? "tricologia" : "trichology"}`}
                      className="inline-block px-6 py-2 rounded-lg text-white text-sm transition"
                      style={{ backgroundColor: "#a09f9e" }}
                    >
                      {params.lang === "pt" ? "Saiba Mais" : "Learn More"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Treatments */}
        <section className="py-10 bg-[#e8e8e8]">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  {params.lang === "pt" ? "Tratamentos em Destaque" : "Featured Treatments"}
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {params.lang === "pt"
                    ? "Conheça alguns dos tratamentos mais procurados"
                    : "Discover some of the most sought-after treatments"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    title: params.lang === "pt" ? "Tratamento de Acne" : "Acne Treatment",
                    description:
                      params.lang === "pt"
                        ? "Protocolos personalizados para todos os tipos e graus de acne."
                        : "Personalized protocols for all types and grades of acne.",
                    link: `/${params.lang}/${params.lang === "pt" ? "dermatologia" : "dermatology"}`,
                  },
                  {
                    title: params.lang === "pt" ? "Toxina Botulínica" : "Botulinum Toxin",
                    description:
                      params.lang === "pt"
                        ? "Suavização de rugas dinâmicas com resultados naturais."
                        : "Smoothing of dynamic wrinkles with natural results.",
                    link: `/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`,
                  },
                  {
                    title: params.lang === "pt" ? "Preenchimentos" : "Fillers",
                    description:
                      params.lang === "pt"
                        ? "Restauração de volume e contornos faciais."
                        : "Restoration of facial volume and contours.",
                    link: `/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`,
                  },
                  {
                    title: params.lang === "pt" ? "Tratamento de Melasma" : "Melasma Treatment",
                    description:
                      params.lang === "pt"
                        ? "Abordagem combinada para manchas e hiperpigmentação."
                        : "Combined approach for spots and hyperpigmentation.",
                    link: `/${params.lang}/${params.lang === "pt" ? "dermatologia" : "dermatology"}`,
                  },
                  {
                    title: params.lang === "pt" ? "Bioestimuladores" : "Biostimulators",
                    description:
                      params.lang === "pt"
                        ? "Estímulo da produção natural de colágeno para firmeza da pele."
                        : "Stimulation of natural collagen production for skin firmness.",
                    link: `/${params.lang}/${params.lang === "pt" ? "estetica" : "aesthetic"}`,
                  },
                  {
                    title: params.lang === "pt" ? "Tratamentos Capilares" : "Hair Treatments",
                    description:
                      params.lang === "pt"
                        ? "Soluções para queda de cabelo e alopecia."
                        : "Solutions for hair loss and alopecia.",
                    link: `/${params.lang}/${params.lang === "pt" ? "tricologia" : "trichology"}`,
                  },
                ].map((treatment, index) => (
                  <div key={index} className="bg-[#f8ebef] rounded-xl shadow-sm p-6">
                    <h2 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
                      {treatment.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{treatment.description}</p>
                    <Link
                      href={treatment.link}
                      className="text-white hover:underline text-sm font-medium px-4 py-2 rounded-lg inline-block"
                      style={{ backgroundColor: index % 2 === 0 ? "#f96c8b" : "#a09f9e" }}
                    >
                      {params.lang === "pt" ? "Ver detalhes →" : "View details →"}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                {params.lang === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {params.lang === "pt"
                  ? "Encontre respostas para as dúvidas mais comuns sobre os tratamentos"
                  : "Find answers to the most common questions about the treatments"}
              </p>
              <Link
                href={`/${params.lang}/faq`}
                className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                style={{ backgroundColor: "#f96c8b", color: "white" }}
              >
                {params.lang === "pt" ? "Ver Todas as Perguntas" : "View All Questions"}
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10" style={{ backgroundColor: "#e8e8e8" }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
                {params.lang === "pt"
                  ? "Agende sua consulta e cuide da saúde da sua pele"
                  : "Schedule your appointment and take care of your skin health"}
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                {params.lang === "pt"
                  ? "Entre em contato para agendar uma avaliação personalizada com Dr. Henrique Oliveira."
                  : "Contact to schedule a personalized assessment with Dr. Henrique Oliveira."}
              </p>
              <Link
                href={`/${params.lang}/${params.lang === "pt" ? "contato" : "contact"}`}
                className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                style={{ backgroundColor: "#a09f9e", color: "white" }}
              >
                {params.lang === "pt" ? "Agendar Consulta" : "Schedule Appointment"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
