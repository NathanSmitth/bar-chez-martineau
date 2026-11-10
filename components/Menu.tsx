import { getLocale, getTranslations } from "next-intl/server";
import { Banknote, Phone } from "lucide-react";
import { menu, type MenuItem } from "@/data/content";
import { siteConfig } from "@/data/site";
import { Btn, SectionHeader, Tbc } from "./ui";
import { SECTION_IDS } from "./Navbar";

export default async function Menu() {
  const [t, tc, locale] = await Promise.all([getTranslations("menu"), getTranslations("common"), getLocale()]);
  const lang = locale as "fr" | "en";

  const column = ({ title, items, id }: { title: string; items: MenuItem[]; id: string }) => (
    <div data-reveal className="ring-double bg-cream/70 p-6 sm:p-8">
      <h3 id={id} className="flex items-center gap-4 text-[1.35rem] text-oxblood">
        {title}
        <span aria-hidden className="h-px flex-1 bg-gold" />
      </h3>
      <ul aria-labelledby={id} className="mt-6 divide-y divide-walnut/15">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-3 py-4">
            <div className="min-w-0 flex-1 sm:max-w-[70%] sm:flex-none">
              {item.name ? (
                <>
                  <p className="text-[1.0625rem] font-medium text-walnut">{item.name[lang]}</p>
                  {item.note && <p className="mt-1 text-[0.95rem] italic text-walnut/85">{item.note[lang]}</p>}
                </>
              ) : (
                <Tbc caps={false}>
                  {item.note ? `${item.note[lang]} — ${t("itemTbcSuffix")}` : t("itemTbc")}
                </Tbc>
              )}
            </div>
            <span aria-hidden className="hidden flex-1 translate-y-[-4px] border-b border-dotted border-walnut/35 sm:block" />
            <span className="shrink-0">
              {item.price ? <span className="tabular font-medium text-walnut">{item.price}</span> : <Tbc>{t("priceTbc")}</Tbc>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id={SECTION_IDS.menu} aria-labelledby="menu-title" className="paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader id="menu-title" eyebrow={tc("since")} title={t("title")} lead={t("lead")} />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {column({ id: "menu-drinks", title: t("drinks"), items: menu.drinks })}
          {column({ id: "menu-food", title: t("food"), items: menu.food })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <p className="max-w-[56ch] italic text-walnut">{t("note")}</p>
          <p className="flex items-center gap-2 font-medium text-amber-ink">
            <Banknote aria-hidden className="size-5" />
            {t("cashNote")}
          </p>
          <Btn href={siteConfig.phone.href} data-track="call" data-track-location="menu" variant="oxblood">
            <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2.25} />
            {tc("call")}
            <span className="tabular font-sans normal-case tracking-normal">{siteConfig.phone.display}</span>
          </Btn>
        </div>
      </div>
    </section>
  );
}
