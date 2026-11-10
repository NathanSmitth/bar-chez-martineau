"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import LocaleSwitcher from "./LocaleSwitcher";
import LogoBadge from "./LogoBadge";

type Props = {
  locale: string;
  links: { href: string; label: string }[];
  labels: { mainNav: string; openMenu: string; closeMenu: string; call: string; language: string };
};

export default function NavbarClient({ locale, links, labels }: Props) {
  const [open, setOpen] = useState(false);

  // Lock scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-gold/40 bg-oxblood-deep text-cream">
      <nav aria-label={labels.mainNav} className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href={`/${locale}`} className="flex min-h-11 shrink-0 items-center gap-3">
          <LogoBadge id="hdr-badge" decorative priority sizes="48px" className="size-12" />
          <span className="sr-only font-heading text-[1.05rem] font-bold uppercase tracking-[0.14em] text-gold sm:not-sr-only">
            Chez Martineau
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center px-3 font-heading text-[0.85rem] font-bold uppercase tracking-[0.12em] text-cream/90 transition-colors duration-200 hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-3">
          <LocaleSwitcher locale={locale} label={labels.language} />
          <a
            href={siteConfig.phone.href}
            data-track="call"
            data-track-location="header"
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-gold px-3.5 font-heading text-[0.85rem] font-bold uppercase tracking-[0.08em] text-oxblood-deep transition-colors duration-200 hover:bg-gold-light active:scale-[0.98]"
          >
            <Phone aria-hidden className="size-4" strokeWidth={2.25} />
            <span>{labels.call}</span>
            <span className="tabular sr-only font-sans normal-case tracking-normal xl:not-sr-only">{siteConfig.phone.display}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="inline-flex size-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`block h-0.5 w-5 bg-cream transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-cream transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-cream transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — full height under the bar */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-oxblood-deep transition-[opacity,visibility,transform] duration-300 ease-[var(--ease-out-soft)] lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-4 pb-10 pt-4 sm:px-6">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-gold/30">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center font-heading text-2xl font-bold uppercase tracking-[0.1em] text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.phone.href}
            data-track="call"
            data-track-location="mobile-menu"
            className="mt-auto inline-flex min-h-14 items-center justify-center gap-2 rounded-[3px] bg-gold px-6 font-heading text-lg font-bold tracking-[0.06em] text-oxblood-deep"
          >
            <Phone aria-hidden className="size-5" />
            <span className="tabular">{siteConfig.phone.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
