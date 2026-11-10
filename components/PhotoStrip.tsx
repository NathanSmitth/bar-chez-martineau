import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { stripPhotos } from "@/data/content";
import { SectionHeader } from "./ui";

// Swipeable row on phones (scrolls inside its own track, never the page),
// a 3×2 grid on tablets, one 6-up strip on desktop.
export default async function PhotoStrip() {
  const [t, tc, locale] = await Promise.all([getTranslations("photos"), getTranslations("common"), getLocale()]);
  const lang = locale as "fr" | "en";

  return (
    <section aria-labelledby="photos-title" className="on-dark overflow-hidden bg-oxblood-deep py-20 sm:py-24">
      <div className="px-4 sm:px-6">
        <SectionHeader id="photos-title" tone="deep" eyebrow={tc("since")} title={t("title")} />
      </div>
      <ul
        aria-label={t("listLabel")}
        tabIndex={0}
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-6 lg:grid-cols-6 lg:px-8"
      >
        {stripPhotos.map((p) => (
          <li key={p.src} className="ring-inset w-[68%] shrink-0 snap-center sm:w-auto">
            <Image
              src={p.src}
              alt={p.alt[lang]}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 31vw, 68vw"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
