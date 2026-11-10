import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (l: string) => `${siteConfig.url}/${l}`;
  return routing.locales.map((locale) => ({
    url: url(locale),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: { "fr-CA": url("fr"), "en-CA": url("en"), "x-default": url(routing.defaultLocale) } },
  }));
}
