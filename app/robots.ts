import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}/sitemap.xml`,
  };
}
