import { getTranslations } from "next-intl/server";
import { Banknote, Beer, GlassWater, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { siteConfig } from "@/data/site";
import { Btn, PoolBallIcon, SectionHeader } from "./ui";

const CARDS: { key: "quarts" | "caesar" | "pool" | "cash"; Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean; strokeWidth?: number }> }[] = [
  { key: "quarts", Icon: Beer },
  { key: "caesar", Icon: GlassWater },
  { key: "pool", Icon: PoolBallIcon },
  { key: "cash", Icon: Banknote },
];

export default async function OnTap() {
  const [t, tc] = await Promise.all([getTranslations("onTap"), getTranslations("common")]);

  return (
    <section aria-labelledby="on-tap-title" className="on-dark bg-oxblood px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="on-tap-title" tone="dark" eyebrow={tc("since")} title={t("title")} lead={t("lead")} />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ key, Icon }, i) => (
            <li
              key={key}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
              className="ring-double grid grid-cols-[auto_1fr] gap-x-5 bg-oxblood-deep p-6 shadow-[0_18px_40px_-24px_rgb(40_8_6/0.8)] sm:flex sm:flex-col sm:p-7"
            >
              <span className="row-span-2 inline-flex size-12 sm:mb-5 items-center justify-center rounded-full border border-gold/70 text-gold">
                <Icon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="text-[1.2rem] tracking-[0.06em] text-gold">{t(`cards.${key}.title`)}</h3>
              <p className="mt-2 text-cream/95 sm:mt-3">{t(`cards.${key}.body`)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Btn href={siteConfig.phone.href} data-track="call" data-track-location="on-tap" variant="gold">
            <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2.25} />
            {t("cta")}
            <span className="tabular hidden font-sans normal-case tracking-normal sm:inline">· {siteConfig.phone.display}</span>
          </Btn>
        </div>
      </div>
    </section>
  );
}
