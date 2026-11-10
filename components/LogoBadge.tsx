import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The round "CHEZ MARTINEAU — DEPUIS 1889" badge.
 *
 * Uses the owner's /public/logo.png once `siteConfig.logo.available` is true.
 * Until then it renders a typographic stand-in with the same text and double
 * gold ring, so the layout and signature are already in place.
 */
export default function LogoBadge({
  className,
  priority = false,
  decorative = false,
  label = "Chez Martineau — depuis 1889",
  id = "badge",
  sizes = "176px",
}: {
  className?: string;
  priority?: boolean;
  /** true when a parent link/heading already names it */
  decorative?: boolean;
  label?: string;
  /** unique per instance — the SVG path id must not repeat on the page */
  id?: string;
  /** rendered width, for next/image srcset selection */
  sizes?: string;
}) {
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": label };

  if (siteConfig.logo.available) {
    return (
      <Image
        src={siteConfig.logo.src}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        alt={decorative ? "" : label}
        priority={priority}
        className={cn("h-auto shrink-0", className)}
        sizes={sizes}
      />
    );
  }

  // Top text runs clockwise over the top arc (r=74); bottom text runs
  // counter-clockwise under the bottom arc (r=86, baseline on the outside) so both read upright.
  return (
    <svg viewBox="0 0 200 200" className={cn("shrink-0", className)} {...a11y}>
      <defs>
        <path id={`${id}-top`} d="M26,100 a74,74 0 0,1 148,0" />
        <path id={`${id}-bottom`} d="M14,100 a86,86 0 0,0 172,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="var(--color-oxblood-deep)" />
      {/* outer double ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="89" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
      {/* inner double ring */}
      <circle cx="100" cy="100" r="59" fill="var(--color-oxblood)" stroke="var(--color-gold)" strokeWidth="1" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="var(--color-gold)" strokeWidth="2.5" />
      <g fill="var(--color-gold)" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, letterSpacing: 2.5 }}>
        <text textAnchor="middle">
          <textPath href={`#${id}-top`} startOffset="50%">
            CHEZ MARTINEAU
          </textPath>
        </text>
        <text textAnchor="middle">
          <textPath href={`#${id}-bottom`} startOffset="50%">
            DEPUIS 1889
          </textPath>
        </text>
      </g>
      {/* separators at 3 and 9 o'clock */}
      <circle cx="20" cy="100" r="2.5" fill="var(--color-gold)" />
      <circle cx="180" cy="100" r="2.5" fill="var(--color-gold)" />
      <text
        x="100"
        y="98"
        textAnchor="middle"
        fill="var(--color-cream)"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 40, letterSpacing: 1 }}
      >
        CM
      </text>
      <line x1="72" y1="110" x2="128" y2="110" stroke="var(--color-gold)" strokeWidth="1" />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="var(--color-gold)"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, letterSpacing: 3 }}
      >
        1889
      </text>
    </svg>
  );
}
