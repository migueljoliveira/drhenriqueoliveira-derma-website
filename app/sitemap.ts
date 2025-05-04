import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drhenriqueoliveira.com"

  const routes = ["", "/about", "/services", "/contact"]

  const languages = ["pt", "en"]

  const sitemap: MetadataRoute.Sitemap = []

  // Add language-specific routes
  for (const lang of languages) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
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
