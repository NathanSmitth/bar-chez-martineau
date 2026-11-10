import { getLocale, getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Btn } from "@/components/ui";

// A dead end is a lost customer: phone + a way home.
export default async function NotFound() {
  const [t, tc, locale] = await Promise.all([getTranslations("notFound"), getTranslations("common"), getLocale()]);

  return (
    <section className="paper flex min-h-[70svh] items-center px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <title>{t("metaTitle")}</title>
        <meta name="robots" content="noindex" />
        <p className="font-heading text-[0.8rem] font-bold uppercase tracking-[0.28em] text-oxblood">404 · {tc("since")}</p>
        <h1 className="mt-4 text-[2rem] text-oxblood sm:text-[2.75rem]">{t("heading")}</h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg">{t("body")}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href={siteConfig.phone.href} data-track="call" data-track-location="404" variant="oxblood">
            <Phone aria-hidden className="size-[1.1rem]" />
            <span className="tabular font-sans normal-case tracking-normal">{siteConfig.phone.display}</span>
          </Btn>
          <Btn href={`/${locale}`} variant="outline-dark">
            {t("home")}
          </Btn>
        </div>
      </div>
    </section>
  );
}
