import type { Metadata, Viewport } from "next";
import { Cinzel, Lora } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import JsonLd from "@/components/JsonLd";
import Tracking from "@/components/Tracking";
import ScrollReveal from "@/components/ScrollReveal";
import { localeTags, routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { alternatesFor, socialFor } from "@/lib/seo";

// Headings: Cinzel (inscriptional caps — the logo's letterforms). Body: Lora.
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["700"], display: "swap" });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#6A1F1A",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: `%s | ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: alternatesFor(locale),
    ...socialFor(locale, t("title"), t("description")),
    formatDetection: { telephone: true, address: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tHeader = await getTranslations({ locale, namespace: "header" });

  return (
    <html lang={localeTags[locale].lang} className={`${cinzel.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-cream focus:px-4 focus:py-3 focus:font-medium focus:text-oxblood"
        >
          {tHeader("skip")}
        </a>
        <NextIntlClientProvider messages={null}>
          <JsonLd />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCallBar />
          <Tracking />
          <ScrollReveal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
