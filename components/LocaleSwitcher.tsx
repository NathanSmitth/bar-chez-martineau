"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const NAMES: Record<string, string> = { fr: "Français", en: "English" };

// FR | EN — real links (crawlable, work without JS). The page reloads in the
// other locale, so <html lang> switches with it.
export default function LocaleSwitcher({ locale, label }: { locale: string; label: string }) {
  const pathname = usePathname();
  const pathFor = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div role="group" aria-label={label} className="inline-flex items-center font-heading text-[0.8rem] font-bold tracking-[0.12em]">
      {routing.locales.map((l, i) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && (
            <span aria-hidden className="text-gold/70">
              |
            </span>
          )}
          <Link
            href={pathFor(l)}
            hrefLang={l === "fr" ? "fr-CA" : "en-CA"}
            lang={l}
            aria-label={`${l.toUpperCase()} — ${NAMES[l]}`}
            aria-current={locale === l ? "true" : undefined}
            scroll={false}
            className={`inline-flex min-h-11 min-w-10 items-center justify-center px-1.5 underline-offset-[6px] transition-colors duration-200 ${
              locale === l ? "text-gold underline decoration-gold decoration-1" : "text-cream/85 hover:text-cream"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
