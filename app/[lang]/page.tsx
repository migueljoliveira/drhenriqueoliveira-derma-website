import { getDictionary } from "@/dictionaries"
import type { Metadata } from "next"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { KenBurnsSlideshow } from "@/components/ken-burns-slideshow"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedServiceCard } from "@/components/animated-service-card"
import { FlashingButton } from "@/components/flashing-button"
import { FlashingServiceCard } from "@/components/flashing-service-card"
import { FlashingHighlight } from "@/components/flashing-highlight"
import { FixedImageGallery } from "@/components/fixed-image-gallery"
// Add structured data for the homepage
import Script from "next/script"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  const title =
    params.lang === "pt"
      ? "Dr. Henrique Oliveira - Dermatologista em Coimbra e Viseu"
      : "Dr. Henrique Oliveira - Dermatologist in Coimbra and Viseu"

  const description =
    params.lang === "pt"
      ? "Tratamentos personalizados de dermatologia médica e estética. Especialista com mais de 30 anos de experiência. Prémio Carreira SPME 2024 (Sociedade Portuguesa de Medicina Estética."
      : "Personalized medical and aesthetic dermatology treatments. Specialist with over 30 years of experience.SPME 2024 Lifetime Achievement Award."

  return {
    title,
    description,
    alternates: {
      canonical: `https://drhenriqueoliveira.com/${params.lang}`,
      languages: {
        en: "https://drhenriqueoliveira.com/en",
        pt: "https://drhenriqueoliveira.com/pt",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://drhenriqueoliveira.com/${params.lang}`,
      siteName: title,
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "website",
    },
  }
}

