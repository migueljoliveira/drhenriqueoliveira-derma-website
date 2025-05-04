import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Image from "next/image"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt" ? "Condições Tratadas - Dr. Henrique Oliveira" : "Conditions Treated - Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Conheça as principais condições dermatológicas tratadas pelo Dr. Henrique Oliveira, especialista com mais de 30 anos de experiência."
      : "Learn about the main dermatological conditions treated by Dr. Henrique Oliveira, a specialist with over 30 years of experience."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}/conditions`,
      languages: {
        en: "https://drhenriqueoliveira.com/en/conditions",
        pt: "https://drhenriqueoliveira.com/pt/conditions",
      },
    },
  }
}

export default async function ConditionsPage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang)

  // Define conditions with images and descriptions
  const conditions = [
    {
      name: params.lang === "pt" ? "Rosácea" : "Rosacea",
      description:
        params.lang === "pt"
          ? "Condição inflamatória da pele que causa vermelhidão facial e vasos sanguíneos visíveis."
          : "Inflammatory skin condition causing facial redness and visible blood vessels.",
      image: "/rosacea-clinical.jpeg",
      alt: params.lang === "pt" ? "Rosácea: Condição inflamatória da pele" : "Rosacea: Inflammatory skin condition",
    },
    {
      name: params.lang === "pt" ? "Verruga Filiforme" : "Filiform Wart",
      description:
        params.lang === "pt"
          ? "Crescimento benigno da pele que geralmente aparece na face, especialmente perto dos olhos."
          : "Benign skin growth that typically appears on the face, especially near the eyes.",
      image: "/filiform-wart-eyelid.jpeg",
      alt: params.lang === "pt" ? "Verruga filiforme: Crescimento na pálpebra" : "Filiform wart: Growth on eyelid",
    },
    {
      name: params.lang === "pt" ? "Herpes-Zóster" : "Shingles",
      description:
        params.lang === "pt"
          ? "Erupção cutânea dolorosa causada pela reativação do vírus da varicela-zoster."
          : "Painful skin rash caused by reactivation of the varicella-zoster virus.",
      image: "/shingles-dermatitis.jpeg",
      alt: params.lang === "pt" ? "Herpes-zóster: Erupção cutânea dolorosa" : "Shingles: Painful skin rash",
    },
  ]

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-xl mb-6 text-center" style={{ color: "#2E2E2E" }}>
            {dictionary.home.conditions.title}
          </h1>
          <p className="text-lg mb-8 text-center">{dictionary.home.conditions.subtitle}</p>

          {/* Individual conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {conditions.map((condition, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64 w-full">
                  <Image
                    src={condition.image || "/placeholder.svg"}
                    alt={condition.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#2E2E2E" }}>
                    {condition.name}
                  </h3>
                  <p className="text-gray-700">{condition.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
              {params.lang === "pt" ? "Sobre as Condições Dermatológicas" : "About Dermatological Conditions"}
            </h2>
            <p className="mb-4">
              {params.lang === "pt"
                ? "Dr. Henrique Oliveira é especialista no diagnóstico e tratamento de uma ampla variedade de condições dermatológicas. Com mais de 30 anos de experiência, ele utiliza as técnicas mais avançadas para oferecer o melhor cuidado possível aos seus pacientes."
                : "Dr. Henrique Oliveira specializes in the diagnosis and treatment of a wide variety of dermatological conditions. With over 30 years of experience, he uses the most advanced techniques to provide the best possible care to his patients."}
            </p>
            <p>
              {params.lang === "pt"
                ? "As condições acima são apenas algumas das muitas que o Dr. Henrique Oliveira trata em sua clínica. Entre em contato para mais informações sobre diagnóstico e tratamento."
                : "The conditions above are just a few of the many that Dr. Henrique Oliveira treats at his clinic. Contact us for more information about diagnosis and treatment."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
