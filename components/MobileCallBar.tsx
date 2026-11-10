import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

// Fixed bottom call bar on mobile — the highest-converting element on a local site.
export default async function MobileCallBar() {
  const t = await getTranslations("callBar");

  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-gold/50 bg-oxblood-deep/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
      <a
        href={siteConfig.phone.href}
        data-track="call"
        data-track-location="sticky-bar"
        className="flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] bg-gold px-4 font-heading text-[1.05rem] font-bold uppercase tracking-[0.08em] text-oxblood-deep active:scale-[0.98]"
      >
        <Phone aria-hidden className="size-5" strokeWidth={2.25} />
        <span>{t("label")}</span>
        <span className="tabular font-sans normal-case tracking-normal">{siteConfig.phone.display}</span>
      </a>
    </div>
  );
}
