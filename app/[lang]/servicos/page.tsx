import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title = "Tratamentos | Dr. Henrique Oliveira"
  const description =
    "Conheça os tratamentos dermatológicos oferecidos pelo Dr. Henrique Oliveira, especialista com mais de 30 anos de experiência."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/servicos`,
      languages: {
        en: "https://drhenriqueoliveira.com/en/services",
        pt: "https://drhenriqueoliveira.com/pt/servicos",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}/servicos`,
      siteName: "Dr. Henrique Oliveira",
      locale: "pt_PT",
      type: "website",
    },
  }
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Define service images
  const serviceImages = {
    "Dermatologia Clínica": "/dry-skin-closeup.jpeg", // Updated to use the new skin image
    "Dermatologia Estética": "/dermatology-aesthetic.jpg",
    "Dermatologia a Laser": "/dermatology-laser.jpg",
    "Tricologia e Onicologia": "/hair-closeup.jpeg", // Updated to use the new hair image
    "Dermatologia Pediátrica": "/dermatology-trichology.jpg",
  }

  return (
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

      {/* Services List */}
      <section className="py-10 bg-[#FAFAFA] border border-[#f96c8b]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                Tratamentos em Destaque
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Oferecemos uma ampla gama de tratamentos dermatológicos para atender às suas necessidades específicas.
              </p>
            </div>

            <div className="space-y-16">
              {dict.services.items.map((service: any, index: number) => {
                // Get the appropriate image for this service
                const imageSrc = serviceImages[service.title] || "/dermatology-clinical.jpg"

                // Skip the second item (index 1)
                if (index === 1) {
                  return null
                }

                return (
                  <div
                    key={index}
                    id={service.title.toLowerCase().replace(/\s+/g, "-")}
                    className="flex flex-col md:flex-row items-center gap-10"
                    style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
                  >
                    <div className="md:w-2/5">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={imageSrc || "/placeholder.svg"}
                          alt={service.imageAlt || "Tratamento dermatológico"}
                          fill
                          className="object-cover rounded-xl shadow-md"
                        />
                      </div>
                    </div>
                    <div className="md:w-3/5">
                      <h2 className="heading-md mb-4" style={{ color: "#31029c" }}>
                        {service.title}
                      </h2>
                      <p className="text-gray-700 mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.benefits.slice(0, 4).map((benefit: string, i: number) => (
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
                      <Link
                        href={`#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="inline-block px-6 py-2 rounded-lg text-sm transition text-white"
                        style={{ backgroundColor: index % 2 === 0 ? "#f96c8b" : "#a09f9e" }}
                      >
                        Saiba Mais
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-10 bg-[#FAFAFA] border border-[#f96c8b]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4" style={{ color: "#2E2E2E" }}>
                {dict.services.conditions.title}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">{dict.services.conditions.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {dict.services.conditions.categories.map((category: any, index: number) => (
                <div key={index} className="bg-[#f8ebef] rounded-xl shadow-sm p-6">
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
      <section className="py-10" style={{ backgroundColor: "#e8e8e8" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
              Agende sua consulta para uma avaliação personalizada
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
                style={{ backgroundColor: "#e8e8e8", color: "#a09f9e" }}
              >
                Ver Perguntas Frequentes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
