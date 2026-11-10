import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Banknote, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { heroPhoto } from "@/data/content";
import LogoBadge from "./LogoBadge";
import { Btn } from "./ui";
import { SECTION_IDS } from "./Navbar";

export default async function Hero() {
  const [t, tc, locale] = await Promise.all([getTranslations("hero"), getTranslations("common"), getLocale()]);
  const lang = locale as "fr" | "en";

  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-oxblood-deep">
      <Image
        src={heroPhoto.src}
        alt={heroPhoto.alt[lang]}
        fill
        priority
        fetchPriority="high"
        quality={50}
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Dark burgundy overlay: flat tint + deeper vignette at the edges */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-oxblood-deep/80" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(78_22_18/0.7)_100%)]" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-20">
        <LogoBadge id="hero-badge" priority label={`${siteConfig.name} — ${tc("since")}`} sizes="(min-width: 640px) 192px, 128px" className="badge-in size-32 drop-shadow-[0_10px_24px_rgb(0_0_0/0.4)] sm:size-48" />

        <h1 id="hero-title" className="rise mt-6 sm:mt-8 text-[2.125rem] leading-[1.12] tracking-[0.05em] text-cream sm:text-[3.25rem] lg:text-[3.75rem]" style={{ ["--i" as string]: 0 }}>
          {t("title")}
        </h1>

        <div aria-hidden className="rule-draw mt-5 flex w-48 flex-col gap-[3px]">
          <span className="h-px bg-gold" />
          <span className="h-px bg-gold" />
        </div>

        <p className="rise mt-5 max-w-[38ch] text-lg text-cream/95 sm:text-xl" style={{ ["--i" as string]: 1 }}>
          {t("lead")}
        </p>

        <div className="rise mt-8 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto" style={{ ["--i" as string]: 2 }}>
          <Btn href={siteConfig.phone.href} data-track="call" data-track-location="hero" variant="gold" className="col-span-2">
            <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2.25} />
            {tc("call")}
            <span className="tabular font-sans normal-case tracking-normal">{siteConfig.phone.display}</span>
          </Btn>
          <Btn
            href={siteConfig.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions"
            data-track-location="hero"
            variant="outline-light"
          >
            <Navigation aria-hidden className="size-4" />
            {tc("directions")}
            <span className="sr-only">{tc("newTab")}</span>
          </Btn>
          <Btn href={`#${SECTION_IDS.menu}`} variant="outline-light">
            {tc("menu")}
          </Btn>
        </div>

        {/* Trust row */}
        <ul className="rise mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.95rem] text-cream" style={{ ["--i" as string]: 3 }}>
          <li className="font-heading text-[0.85rem] font-bold uppercase tracking-[0.2em] text-gold">{tc("since")}</li>
          <li aria-hidden className="hidden h-4 w-px bg-gold/50 sm:block" />
          <li className="flex items-center gap-2">
            <Banknote aria-hidden className="size-[1.1rem] text-gold" />
            {t("cash")}
          </li>
        </ul>
      </div>
    </section>
  );
}
