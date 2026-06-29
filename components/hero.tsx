export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-lg sm:text-2xl md:text-5xl font-light text-gray-800 leading-tight text-balance">
              Excelência em
              <br />
              Dermatologia
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Tratamentos personalizados para alcançar uma pele saudável e bonita.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-light text-sm">
                Ver Tratamentos
              </button>
              <button className="border-2 border-gray-400 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-full font-light text-sm">
                Contato
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-3xl aspect-square overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-orange-200 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
