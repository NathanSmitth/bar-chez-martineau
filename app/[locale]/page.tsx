import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import OnTap from "@/components/OnTap";
import Menu from "@/components/Menu";
import Events from "@/components/Events";
import Story from "@/components/Story";
import Reviews from "@/components/Reviews";
import PhotoStrip from "@/components/PhotoStrip";
import Visit from "@/components/Visit";
import { alternatesFor, socialFor } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: alternatesFor(locale),
    ...socialFor(locale, t("title"), t("description")),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <OnTap />
      <Menu />
      <Events />
      <Story />
      <Reviews />
      <PhotoStrip />
      <Visit />
    </>
  );
}
