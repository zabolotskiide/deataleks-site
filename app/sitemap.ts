import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://detaleks.ru";
  return ["", "/requisites", "/privacy", "/terms", "/personal-data-consent"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path ? 0.6 : 1,
  }));
}