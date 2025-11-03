"use client"

import { useState, useEffect } from "react"
import { AutoSlideshow } from "@/components/auto-slideshow"
import Script from "next/script"
import { LoadingIndicator } from "@/components/loading-indicator"

export default function AboutPage({ params }: { params: { lang: string } }) {
  const [dictionary, setDictionary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch dictionary data on component mount
  useEffect(() => {
    async function loadDictionary() {
      try {
        const response = await fetch(`/api/dictionary?lang=${params.lang}`)
        if (response.ok) {
          const data = await response.json()
          setDictionary(data)
        } else {
          console.error("Failed to load dictionary")
        }
      } catch (error) {
        console.error("Error loading dictionary:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDictionary()
  }, [params.lang])

  // Doctor images - removed any duplicates and ensured each image is unique
  const doctorImages = [
    { src: "/dr-oliveira-1.png", alt: "Dr. Henrique Oliveira em ambiente formal com blazer azul" },
    { src: "/dr-oliveira-2.png", alt: "Dr. Henrique Oliveira em evento profissional de dermatologia" },
    { src: "/dr-oliveira-3.png", alt: "Dr. Henrique Oliveira consultando um paciente em seu consultório" },
    { src: "/dr-oliveira-4.png", alt: "Dr. Henrique Oliveira em seu jaleco médico branco" },
    { src: "/dr-oliveira-5.png", alt: "Dr. Henrique Oliveira trabalhando em sua mesa" },
  ]

  if (loading || !dictionary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  const dict = dictionary.about || {
    title: "Sobre",
    subtitle: "Saiba mais sobre Dr. Henrique Oliveira e seu compromisso com cuidados dermatológicos excepcionais.",
    philosophy: {
      title: "Nossa Filosofia",
      paragraphs: [
        "Uma pele saudável é a base da beleza e da confiança.",
        "Estamos comprometidos em fornecer cuidados personalizados em um ambiente confortável e acolhedor.",
        "Priorizamos resultados naturais e saúde da pele a longo prazo em vez de soluções rápidas.",
      ],
    },
  }

  return (
    <>
      <Script
        id="doctor-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: "Dr. Henrique Oliveira",
            image: [
              "https://drhenriqueoliveira-derma.com/dr-oliveira-1.png",
              "https://drhenriqueoliveira-derma.com/dr-oliveira-2.png",
              "https://drhenriqueoliveira-derma.com/dr-oliveira-3.png",
            ],
            email: "h.g.oliveira@gmail.com",
            medicalSpecialty: ["Dermatology", "Aesthetic Dermatology", "Cosmetic Dermatology", "Aesthetic Medicine"],
            workLocation: [
              {
                "@type": "MedicalClinic",
                name: "Dr. Henrique Oliveira Dermatology Clinic - Coimbra",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Ferreira Borges 165 2º andar",
                  addressLocality: "Coimbra",
                  addressCountry: "Portugal",
                },
              },
              {
                "@type": "MedicalClinic",
                name: "Hospital da Luz",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Coimbra, Agueda, OIÂ",
                  addressCountry: "Portugal",
                },
              },
            ],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "University of Coimbra Medical School",
            },
            memberOf: [
              {
                "@type": "Organization",
                name: "Portuguese Society of Dermatology and Venereology (SPDV)",
              },
              {
                "@type": "Organization",
                name: "European Academy of Dermatology and Venereology",
              },
            ],
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-4">{dict.title}</h1>
              <p className="text-lg text-gray-700">{dict.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Doctor Profile */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-12">
              <div className="md:w-1/3">
                <div className="sticky top-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                    <h3 className="font-medium text-lg mb-4" style={{ color: "#f96c8b" }}>
                      Informações Profissionais
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Especialização:</p>
                        <p className="text-sm text-gray-600">Dermatologia e Venereologia</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Subespecialidade:</p>
                        <p className="text-sm text-gray-600">Medicina Estética</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Cédula Profissional:</p>
                        <p className="text-sm text-gray-600">OM 34475/ C- 7465</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Prémios:</p>
                        <p className="text-sm text-gray-600">Prémio Carreira SPME 2024</p>
                        <p className="text-sm text-gray-600">Prémio S.P.V.D.-1998</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Website:</p>
                        <a
                          href="https://www.drhenriqueoliveira-derma.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#773cf6] hover:underline"
                        >
                          www.drhenriqueoliveira-derma.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                  Dr. Henrique Oliveira
                </h2>
                <h3 className="text-xl mb-4" style={{ color: "#2E2E2E" }}>
                  Dermatologista & Especialista em Dermatologia estética e cosmética
                </h3>

                {/* Doctor Gallery - Automatic Slideshow */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Galeria
                  </h3>
                  <AutoSlideshow images={doctorImages} interval={6000} aspectRatio="landscape" autoplay={true} />
                </div>

                {/* Biography Section */}
                <div className="mb-4 mt-4">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Biografia
                  </h4>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      É membro da Ordem dos Médicos desde 1991, possuindo a cédula nº 34475/ C- 7465, emitida pela
                      Secção Regional do Centro da referida Ordem.
                    </p>
                    <p>
                      Palestrante em Ações de Formação sobre o uso de Toxina Botulínica, preenchimentos com ácido
                      hialurónico e Terapia Fotodinâmica. Formador em Workshops dedicados ao uso da toxina botulínica e
                      material de preenchimento de rugas de distensão, atrofia e cicatrizes da face.
                    </p>
                    <p>
                      Adquiriu certificação para administração de Terapia Fotodinâmica, no CSMC (Hospital Militar
                      Regional nº2), entre AGO09 e OUT12. Responsável, durante o ano lectivo 1993/1994, da disciplina de
                      Noções de Anatomia e Fisiologia, de um Curso de Formação de Esteticistas (Friga), em Coimbra.
                    </p>
                    <p>
                      Participante e palestrante em Reuniões científicas nacionais e internacionais. Autor de 13
                      publicações como Primeiro Autor, 2 das quais sob a forma de Artigo e 11 sob a forma de Resumo.
                      Participação na Organização das II Jornadas Médicas Militares de Évora em 2005.
                    </p>
                    <p>
                      Obtenção de prémio S.P.V.D.-1998 pelo melhor Caso Clínico apresentado (ex-aqueo) na Reunião dos
                      Açores. Participação como Médico Militar da Força Portuguesa na Bósnia e Herzegovina, integrando a
                      Missão Internacional de Apoio à Paz da NATO naquele território, de Janeiro a Julho de 2002.
                    </p>
                  </div>
                </div>

                {/* Education Section */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Educação
                  </h4>
                  <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    <li>
                      <span className="font-medium">1985–1991:</span> Licenciatura em Medicina, Faculdade de Medicina da
                      Universidade de Coimbra (FMUC)
                    </li>
                    <li>
                      <span className="font-medium">1991–1993:</span> Internato Geral nos Hospitais da Universidade de
                      Coimbra, Hospital Pediátrico de Coimbra e Centro de Saúde de Cantanhede
                    </li>
                    <li>
                      <span className="font-medium">1993:</span> Curso de Pós-Graduação em Climatologia e Hidrologia,
                      FMUC
                    </li>
                    <li>
                      <span className="font-medium">2001:</span> Internato Complementar em Dermatologia e Venereologia,
                      Hospitais da Universidade de Coimbra
                    </li>
                  </ul>
                </div>

                {/* Professional Experience Section */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Experiência Profissional
                  </h4>
                  <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    <li>
                      <span className="font-medium">1993–2001:</span> Médico nos Hospitais da Universidade de Coimbra,
                      Hospital Pediátrico e Centro de Saúde de Cantanhede
                    </li>
                    <li>
                      <span className="font-medium">2002–2016:</span> Dermatologista no Hospital Militar Regional nº2,
                      Coimbra
                    </li>
                    <li>
                      <span className="font-medium">2004–2005:</span> Subdiretor no Centro de Saúde da Região Militar
                      Sul, Évora
                    </li>
                    <li>
                      <span className="font-medium">2020–Presente:</span> Dermatologista na DentalDerme, Figueira da Foz
                    </li>
                  </ul>
                </div>

                {/* Affiliations Section */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Afiliações e Contribuições
                  </h4>
                  <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    <li>Membro da Sociedade Portuguesa de Dermatologia e Venereologia (SPDV)</li>
                    <li>Secretário do Grupo Português de Dermatologia Cosmética e Estética (SPDV)</li>
                    <li>Membro da Academia Europeia de Dermatologia e Venereologia</li>
                    <li>Membro da Associação Portuguesa de Cancro Cutâneo</li>
                    <li>
                      Autor de cerca de 20 publicações científicas nas áreas de dermatologia clínica, estética e
                      venereologia
                    </li>
                    <li>Participação regular em congressos e cursos de Dermatologia Clínica</li>
                  </ul>
                </div>

                {/* Publications Section */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Publicações Destacadas
                  </h4>
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h5 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
                      Melanoma arising in segmental nevus spilus
                    </h5>
                    <p className="text-gray-700 mb-3">
                      Publicado na Revista da SPDV em 2013, este estudo analisa um caso raro de melanoma desenvolvido
                      num nevo segmentar de Spilus.
                    </p>
                    <a
                      href="https://revista.spdv.com.pt/index.php/spdv/article/view/210/194"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#773cf6] hover:underline flex items-center"
                    >
                      Ver publicação
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: "#f96c8b" }}>
                    Informações Adicionais
                  </h4>
                  <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    <li>Certificado em Terapia Fotodinâmica com mais de 300 tratamentos</li>
                    <li>Serviço militar na Bósnia e Herzegovina com a NATO em 2002</li>
                    <li>Condecorações: Medalha D. Afonso Henriques (2013), Medalha de Conduta Exemplar (2017)</li>
                    <li>Organizador do curso 'Dermatologia Cirúrgica e Cosmética – 1ª Abordagem'</li>
                    <li>Em reserva militar desde 2016, mantendo atividade clínica</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-10 bg-[#E6F0FF]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                {dict.philosophy?.title || "Nossa Filosofia"}
              </h2>
              <div className="space-y-4 text-gray-700">
                {(dict.philosophy?.paragraphs || []).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
