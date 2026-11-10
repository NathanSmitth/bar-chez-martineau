import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { storyPhoto } from "@/data/content";
import { siteConfig } from "@/data/site";
import { SectionHeader, Tbc } from "./ui";
import { SECTION_IDS } from "./Navbar";

export default async function Story() {
  const [t, tc, locale] = await Promise.all([getTranslations("story"), getTranslations("common"), getLocale()]);
  const lang = locale as "fr" | "en";

  const timeline = [
    { year: String(siteConfig.founded), title: t("t1889"), body: null as string | null, tbc: false },
    { year: "· · ·", title: t("tMid"), body: t("tMidBody"), tbc: true },
    { year: t("tNowYear"), title: t("tNow"), body: null, tbc: false },
  ];

  return (
    <section id={SECTION_IDS.story} aria-labelledby="story-title" className="on-dark bg-oxblood px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <figure data-reveal className="ring-inset mx-auto w-full max-w-sm md:max-w-none">
          <Image
            src={storyPhoto.src}
            alt={storyPhoto.alt[lang]}
            width={storyPhoto.width}
            height={storyPhoto.height}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="sepia-photo aspect-[4/5] h-auto w-full object-cover"
          />
          <figcaption className="sr-only">{t("photoNote")}</figcaption>
        </figure>

        <div>
          <SectionHeader id="story-title" tone="dark" align="left" eyebrow={tc("since")} title={t("title")} />
          <div className="max-w-[60ch] space-y-5 text-[1.0625rem] text-cream/95 sm:text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <p className="mt-5">
            <Tbc tone="dark">{t("draft")}</Tbc>
          </p>

          {/* Slim gold timeline: vertical on phones, horizontal from sm up */}
          <ol
            aria-label={t("timelineLabel")}
            className="mt-12 grid gap-8 border-l border-gold pl-6 sm:grid-cols-3 sm:gap-6 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-6"
          >
            {timeline.map((step) => (
              <li key={step.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.85rem] top-2 size-2.5 rotate-45 bg-gold sm:-top-[1.95rem] sm:left-0"
                />
                <p className="font-heading text-[1.5rem] font-bold uppercase tracking-[0.06em] text-gold">{step.year}</p>
                <p className="mt-1 text-cream">{step.tbc ? <Tbc tone="dark">{step.title}</Tbc> : step.title}</p>
                {step.body && <p className="mt-1 text-[0.95rem] italic text-cream/85">{step.body}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
