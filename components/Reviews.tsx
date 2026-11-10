import { getLocale, getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { reviews } from "@/data/content";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "./ui";
import { SECTION_IDS } from "./Navbar";

export default async function Reviews() {
  const [t, tc, locale] = await Promise.all([getTranslations("reviews"), getTranslations("common"), getLocale()]);

  return (
    <section id={SECTION_IDS.reviews} aria-labelledby="reviews-title" className="paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader id="reviews-title" eyebrow={tc("since")} title={t("title")} />

        {/* Link to the full Google listing */}
        <div className="-mt-4 mb-12 flex flex-col items-center text-center">
          <a
            href={siteConfig.maps.listing}
            target="_blank"
            rel="noopener noreferrer"
            data-track="reviews"
            data-track-location="reviews"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-oxblood underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-oxblood-deep"
          >
            {t("readAll")}
            <ExternalLink aria-hidden className="size-4" />
            <span className="sr-only">{tc("newTab")}</span>
          </a>
        </div>

        {/* Featured quote left, two stacked right */}
        <ul className="grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <li
              key={i}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
              className={`ring-double flex flex-col bg-cream/70 p-7 sm:p-8 ${i === 0 ? "md:row-span-2 md:justify-center md:p-10" : ""}`}
            >
              <figure className="flex h-full flex-col">
                <span aria-hidden className="font-heading text-5xl leading-none text-amber">
                  &ldquo;
                </span>
                <blockquote lang={r.lang} className={`mt-2 flex-1 italic text-walnut ${i === 0 ? "flex items-center text-[1.375rem] leading-snug sm:text-[1.625rem] md:text-[1.875rem]" : "text-lg"}`}>
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-walnut/15 pt-4">
                  <span className="font-heading text-[0.95rem] font-bold uppercase tracking-[0.1em] text-oxblood">
                    {r.author ?? t("anonymous")}
                  </span>
                  {r.author && <span className="text-[0.95rem] text-walnut/85">· {t("source")}</span>}
                  {locale !== r.lang && <span className="sr-only">({t("originalLang")})</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
