import { getTranslations } from "next-intl/server";
import { Banknote, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";
import MapEmbed from "./MapEmbed";
import { Btn, SectionHeader, Tbc } from "./ui";
import { SECTION_IDS } from "./Navbar";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  // dt/dd must be direct children of the group <div>, so the icon lives inside the dt.
  return (
    <div className="relative border-b border-walnut/15 py-5 pl-14 first:pt-0 last:border-0 last:pb-0">
      <dt className="font-heading text-[0.8rem] font-bold uppercase tracking-[0.18em] text-oxblood">
        <span aria-hidden className="absolute left-0 inline-flex size-10 -translate-y-1 items-center justify-center rounded-full border border-gold text-oxblood">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1 min-w-0 text-walnut">{children}</dd>
    </div>
  );
}

export default async function Visit() {
  const [t, tc] = await Promise.all([getTranslations("visit"), getTranslations("common")]);
  const { address, phone, maps } = siteConfig;

  return (
    <section id={SECTION_IDS.visit} aria-labelledby="visit-title" className="paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="visit-title" eyebrow={tc("since")} title={t("title")} lead={t("lead")} />

        <div className="grid gap-8 lg:grid-cols-[5fr_6fr] lg:gap-10">
          <div className="ring-double bg-cream/70 p-6 sm:p-8">
            <dl>
              <Row icon={<MapPin className="size-5" />} label={t("address")}>
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                </address>
              </Row>
              <Row icon={<Phone className="size-5" />} label={t("phone")}>
                <a
                  href={phone.href}
                  data-track="call"
                  data-track-location="visit"
                  className="tabular inline-flex min-h-11 items-center font-heading text-[1.6rem] font-bold tracking-[0.03em] text-oxblood underline decoration-gold decoration-2 underline-offset-[6px] hover:text-oxblood-deep"
                >
                  {phone.display}
                </a>
              </Row>
              <Row icon={<Clock className="size-5" />} label={t("hours")}>
                <Tbc>{tc("hoursTbc")}</Tbc>
              </Row>
              <Row icon={<Banknote className="size-5" />} label={t("payment")}>
                {t("paymentBody")}
              </Row>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Btn href={phone.href} data-track="call" data-track-location="visit-cta" variant="oxblood" className="sm:flex-1">
                <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2.25} />
                {tc("call")}
              </Btn>
              <Btn
                href={maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions"
                data-track-location="visit"
                variant="outline-dark"
                className="sm:flex-1"
              >
                <Navigation aria-hidden className="size-4" />
                {tc("directions")}
                <span className="sr-only">{tc("newTab")}</span>
              </Btn>
            </div>
          </div>

          <div className="ring-double h-[340px] overflow-hidden bg-cream-deep p-1.5 lg:h-auto lg:min-h-[420px]">
            <MapEmbed src={maps.embed} title={t("mapTitle")} />
          </div>
        </div>

        <p className="mt-12 text-center font-heading text-[1.25rem] font-bold uppercase tracking-[0.08em] text-oxblood sm:text-[1.5rem]">
          {t("cta")}{" "}
          <a href={phone.href} data-track="call" data-track-location="visit-final" className="tabular whitespace-nowrap underline decoration-gold decoration-2 underline-offset-[6px]">
            {phone.display}
          </a>
        </p>
      </div>
    </section>
  );
}
