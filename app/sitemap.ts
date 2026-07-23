import type { MetadataRoute } from "next";
import { tools, blogPosts } from "@/lib/data";

const siteUrl = "https://metoolkit.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/ai-tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 }
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${siteUrl}/tools/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.6
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.5
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
