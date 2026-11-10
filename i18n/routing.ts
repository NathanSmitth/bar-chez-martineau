import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Quebec site: "/" always lands on French, regardless of browser language.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// BCP 47 tags used for <html lang>, hreflang and OpenGraph.
export const localeTags: Record<Locale, { lang: string; og: string }> = {
  fr: { lang: "fr-CA", og: "fr_CA" },
  en: { lang: "en-CA", og: "en_CA" },
};
