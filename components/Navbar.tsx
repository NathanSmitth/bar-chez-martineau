import { getLocale, getTranslations } from "next-intl/server";
import NavbarClient from "./NavbarClient";

export const SECTION_IDS = { menu: "menu", story: "histoire", reviews: "avis", visit: "nous-trouver" } as const;

export default async function Navbar() {
  const [t, tHeader, locale] = await Promise.all([getTranslations("nav"), getTranslations("header"), getLocale()]);

  const links = (Object.keys(SECTION_IDS) as (keyof typeof SECTION_IDS)[]).map((key) => ({
    href: `#${SECTION_IDS[key]}`,
    label: t(key),
  }));

  return (
    <NavbarClient
      locale={locale}
      links={links}
      labels={{
        mainNav: tHeader("mainNav"),
        openMenu: tHeader("openMenu"),
        closeMenu: tHeader("closeMenu"),
        call: tHeader("call"),
        language: tHeader("language"),
      }}
    />
  );
}
