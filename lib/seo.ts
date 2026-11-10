import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

/** Canonical + hreflang (fr-CA / en-CA / x-default → French) for a path like "" or "/menu". */
export function alternatesFor(locale: string, path = "") {
  const url = (l: string) => `${siteConfig.url}/${l}${path}`;
  return {
    canonical: url(locale),
    languages: {
      "fr-CA": url("fr"),
      "en-CA": url("en"),
      "x-default": url(routing.defaultLocale),
    },
  };
}

/**
 * Full OpenGraph + Twitter block. Next.js replaces (doesn't merge) these objects
 * per segment, so every page passes the complete set through this helper.
 */
export function socialFor(locale: string, title: string, description: string, path = "") {
  const og = locale === "en" ? "en_CA" : "fr_CA";
  const image = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    openGraph: {
      type: "website" as const,
      siteName: siteConfig.name,
      title,
      description,
      url: `/${locale}${path}`,
      locale: og,
      alternateLocale: og === "fr_CA" ? "en_CA" : "fr_CA",
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image.url],
    },
  };
}
