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
              <p>{dict.about.description1}</p>
              <p>{dict.about.description2}</p>
              <p>{dict.about.description3}</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">{dict.about.education.title}</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {dict.about.education.items.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-500 mr-3 flex-shrink-0">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">{dict.about.experience.title}</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {dict.about.experience.items.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-500 mr-3 flex-shrink-0">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6 text-gray-700 text-center">{dict.about.affiliations.title}</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              {dict.about.affiliations.items.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-pink-100 text-pink-500 mr-3 flex-shrink-0">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {dict.about.contactButton}
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">{dict.about.website}</p>
          <a
            href="https://www.drhenriqueoliveira-derma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            www.drhenriqueoliveira-derma.com
          </a>
        </div>
      </div>
    </div>
  )
}
