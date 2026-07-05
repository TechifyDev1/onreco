import type { MetadataRoute } from "next";
import { blogPosts } from "./(marketing)/blog/_data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}`;
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/waitlist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = Object.values(blogPosts).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedTime ?? post.publishedTime),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

