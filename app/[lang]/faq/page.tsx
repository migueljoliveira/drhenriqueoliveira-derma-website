import Link from "next/link"
import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import Script from "next/script"
import { FAQSection } from "@/components/faq-section"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Perguntas Frequentes | Dr. Henrique Oliveira"
      : "Frequently Asked Questions | Dr. Henrique Oliveira"

  const description =
    params.lang === "pt"
      ? "Respostas para as dúvidas mais comuns sobre tratamentos dermatológicos clínicos e estéticos."
      : "Answers to the most common questions about clinical and aesthetic dermatological treatments."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira-derma.com/${params.lang}/faq`,
      languages: {
        en: "https://drhenriqueoliveira-derma.com/en/faq",
        pt: "https://drhenriqueoliveira-derma.com/pt/faq",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira-derma.com/${params.lang}/faq`,
      siteName: "Dr. Henrique Oliveira",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export default async function FAQPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // FAQ data
  const faqs =
    params.lang === "pt"
      ? [
          {
            question: "Qual é a diferença entre dermatologia clínica e estética?",
            answer:
              "A dermatologia clínica foca no diagnóstico e tratamento de doenças da pele, cabelo e unhas, como acne, psoríase e infecções cutâneas. Já a dermatologia estética concentra-se em procedimentos que melhoram a aparência da pele, como preenchimentos, toxina botulínica e peelings, visando o rejuvenescimento e harmonização facial.",
          },
          {
            question: "Com que frequência devo fazer uma avaliação dermatológica?",
            answer:
              "Recomenda-se uma avaliação dermatológica anual para prevenção e detecção precoce de problemas de pele, especialmente para monitoramento de nevos (pintas) e prevenção de câncer de pele. Pessoas com condições dermatológicas específicas podem necessitar de consultas mais frequentes, conforme orientação médica.",
          },
          {
            question: "Quais são os tratamentos mais eficazes para acne?",
            answer:
              "O tratamento da acne varia conforme o tipo e gravidade, podendo incluir medicamentos tópicos (retinoides, peróxido de benzoíla, antibióticos), medicamentos orais (antibióticos, isotretinoína, anticoncepcionais), peelings químicos, laser e luz pulsada. A abordagem ideal é personalizada e definida após avaliação dermatológica completa.",
          },
          {
            question: "Quanto tempo duram os resultados dos preenchimentos faciais?",
            answer:
              "A duração dos preenchimentos faciais varia conforme o produto utilizado e a área tratada. Preenchimentos com ácido hialurônico geralmente duram de 6 a 18 meses, enquanto bioestimuladores de colágeno como Sculptra podem durar até 2 anos. Fatores como metabolismo individual, estilo de vida e técnica de aplicação também influenciam na durabilidade.",
          },
          {
            question: "O que causa o melasma e como pode ser tratado?",
            answer:
              "O melasma é causado por uma combinação de fatores, incluindo exposição solar, alterações hormonais (gravidez, anticoncepcionais), predisposição genética e inflamação. O tratamento envolve proteção solar rigorosa, despigmentantes tópicos, peelings químicos, laser e luz pulsada, além de tratamentos orais em alguns casos. A abordagem combinada oferece melhores resultados.",
          },
          {
            question: "Qual é a idade ideal para começar tratamentos preventivos de envelhecimento?",
            answer:
              "A prevenção do envelhecimento cutâneo deve começar cedo, idealmente na faixa dos 20-30 anos, com proteção solar diária e hidratação adequada. Tratamentos como peelings leves e bioestimuladores podem ser iniciados a partir dos 30 anos, enquanto procedimentos mais específicos como toxina botulínica e preenchimentos são personalizados conforme necessidades individuais e não têm idade fixa para início.",
          },
          {
            question: "Como escolher o protetor solar adequado para meu tipo de pele?",
            answer:
              "A escolha do protetor solar deve considerar o tipo de pele (seca, oleosa, mista, sensível), o fator de proteção (mínimo FPS 30 e FPUVA), a textura (gel, creme, fluido) e o uso diário. Peles oleosas ou acneicas se beneficiam de formulações oil-free ou em gel, enquanto peles secas necessitam de protetores mais hidratantes. Consulte seu dermatologista para uma recomendação personalizada.",
          },
          {
            question: "Os tratamentos a laser são dolorosos?",
            answer:
              "A sensação durante tratamentos a laser varia conforme o tipo de laser, a área tratada e a sensibilidade individual. Muitos procedimentos causam apenas um leve desconforto, descrito como sensação de elástico batendo na pele. Para maior conforto, utilizamos sistemas de resfriamento, anestésicos tópicos e ajustamos os parâmetros do laser para cada paciente. A maioria dos pacientes tolera bem os procedimentos sem necessidade de analgesia adicional.",
          },
          {
            question: "É possível tratar cicatrizes de acne?",
            answer:
              "Sim, existem diversos tratamentos eficazes para cicatrizes de acne, dependendo do tipo e profundidade das cicatrizes. As opções incluem microagulhamento, peelings químicos, laser fracionado, preenchimentos com ácido hialurônico (para cicatrizes deprimidas) e subcisão. Geralmente, a combinação de técnicas oferece os melhores resultados, e múltiplas sessões são necessárias para uma melhora significativa.",
          },
          {
            question: "Qual a diferença entre Botox e preenchimentos faciais?",
            answer:
              "A toxina botulínica (Botox) relaxa os músculos, sendo ideal para rugas dinâmicas (de expressão) como as da testa e ao redor dos olhos. Já os preenchimentos, geralmente à base de ácido hialurônico, adicionam volume e preenchem depressões, sendo indicados para sulcos nasolabiais, lábios e maçãs do rosto. O Botox previne e suaviza rugas, enquanto os preenchimentos restauram volume e contornos faciais perdidos com o envelhecimento.",
          },
        ]
      : [
          {
            question: "What is the difference between clinical and aesthetic dermatology?",
            answer:
              "Clinical dermatology focuses on diagnosing and treating skin, hair, and nail diseases, such as acne, psoriasis, and skin infections. Aesthetic dermatology concentrates on procedures that improve skin appearance, such as fillers, botulinum toxin, and peels, aiming for facial rejuvenation and harmonization.",
          },
          {
            question: "How often should I have a dermatological evaluation?",
            answer:
              "An annual dermatological evaluation is recommended for prevention and early detection of skin problems, especially for monitoring nevi (moles) and preventing skin cancer. People with specific dermatological conditions may need more frequent consultations, as medically advised.",
          },
          {
            question: "What are the most effective treatments for acne?",
            answer:
              "Acne treatment varies according to type and severity, and may include topical medications (retinoids, benzoyl peroxide, antibiotics), oral medications (antibiotics, isotretinoin, contraceptives), chemical peels, laser, and pulsed light. The ideal approach is personalized and defined after a complete dermatological evaluation.",
          },
          {
            question: "How long do facial filler results last?",
            answer:
              "The duration of facial fillers varies according to the product used and the treated area. Hyaluronic acid fillers generally last from 6 to 18 months, while collagen biostimulators like Sculptra can last up to 2 years. Factors such as individual metabolism, lifestyle, and application technique also influence durability.",
          },
          {
            question: "What causes melasma and how can it be treated?",
            answer:
              "Melasma is caused by a combination of factors, including sun exposure, hormonal changes (pregnancy, contraceptives), genetic predisposition, and inflammation. Treatment involves rigorous sun protection, topical depigmenting agents, chemical peels, laser, and pulsed light, as well as oral treatments in some cases. The combined approach offers better results.",
          },
          {
            question: "What is the ideal age to start preventive aging treatments?",
            answer:
              "Prevention of skin aging should start early, ideally in the 20-30 age range, with daily sun protection and adequate hydration. Treatments such as light peels and biostimulators can be started from the age of 30, while more specific procedures such as botulinum toxin and fillers are personalized according to individual needs and do not have a fixed age to start.",
          },
          {
            question: "How do I choose the right sunscreen for my skin type?",
            answer:
              "Choosing the right sunscreen should consider your skin type (dry, oily, combination, sensitive), the protection factor (minimum SPF 30 and FPUVA), texture (gel, cream, fluid), and daily use. Oily or acne-prone skin benefits from oil-free or gel formulations, while dry skin needs more hydrating protectors. Consult your dermatologist for a personalized recommendation.",
          },
          {
            question: "Are laser treatments painful?",
            answer:
              "The sensation during laser treatments varies according to the type of laser, the treated area, and individual sensitivity. Many procedures cause only mild discomfort, described as a feeling of an elastic band snapping against the skin. For greater comfort, we use cooling systems, topical anesthetics, and adjust the laser parameters for each patient. Most patients tolerate the procedures well without the need for additional analgesia.",
          },
          {
            question: "Is it possible to treat acne scars?",
            answer:
              "Yes, there are several effective treatments for acne scars, depending on the type and depth of the scars. Options include microneedling, chemical peels, fractional laser, hyaluronic acid fillers (for depressed scars), and subcision. Generally, a combination of techniques offers the best results, and multiple sessions are necessary for significant improvement.",
          },
          {
            question: "What's the difference between Botox and facial fillers?",
            answer:
              "Botulinum toxin (Botox) relaxes muscles, making it ideal for dynamic wrinkles (expression lines) such as those on the forehead and around the eyes. Fillers, usually hyaluronic acid-based, add volume and fill depressions, being indicated for nasolabial folds, lips, and cheeks. Botox prevents and smooths wrinkles, while fillers restore volume and facial contours lost with aging.",
          },
        ]

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">
                {params.lang === "pt" ? "Perguntas Frequentes" : "Frequently Asked Questions"}
              </h1>
              <p className="text-lg text-gray-700">
                {params.lang === "pt"
                  ? "Respostas para as dúvidas mais comuns sobre tratamentos dermatológicos"
                  : "Answers to the most common questions about dermatological treatments"}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <FAQSection
              title={params.lang === "pt" ? "Dúvidas Sobre Tratamentos" : "Treatment Questions"}
              description={
                params.lang === "pt"
                  ? "Encontre respostas para as perguntas mais frequentes sobre os tratamentos dermatológicos"
                  : "Find answers to the most frequently asked questions about the dermatological treatments"
              }
              faqs={faqs}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10" style={{ backgroundColor: "#E6F0FF" }}>
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-md mb-6" style={{ color: "#2E2E2E" }}>
                {params.lang === "pt" ? "Não encontrou sua pergunta?" : "Didn't find your question?"}
              </h2>
              <p className="text-lg text-[#2E2E2E] mb-8">
                {params.lang === "pt"
                  ? "Entre em contato para esclarecer suas dúvidas ou agendar uma consulta com Dr. Henrique Oliveira."
                  : "Contact to clarify your doubts or schedule an appointment with Dr. Henrique Oliveira."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${params.lang}/contact`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition bg-white"
                  style={{ color: "#31029c" }}
                >
                  {params.lang === "pt" ? "Entrar em Contato" : "Contact Us"}
                </Link>
                <Link
                  href={`/${params.lang}/services`}
                  className="inline-block px-8 py-3 rounded-xl text-sm tracking-wide transition"
                  style={{ backgroundColor: "#31029c", color: "white" }}
                >
                  {params.lang === "pt" ? "Ver Todos os Tratamentos" : "View All Treatments"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