export default async function Home({ params }: { params: { lang: string } }) {
  // Fetch dictionary server-side
  const dictionary = await getDictionary(params.lang)

  // Add this right after the dictionary and other variables are defined
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.lang === "pt" ? "Dr. Henrique Oliveira - Dermatologista" : "Dr. Henrique Oliveira - Dermatologist",
    description:
      params.lang === "pt"
        ? "Tratamentos personalizados de dermatologia médica e estética. Especialista com mais de 30 anos de experiência."
        : "Personalized medical and aesthetic dermatology treatments. Specialist with over 30 years of experience.",
    url: `https://drhenriqueoliveira.com/${params.lang}`,
    mainEntity: {
      "@type": "MedicalBusiness",
      name: "Dr. Henrique Oliveira - Dermatologia",
      medicalSpecialty: ["Dermatology", "Aesthetic Medicine"],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "h3"],
    },
  }

  // Create language-specific testimonials
  const testimonials =
    params.lang === "pt"
      ? [
          // Portuguese testimonials
          {
            quote: dictionary.home.testimonials.quote,
            author: dictionary.home.testimonials.author,
          },
          {
            quote:
              "Queria melhorar o aspeto da minha pele sem recorrer a grandes intervenções. O Dr. Henrique propôs um plano de rejuvenescimento muito discreto e natural. Fiz toxina botulínica e micro needleing, com segurança, bioestimuladores e o resultado foi exatamente o que procurava: pele mais firme, com ar descansado e luminoso. Recomendo vivamente!",
            author: "— Ana C., 47 anos",
          },
          {
            quote:
              "Após anos de luta contra a rosácea, finalmente encontrei um tratamento que funciona. O Dr. Henrique Oliveira não só tratou os sintomas, mas também me ajudou a entender os fatores desencadeantes. Sua abordagem holística fez toda a diferença.",
            author: "— Carlos M., 39 anos",
          },
          {
            quote:
              "Durante anos lutei contra o acne adulto e já tinha perdido a esperança de encontrar algo que realmente resultasse. O Dr. Henrique Oliveira foi incansável — ouviu-me com atenção, explicou o tratamento passo a passo e, em poucos meses, vi uma diferença enorme na minha pele. Hoje, sinto-me muito mais confiante. Só tenho a agradecer!",
            author: "— Marta L., 36 anos",
          },
        ]
      : [
          // English testimonials
          {
            quote: dictionary.home.testimonials.quote,
            author: dictionary.home.testimonials.author,
          },
          {
            quote:
              "I wanted to improve my skin's appearance without resorting to major interventions. Dr. Henrique proposed a very discreet and natural rejuvenation plan. I had botulinum toxin and micro needling, with safety, biostimulators, and the result was exactly what I was looking for: firmer skin, with a rested and luminous appearance. I highly recommend it!",
            author: "— Ana C., 47 years old",
          },
          {
            quote:
              "After years of struggling with rosacea, I finally found a treatment that works. Dr. Henrique Oliveira not only treated the symptoms but also helped me understand the triggering factors. His holistic approach made all the difference.",
            author: "— Carlos M., 39 years old",
          },
          {
            quote:
              "For years I struggled with adult acne and had already lost hope of finding something that really worked. Dr. Henrique Oliveira was tireless — he listened to me carefully, explained the treatment step by step, and in a few months, I saw a huge difference in my skin. Today, I feel much more confident. I can only say thank you!",
            author: "— Marta L., 36 years old",
          },
        ]

  // Dermatology slideshow images - using direct blob URL for the first image
  const slideshowImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shutterstock_106522193.jpg-vyHB0ghn7jqVEoObUr4AciRFkng1Fc.jpeg", // Direct blob URL for skin with drops
      alt: params.lang === "pt" ? "Pele saudável com gotas de sérum" : "Healthy skin with serum drops",
    },
    {
      src: "/dermatology-aesthetic.jpg",
      alt: params.lang === "pt" ? "Tratamento de dermatologia estética" : "Aesthetic dermatology treatment",
    },
    {
      src: "/child-hand.png",
      alt:
        params.lang === "pt"
          ? "Mão de adulto segurando a mão de uma criança, representando cuidado e confiança"
          : "Adult hand holding a child's hand, representing care and trust",
    },
    {
      src: "/laser-treatment.jpeg",
      alt:
        params.lang === "pt"
          ? "Tratamento a laser para acne sendo realizado em paciente"
          : "Laser treatment for acne being performed on patient",
    },
    {
      src: "/facial-treatment.png",
      alt:
        params.lang === "pt"
          ? "Tratamento facial profissional sendo realizado em ambiente clínico"
          : "Professional facial treatment being performed in a clinical setting",
    },
  ]

  // Gallery images for the fixed gallery - using direct blob URLs for all images
  const galleryImages = [
    {
      src: "/wart-filiform-eyelid.jpg", // Filiform wart image
      alt: params.lang === "pt" ? "Verruga filiforme na pálpebra" : "Filiform wart on eyelid",
      caption: params.lang === "pt" ? "Verruga filiforme" : "Filiform wart",
    },
    {
      src: "/rosacea-2.jpg",
      alt: params.lang === "pt" ? "Rosácea com olho azul visível" : "Rosacea with blue eye visible",
      caption: params.lang === "pt" ? "Rosácea" : "Rosacea",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-karolina-grabowska-4046561.jpg-guntPW3xy4nprmyY7187gF8DGWGvod.jpeg", // Direct blob URL for mole
      alt: params.lang === "pt" ? "Pequeno nevo na pele" : "Small mole on skin",
      caption: params.lang === "pt" ? "Nevos" : "Moles",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Melanoma.jpg-wYgi8BkTS85wV3oogh3BDC5m6HnqRq.jpeg", // Direct blob URL for melanoma
      alt: params.lang === "pt" ? "Melanoma com bordas irregulares" : "Melanoma with irregular borders",
      caption: params.lang === "pt" ? "Melanoma" : "Melanoma",
    },
  ]

  // Define custom service cards to avoid duplication
  const serviceCards =
    params.lang === "pt"
      ? [
          {
            title: "Dermatologia Clínica",
            description:
              "Diagnóstico e tratamento de diversas patologias cutâneas, utilizando métodos avançados e personalizados.",
          },
          {
            title: "Dermatologia Estética e Cirúrgica",
            description:
              "Procedimentos estéticos minimamente invasivos e cirurgias dermatológicas com resultados naturais.",
          },
          {
            title: "Tecnologias Avançadas",
            description:
              "Equipamentos de última geração para tratamentos eficazes e seguros, com resultados comprovados cientificamente.",
          },
          {
            title: "Tricologia e Onicologia",
            description:
              "Diagnóstico e tratamento especializado para problemas capilares e das unhas, utilizando protocolos personalizados para cada tipo de condição.",
          },
        ]
      : [
          {
            title: "Clinical Dermatology",
            description: "Diagnosis and treatment of various skin conditions using advanced and personalized methods.",
          },
          {
            title: "Aesthetic and Surgical Dermatology",
            description: "Minimally invasive aesthetic procedures and dermatological surgeries with natural results.",
          },
          {
            title: "Advanced Technologies",
            description:
              "State-of-the-art equipment for effective and safe treatments with scientifically proven results.",
          },
          {
            title: "Trichology and Onychology",
            description:
              "Specialized diagnosis and treatment for hair and nail problems, using personalized protocols for each condition.",
          },
        ]

  // Add this inside the return statement, right after the opening <div> tag
  return (
    <div style={{ backgroundColor: "#FAFAFA", color: "#2E2E2E" }} className="font-sans">
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-10 max-w-6xl mx-auto">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="heading-xl mb-6">
            {dictionary.home?.hero?.title1 || "Expert"} <br />{" "}
            <FlashingHighlight>{dictionary.home?.hero?.title2 || "Dermatology Care"}</FlashingHighlight>
          </h1>
          <p className="text-lg mb-6">
            {dictionary.home?.hero?.subtitle || "Personalized treatments for healthy, beautiful skin."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
            <div className="flashing-button-wrapper">
              <FlashingButton
                href={`/${params.lang}/${params.lang === "pt" ? "servicos" : "services"}`}
                variant="primary"
              >
                {dictionary.home?.hero?.primaryButton || "View Services"}
              </FlashingButton>
            </div>
            <AnimatedButton href={`/${params.lang}/${params.lang === "pt" ? "contato" : "contact"}`} variant="light">
              {dictionary.home?.hero?.secondaryButton || "Contact Us"}
            </AnimatedButton>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <KenBurnsSlideshow images={slideshowImages} interval={7000} />
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ backgroundColor: "#FFFFFF" }} className="px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
            {dictionary.home?.about?.overline || "ABOUT"}
          </h2>
          <h3 className="heading-md mb-4">{dictionary.home?.about?.title || "Dr. Henrique Oliveira"}</h3>
          <p className="text-gray-700">
            {dictionary.home?.about?.description ||
              "Specialist with over 30 years of experience delivering exceptional dermatological care."}
          </p>
          <div className="mt-6">
            <AnimatedButton
              href={`/${params.lang}/${params.lang === "pt" ? "dr-henrique-oliveira" : "about"}`}
              variant="primary"
            >
              {dictionary.home?.about?.button || "Learn More"}
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ backgroundColor: "#FAFAFA" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
              {dictionary.home?.services?.overline || "SERVICES"}
            </h2>
            <h3 className="heading-md mb-4">
              <FlashingHighlight>{dictionary.home?.services?.title || "Services"}</FlashingHighlight>
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {dictionary.home?.services?.subtitle ||
                "Comprehensive dermatological care for all your skin health needs."}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {serviceCards.map((service, index) =>
              index % 2 === 0 ? (
                <FlashingServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  href={`/${params.lang}/${params.lang === "pt" ? "servicos" : "services"}`}
                  color={index % 2 === 0 ? "#773cf6" : "#f96c8b"}
                  lang={params.lang}
                />
              ) : (
                <AnimatedServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  href={`/${params.lang}/${params.lang === "pt" ? "servicos" : "services"}`}
                  color={index % 2 === 0 ? "#773cf6" : "#f96c8b"}
                  lang={params.lang}
                />
              ),
            )}
          </div>

          <div className="text-center mt-10">
            <AnimatedButton href={`/${params.lang}/${params.lang === "pt" ? "servicos" : "services"}`} variant="dark">
              {dictionary.home?.services?.button || "View All"}
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* COMMON CONDITIONS */}
      <section style={{ backgroundColor: "#f8ebef" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
              {dictionary.home?.conditions?.overline || "CONDITIONS"}
            </h2>
            <h3 className="heading-md mb-4">{dictionary.home?.conditions?.title || "Conditions Treated"}</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {dictionary.home?.conditions?.subtitle ||
                "Treatment of a wide variety of dermatological conditions with personalized approaches."}
            </p>
          </div>

          {/* Use the fixed image gallery with proper captions */}
          <FixedImageGallery images={galleryImages} lang={params.lang} clickToNavigate={true} />

          <div className="text-center mt-10">
            <AnimatedButton
              href={`/${params.lang}/${params.lang === "pt" ? "servicos" : "services"}`}
              variant="primary"
            >
              {dictionary.home?.conditions?.button || "Learn More"}
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #260279" }} className="px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-6">
            {dictionary.home?.testimonials?.overline || "TESTIMONIALS"}
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-10 text-white" style={{ backgroundColor: "#e8e8e8" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6" style={{ color: "#2E2E2E" }}>
            {dictionary.home?.cta?.title || "Schedule Your Consultation"}
          </h2>
          <p className="text-lg mb-8 text-[#2E2E2E] opacity-90">
            {dictionary.home?.cta?.subtitle ||
              "Contact us today to schedule your personalized dermatological consultation."}
          </p>
          <div className="flashing-button-wrapper">
            <FlashingButton
              href={`/${params.lang}/${params.lang === "pt" ? "contato" : "contact"}`}
              variant="dark"
              className="px-8 py-3"
            >
              {dictionary.home?.cta?.button || "Contact Us"}
            </FlashingButton>
          </div>
        </div>
      </section>
    </div>
  )
}
