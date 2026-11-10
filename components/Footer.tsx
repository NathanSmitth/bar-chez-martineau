import { getTranslations } from "next-intl/server";
import { Facebook, Instagram } from "lucide-react";
import { siteConfig } from "@/data/site";
import LogoBadge from "./LogoBadge";
import { SECTION_IDS } from "./Navbar";
import { Tbc } from "./ui";

export default async function Footer() {
  const [t, tNav, tc] = await Promise.all([getTranslations("footer"), getTranslations("nav"), getTranslations("common")]);
  const { address, phone, social, agency } = siteConfig;
  const year = new Date().getFullYear();

  const socials = [
    { key: "facebook", url: social.facebook, Icon: Facebook, label: "Facebook", tbc: t("facebookTbc") },
    { key: "instagram", url: social.instagram, Icon: Instagram, label: "Instagram", tbc: t("instagramTbc") },
  ];

  return (
    <footer className="on-dark border-t-4 border-double border-gold bg-oxblood-deep px-4 pb-28 pt-16 text-cream sm:px-6 lg:pb-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <LogoBadge id="ftr-badge" label={`${siteConfig.name} — ${tc("since")}`} sizes="112px" className="size-28" />
          <p className="mt-5 font-heading text-[1.15rem] font-bold uppercase tracking-[0.12em] text-gold">{siteConfig.name}</p>
          <p className="mt-1 text-cream/90">{t("tagline")}</p>
        </div>

        {/* NAP — must match Google Business Profile character-for-character */}
        <div className="space-y-4">
          <address className="not-italic">
            {address.street}
            <br />
            {address.locality}, {address.region} {address.postalCode}
          </address>
          <a
            href={phone.href}
            data-track="call"
            data-track-location="footer"
            className="tabular inline-flex min-h-11 items-center font-heading text-[1.25rem] font-bold tracking-[0.04em] text-gold hover:text-gold-light"
          >
            {phone.display}
          </a>
          <p>
            <Tbc tone="dark">{tc("hoursTbc")}</Tbc>
          </p>
          <p className="text-cream/90">{tc("cashOnly")}</p>
        </div>

        <div className="space-y-6">
          <ul className="grid grid-cols-2 gap-x-4">
            {(Object.keys(SECTION_IDS) as (keyof typeof SECTION_IDS)[]).map((k) => (
              <li key={k}>
                <a href={`#${SECTION_IDS[k]}`} className="inline-flex min-h-11 items-center text-cream/90 underline-offset-4 hover:text-gold hover:underline">
                  {tNav(k)}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <p className="font-heading text-[0.8rem] font-bold uppercase tracking-[0.18em] text-gold">{t("social")}</p>
            <ul className="mt-3 flex flex-col items-start gap-2">
              {socials.map(({ key, url, Icon, label, tbc }) => (
                <li key={key}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track={key}
                      data-track-location="footer"
                      className="inline-flex min-h-11 items-center gap-2 text-cream/90 hover:text-gold"
                    >
                      <Icon aria-hidden className="size-5" /> {label}
                      <span className="sr-only">{tc("newTab")}</span>
                    </a>
                  ) : (
                    <Tbc tone="dark">{tbc}</Tbc>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-gold/30 pt-6 text-[0.9rem] text-cream/85 sm:flex-row sm:justify-between">
        <p>{t("rights", { year })}</p>
        <p>
          {t("credit")}{" "}
          <a href={agency.url} target="_blank" rel="noopener" className="font-medium text-cream underline decoration-gold underline-offset-4 hover:text-gold">
            {agency.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
