import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";

const DAY_SCHEMA = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} as const;

// BarOrPub (a FoodEstablishment subtype). Only verified data goes in here:
// hours stay out until confirmed; socials only once real URLs exist.
export default async function JsonLd() {
  const [t, locale] = await Promise.all([getTranslations("metadata"), getLocale()]);
  const { url, address, geo, rating } = siteConfig;
  const sameAs = [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "@id": `${url}/#bar`,
    name: siteConfig.name,
    alternateName: [siteConfig.nickname, "Chez Martineau"],
    description: t("description"),
    url: `${url}/${locale}`,
    telephone: siteConfig.phone.e164,
    image: [`${url}/images/hero.jpg`],
    ...(siteConfig.logo.available ? { logo: `${url}${siteConfig.logo.src}` } : {}),
    priceRange: siteConfig.priceRange,
    paymentAccepted: siteConfig.payment.accepted.join(", "),
    currenciesAccepted: "CAD",
    foundingDate: String(siteConfig.founded),
    hasMap: siteConfig.maps.listing,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
    areaServed: { "@type": "City", name: "Maniwaki" },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pool table", value: true },
      { "@type": "LocationFeatureSpecification", name: "ATM on site", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    ...(siteConfig.hoursConfirmed
      ? {
          openingHoursSpecification: siteConfig.hours.map((d) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${DAY_SCHEMA[d.day]}`,
            opens: d.open,
            closes: d.close,
          })),
        }
      : {}),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
