import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "./ui";

// Optional events block. Hidden until siteConfig.events.enabled is true AND
// there is at least one real event — never ship an empty "coming soon".
export default async function Events() {
  const { enabled, items } = siteConfig.events;
  if (!enabled || items.length === 0) return null;

  const [t, tc, locale] = await Promise.all([getTranslations("events"), getTranslations("common"), getLocale()]);
  const lang = locale as "fr" | "en";

  return (
    <section aria-labelledby="events-title" className="on-dark bg-oxblood-deep px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeader id="events-title" tone="deep" eyebrow={tc("since")} title={t("title")} />
        <ul className="divide-y divide-gold/30 border-y border-gold/30">
          {items.map((e) => (
            <li key={e.date + e.fr} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.16em] text-gold sm:w-40">{e.date}</span>
              <span className="text-cream">{e[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
