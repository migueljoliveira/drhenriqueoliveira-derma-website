"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react"
import { LoadingIndicator } from "@/components/loading-indicator"
import Head from "next/head"

export default function ContactPage() {
  const params = useParams()
  const lang = params.lang as string
  const [dictionary, setDictionary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add structured data for the contact page
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: lang === "pt" ? "Contato | Dr. Henrique Oliveira" : "Contact | Dr. Henrique Oliveira",
      description:
        lang === "pt"
          ? "Entre em contato com Dr. Henrique Oliveira para agendar sua consulta em Coimbra ou Viseu."
          : "Contact Dr. Henrique Oliveira to schedule your appointment in Coimbra or Viseu.",
      mainEntity: {
        "@type": "MedicalBusiness",
        name: "Dr. Henrique Oliveira - Dermatologia",
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "Rua Ferreira Borges 165 2º andar",
            addressLocality: "Coimbra",
            addressCountry: "Portugal",
          },
          {
            "@type": "PostalAddress",
            addressLocality: "Viseu",
            addressCountry: "Portugal",
          },
        ],
        email: "h.g.oliveira@gmail.com",
        telephone: "+351 123456789",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
      },
    })
    document.head.appendChild(script)

    async function loadDictionary() {
      try {
        const response = await fetch(`/api/dictionary?lang=${lang}`)
        if (response.ok) {
          const data = await response.json()
          setDictionary(data)
        } else {
          // Fallback dictionary
          setDictionary({
            contact: {
              title: "Contact Us",
              subtitle: "We're here to answer your questions and schedule your consultation.",
              info: {
                title: "Contact Information",
                address: {
                  title: "Practice Locations",
                  locations: [
                    "Ferreira Borges 165 2º andar (Coimbra)",
                    "Hospital da Luz (Coimbra, Agueda, OIÂ)",
                    "Clinica Montes Claros (HSO dermatologia)",
                    "Viseu - Viseu Vida, Clinica Particular de Viseu",
                    "ANADIA IBERVITA",
                  ],
                  website: "https://www.personalderma.pt/",
                },
                phone: { title: "Phone", number: "+55 (11) 3456-7890" },
                email: { title: "Email", address: "h.g.oliveira@gmail.com" },
                hours: {
                  title: "Office Hours",
                  weekdays: "Monday - Friday: 9:00 - 18:00",
                  saturday: "Saturday: 9:00 - 14:00",
                  sunday: "Sunday: Closed",
                },
              },
              form: {
                title: "Send Us a Message",
                fields: {
                  name: { label: "Name", placeholder: "Your name" },
                  email: { label: "Email", placeholder: "Your email address" },
                  phone: { label: "Phone", placeholder: "Your phone number (optional)" },
                  message: { label: "Message", placeholder: "How can we help you?" },
                },
                submit: "Send Message",
                submitting: "Sending...",
                success: { title: "Thank You!", message: "Your message has been sent. We'll get back to you shortly." },
              },
            },
          })
        }
      } catch (error) {
        console.error("Failed to load dictionary:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDictionary()

    return () => {
      document.head.removeChild(script)
    }
  }, [lang])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 1500)
  }

  // Show loading state while dictionary is loading
  if (loading || !dictionary) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  const dict = dictionary.contact || {
    title: "Contact Us",
    subtitle: "We're here to answer your questions and schedule your consultation.",
    info: {
      title: "Contact Information",
      address: {
        title: "Practice Locations",
        locations: [
          "Ferreira Borges 165 2º andar (Coimbra)",
          "Hospital da Luz (Coimbra, Agueda, OIÂ)",
          "Clinica Montes Claros (HSO dermatologia)",
          "Viseu - Viseu Vida, Clinica Particular de Viseu",
          "ANADIA IBERVITA",
        ],
        website: "https://www.personalderma.pt/",
      },
      phone: { title: "Phone", number: "+55 (11) 3456-7890" },
      email: { title: "Email", address: "h.g.oliveira@gmail.com" },
      hours: {
        title: "Office Hours",
        weekdays: "Monday - Friday: 9:00 - 18:00",
        saturday: "Saturday: 9:00 - 14:00",
        sunday: "Sunday: Closed",
      },
    },
    form: {
      title: "Send Us a Message",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "Your email address" },
        phone: { label: "Phone", placeholder: "Your phone number (optional)" },
        message: { label: "Message", placeholder: "How can we help you?" },
      },
      submit: "Send Message",
      submitting: "Sending...",
      success: { title: "Thank You!", message: "Your message has been sent. We'll get back to you shortly." },
    },
  }

  return (
    <>
      <Head>
        <title>{lang === "pt" ? "Contato | Dr. Henrique Oliveira" : "Contact | Dr. Henrique Oliveira"}</title>
        <meta
          name="description"
          content={
            lang === "pt"
              ? "Entre em contato com Dr. Henrique Oliveira para agendar sua consulta em Coimbra ou Viseu."
              : "Contact Dr. Henrique Oliveira to schedule your appointment in Coimbra or Viseu."
          }
        />
      </Head>
      <div className="bg-[#FAFAFA]">
        {/* Hero Section */}
        <section className="bg-[#FFFFFF] py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6" style={{ color: "#f96c8b" }}>
                {dict.title}
              </h1>
              <p className="text-lg text-gray-700">{dict.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
              {/* Contact Information */}
              <div className="lg:w-2/5">
                <h2 className="heading-md mb-6" style={{ color: "#f96c8b" }}>
                  {dict.info.title}
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 mt-1" style={{ color: "#ff6bd0" }} />
                    <div>
                      <h3 className="font-medium mb-3">{dict.info.address.title}</h3>
                      {dict.info.address.locations &&
                        dict.info.address.locations.map((location: string, index: number) => (
                          <p key={index} className="text-gray-700 mb-2">
                            {location}
                          </p>
                        ))}
                      {dict.info.address.website && (
                        <div className="flex items-center mt-3">
                          <Globe className="h-4 w-4 mr-1" style={{ color: "#ff6bd0" }} />
                          <a
                            href={dict.info.address.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#773cf6] hover:underline"
                          >
                            {dict.info.address.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 mt-1" style={{ color: "#ff6bd0" }} />
                    <div>
                      <h3 className="font-medium mb-3">{dict.info.phone.title}</h3>
                      <p className="text-gray-700">{dict.info.phone.number}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 mt-1" style={{ color: "#ff6bd0" }} />
                    <div>
                      <h3 className="font-medium mb-3">{dict.info.email.title}</h3>
                      <p className="text-gray-700">{dict.info.email.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 mr-3 mt-1" style={{ color: "#ff6bd0" }} />
                    <div>
                      <h3 className="font-medium mb-3">{dict.info.hours.title}</h3>
                      <p className="text-gray-700 mb-2">{dict.info.hours.weekdays}</p>
                      <p className="text-gray-700 mb-2">{dict.info.hours.saturday}</p>
                      <p className="text-gray-700">{dict.info.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-3/5">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="heading-md mb-6" style={{ color: "#f96c8b" }}>
                    {dict.form.title}
                  </h2>

                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <h3 style={{ color: "#2E2E2E" }} className="text-xl font-medium mb-2">
                        {dict.form.success.title}
                      </h3>
                      <p className="text-green-700">
                        {params.lang === "pt"
                          ? "Sua mensagem foi enviada. Dr. Henrique Oliveira entrará em contato em breve."
                          : "Your message has been sent. Dr. Henrique Oliveira will get back to you shortly."}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.form.fields.name.label}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={dict.form.fields.name.placeholder}
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.form.fields.email.label}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={dict.form.fields.email.placeholder}
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.form.fields.phone.label}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={dict.form.fields.phone.placeholder}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {dict.form.fields.message.label}
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={dict.form.fields.message.placeholder}
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-3 rounded-xl text-white text-sm tracking-wide transition flex items-center justify-center min-w-[120px]"
                          style={{
                            backgroundColor: isSubmitting ? "#ffb3d1" : "#f96c8b",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                          }}
                        >
                          {isSubmitting ? dict.form.submitting : dict.form.submit}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-6 pb-10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.8835302080944!2d-8.431066023468328!3d40.20972937147675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22f9ad8b9a7023%3A0x500ebbde4910590!2sR.%20Ferreira%20Borges%20165%2C%20Coimbra!5e0!3m2!1sen!2spt!4v1714782283121!5m2!1sen!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dr. Henrique Oliveira Location - Rua Ferreira Borges 165 2º andar, Coimbra"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
