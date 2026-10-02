import type { MetadataRoute } from "next";

const siteUrl = "https://metoolkit.vercel.app";

const toolPaths = [
  "/calculator",
  "/cash-counter",
  "/tax-calculator",
  "/emi-calculator",
  "/gst-calculator",
  "/percentage-calculator",
  "/age-calculator",
  "/bmi-calculator",
  "/unit-converter"
];

const blogPaths = [
  "/blog/emi-calculator-guide",
  "/blog/cash-denomination-counter-guide",
  "/blog/old-vs-new-tax-regime-2026",
  "/blog/percentage-formulas-guide",
  "/blog/how-to-calculate-exact-age"
];

const staticPaths = ["/tools", "/blog", "/about", "/contact", "/privacy", "/terms", "/feedback"];

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 }
  ];

  const tools: MetadataRoute.Sitemap = toolPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: 0.9
  }));

  const statics: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: 0.6
  }));

  const blogs: MetadataRoute.Sitemap = blogPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: 0.5
  }));

  return [...home, ...tools, ...statics, ...blogs];
}
