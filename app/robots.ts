import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://drhenriqueoliveira-derma.com/sitemap.xml",
    host: "https://drhenriqueoliveira-derma.com",
  }
}
