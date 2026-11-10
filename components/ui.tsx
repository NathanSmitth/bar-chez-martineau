import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Buttons ─────────────────────────────────────────────────────────────────
// Gold fills sit on dark sections; oxblood fills sit on cream (gold on cream
// is only 2:1, so it never carries a button there).
const variants = {
  gold: "bg-gold text-oxblood-deep hover:bg-gold-light",
  oxblood: "bg-oxblood text-cream hover:bg-oxblood-deep",
  "outline-light": "border border-cream/70 text-cream hover:border-gold hover:text-gold",
  "outline-dark": "border border-oxblood/60 text-oxblood hover:border-oxblood hover:bg-oxblood/5",
} as const;

export function Btn({
  variant = "gold",
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants; children: ReactNode }) {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 font-heading text-[0.95rem] font-bold uppercase tracking-[0.08em] transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-hover)] active:scale-[0.98]",
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  );
}

// ── "[À CONFIRMER]" placeholder marker ──────────────────────────────────────
// Deliberately loud so nothing unverified ships unnoticed.
export function Tbc({
  children,
  tone = "light",
  caps = true,
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  caps?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border border-dashed px-2 py-0.5 font-sans font-medium",
        caps ? "text-[0.8125rem] uppercase tracking-[0.06em]" : "text-[0.95rem] italic",
        tone === "light" ? "border-amber bg-amber/10 text-amber-ink" : "border-gold/80 bg-oxblood-ink/40 text-cream",
        className
      )}
    >
      [{children}]
    </span>
  );
}

// ── Section header: "DEPUIS 1889" eyebrow between gold rules + Cinzel title ─
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark" | "deep";
  align?: "center" | "left";
}) {
  // On oxblood, gold is 3.7:1 — fine for the large h2, too low for the small
  // eyebrow, so the eyebrow goes cream there. On the deeper burgundy gold passes.
  const eyebrowColor = tone === "light" ? "text-oxblood" : tone === "deep" ? "text-gold" : "text-cream";
  const titleColor = tone === "light" ? "text-oxblood" : "text-gold";
  const leadColor = tone === "light" ? "text-walnut" : "text-cream/90";

  return (
    <div className={cn("mb-10 sm:mb-14", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl")}>
      <p
        className={cn(
          "flex items-center gap-3 font-heading text-[0.8rem] font-bold uppercase tracking-[0.28em]",
          eyebrowColor,
          align === "center" && "justify-center"
        )}
      >
        <span aria-hidden className="h-px w-8 bg-gold" />
        {eyebrow}
        <span aria-hidden className={cn("h-px w-8 bg-gold", align === "left" && "hidden")} />
      </p>
      <h2 id={id} className={cn("mt-4 text-[1.875rem] sm:text-[2.5rem]", titleColor)}>
        {title}
      </h2>
      {lead && <p className={cn("mt-4 text-lg", leadColor)}>{lead}</p>}
    </div>
  );
}

// ── Stars ───────────────────────────────────────────────────────────────────
// Decorative (the number next to them carries the meaning). Partial last star.
export function Stars({ value, id, className }: { value: number; id: string; className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} viewBox="0 0 24 24" className="size-[1em]">
            <defs>
              <linearGradient id={`${id}-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${id}-${i})`}
              d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z"
            />
          </svg>
        );
      })}
    </span>
  );
}

// 8-ball — lucide has no pool icon
export function PoolBallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="11" r="4.25" />
      <path d="M12 8.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 1 0 0-2.2ZM12 10.8a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 1 0 0-2.6Z" strokeWidth="1.2" />
    </svg>
  );
}
