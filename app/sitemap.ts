import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drhenriqueoliveira-derma.com"

  const routes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/faq",
    "/technologies",
    "/dermatology",
    "/aesthetic",
    "/conditions",
  ]

  const languages = ["pt", "en"]

  const sitemap: MetadataRoute.Sitemap = []

  // Add language-specific routes
  for (const lang of languages) {
    for (const route of routes) {
      // Handle Portuguese route variations
      let routePath = route
      if (lang === "pt") {
        if (route === "/services") routePath = "/servicos"
        if (route === "/contact") routePath = "/contato"
        if (route === "/about") routePath = "/dr-henrique-oliveira"
        if (route === "/technologies") routePath = "/tecnologias"
        if (route === "/dermatology") routePath = "/dermatologia"
        if (route === "/aesthetic") routePath = "/estetica"
      }

      sitemap.push({
        url: `${baseUrl}/${lang}${routePath}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      })
    }
  }

  // Add root route that redirects to default language
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  })

  return sitemap
}
