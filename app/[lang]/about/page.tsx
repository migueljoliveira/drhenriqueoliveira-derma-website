import { getDictionary } from "@/dictionaries"
import Image from "next/image"
import Link from "next/link"

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-thin mb-8 text-center text-gray-800">{dict.about.title}</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/dr-oliveira-1.png"
                alt="Dr. Henrique Oliveira"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-medium mb-4 text-gray-700">{dict.about.subtitle}</h2>
            <div className="prose prose-lg max-w-none">
              {dict.about.doctor && dict.about.doctor.bio ? (
                dict.about.doctor.bio.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)
              ) : (
                <>
                  <p>
                    Dr. Henrique Oliveira is a board-certified dermatologist with over 30 years of experience in both
                    medical and cosmetic dermatology.
                  </p>
                  <p>
                    His expertise spans a wide range of dermatological conditions and aesthetic treatments, with a
                    particular focus on non-invasive rejuvenation techniques.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">
            {dict.about.doctor && dict.about.doctor.education ? dict.about.doctor.education.title : "Education"}
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {dict.about.doctor && dict.about.doctor.education ? (
              <p>{dict.about.doctor.education.detail}</p>
            ) : (
              <p>
                University of Coimbra Medical School, Specialized training in Dermatology and Venereology. Subspecialty
                in Aesthetic Medicine
              </p>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">
            {dict.about.doctor && dict.about.doctor.experience ? dict.about.doctor.experience.title : "Experience"}
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {dict.about.doctor && dict.about.doctor.experience ? (
              <p>{dict.about.doctor.experience.detail}</p>
            ) : (
              <p>Over 30 years of specialized dermatological practice</p>
            )}
          </div>
        </div>

        {dict.about.philosophy && (
          <div className="mb-12">
            <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">{dict.about.philosophy.title}</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {dict.about.philosophy.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {lang === "en" ? "Contact Us" : "Contato"}
          </Link>
        </div>
      </div>
    </div>
  )
}
