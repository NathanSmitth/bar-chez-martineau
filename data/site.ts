// ─────────────────────────────────────────────────────────────────────────────
// Bar Chez Martineau — single source of truth for business data.
// NAP (name, address, phone) must match the Google Business Profile exactly.
//
// Anything marked TODO / null is NOT verified yet. Placeholders render as
// visible "[À CONFIRMER]" slots on the site and are left out of the JSON-LD.
// ─────────────────────────────────────────────────────────────────────────────

const mapsQuery = encodeURIComponent("Bar Chez Martineau, 231 Rue Commerciale, Maniwaki, QC J9E 1P3");

export const siteConfig = {
  name: "Bar Chez Martineau",
  nickname: "Marty's",
  founded: 1889,
  // TODO: confirm domain before launch
  url: "https://barchezmartineau.ca",

  phone: {
    display: "(819) 449-3600",
    href: "tel:+18194493600",
    e164: "+1-819-449-3600",
  },

  address: {
    street: "231 Rue Commerciale",
    locality: "Maniwaki",
    region: "QC",
    postalCode: "J9E 1P3",
    country: "CA",
    full: "231 Rue Commerciale, Maniwaki, QC J9E 1P3",
  },

  // OpenStreetMap geocode of 231 Rue Commerciale — verify against the GBP pin.
  geo: { latitude: 46.3749918, longitude: -75.9767537 },

  maps: {
    directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    // TODO: swap for the exact Google Business Profile share link (maps.app.goo.gl/…)
    listing: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    embed: `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`,
  },

  rating: { value: 4.4, count: 94 },

  // Shown as "$$" in schema to match Google; visitors see "$10–20 per person".
  priceRange: "$$",
  pricePerPerson: { min: 10, max: 20 },

  payment: { cashOnly: true, atmOnSite: true, accepted: ["Cash"] },

  // TODO: hours are not on Google — get them from the owner.
  // While false, the site shows "[HEURES À CONFIRMER]" and the JSON-LD omits hours.
  hoursConfirmed: false,
  hours: [] as { day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"; open: string; close: string }[],

  // TODO: real profile URLs. null = shows a "[À CONFIRMER]" slot in the footer.
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
  },

  // Owner's logo (round badge, transparent corners). Set available: false to
  // fall back to the typographic badge in components/LogoBadge.tsx.
  logo: { src: "/images/logo.png", width: 409, height: 411, available: true },

  // Optional events block — hidden until there's something real to list.
  events: {
    enabled: false,
    items: [] as { date: string; fr: string; en: string }[],
  },

  agency: { name: "Aurentis", url: "https://aurentis.ca" },
} as const;

export type SiteConfig = typeof siteConfig;
