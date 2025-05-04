import { getDictionary } from "@/dictionaries"
import { FlashingButton } from "@/components/flashing-button"
import { FlashingServiceCard } from "@/components/flashing-service-card"
import { FlashingIcon } from "@/components/flashing-icon"
import { FlashingHighlight } from "@/components/flashing-highlight"
import { FlashingSection } from "@/components/flashing-section"
import { Heart, Star, Zap, Shield, Sparkles } from "lucide-react"

export default async function FlashingDemoPage({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-thin mb-8 text-center">
          <FlashingHighlight color="#31029c" intensity="medium">
            Flashing Effects
          </FlashingHighlight>{" "}
          Demo
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-thin mb-6">Flashing Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <FlashingButton href="#" variant="primary" flashIntensity="medium">
              Primary Button
            </FlashingButton>
            <FlashingButton href="#" variant="secondary" flashIntensity="medium">
              Secondary Button
            </FlashingButton>
            <FlashingButton href="#" variant="dark" flashIntensity="medium">
              Dark Button
            </FlashingButton>
            <FlashingButton href="#" variant="light" flashColor="#31029c" flashIntensity="low">
              Light Button
            </FlashingButton>
          </div>
        </section>

        <FlashingSection color="#f96c8b" className="p-6 mb-16 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-thin mb-6">Flashing Service Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlashingServiceCard
              title="Clinical Dermatology"
              description="Expert diagnosis and treatment for all skin conditions"
              icon={<Heart className="w-6 h-6 text-white" />}
              href={`/${lang}/dermatology`}
              color="#f96c8b"
              lang={lang}
              featured={true}
            />
            <FlashingServiceCard
              title="Aesthetic Procedures"
              description="Advanced treatments for skin rejuvenation"
              icon={<Star className="w-6 h-6 text-white" />}
              href={`/${lang}/aesthetic`}
              color="#31029c"
              lang={lang}
              featured={true}
            />
            <FlashingServiceCard
              title="Laser Therapy"
              description="Cutting-edge laser treatments for various skin concerns"
              icon={<Zap className="w-6 h-6 text-white" />}
              href={`/${lang}/services`}
              color="#f96c8b"
              lang={lang}
            />
            <FlashingServiceCard
              title="Trichology"
              description="Specialized care for hair and scalp conditions"
              icon={<Sparkles className="w-6 h-6 text-white" />}
              href={`/${lang}/services`}
              color="#31029c"
              lang={lang}
            />
          </div>
        </FlashingSection>

        <section className="mb-16">
          <h2 className="text-2xl font-thin mb-6">Flashing Icons</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <FlashingIcon icon={<Heart className="w-6 h-6" />} color="#f96c8b" size="md" alwaysFlash={true} />
            <FlashingIcon icon={<Star className="w-6 h-6" />} color="#31029c" size="md" alwaysFlash={true} />
            <FlashingIcon icon={<Zap className="w-6 h-6" />} color="#f96c8b" size="lg" alwaysFlash={true} />
            <FlashingIcon icon={<Shield className="w-6 h-6" />} color="#31029c" size="lg" alwaysFlash={true} />
          </div>
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-2xl font-thin mb-6">Flashing Text Highlights</h2>
          <p className="text-xl">
            We provide <FlashingHighlight color="#f96c8b">expert dermatological care</FlashingHighlight> for all your
            skin concerns.
          </p>
          <p className="text-xl mt-4">
            Our <FlashingHighlight color="#31029c">advanced aesthetic procedures</FlashingHighlight> help you look and
            feel your best.
          </p>
        </section>
      </div>
    </main>
  )
}
