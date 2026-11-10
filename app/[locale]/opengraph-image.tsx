import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bar Chez Martineau — Maniwaki, depuis 1889";

const GOLD = "#D4A24C";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 28, background: "#6A1F1A" }}>
        {/* double gold frame, like the logo ring */}
        <div style={{ flex: 1, display: "flex", padding: 8, border: `3px solid ${GOLD}` }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${GOLD}`,
              background: "#8B2A22",
              color: "#F4EFE6",
              fontFamily: "Lora",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", fontFamily: "Cinzel", fontSize: 26, letterSpacing: 10, color: GOLD }}>
              <div style={{ width: 70, height: 1, background: GOLD, marginRight: 24 }} />
              {tc("since").toUpperCase()}
              <div style={{ width: 70, height: 1, background: GOLD, marginLeft: 24 }} />
            </div>
            <div style={{ fontFamily: "Cinzel", fontSize: 92, letterSpacing: 6, color: GOLD, marginTop: 26, lineHeight: 1.05 }}>
              CHEZ MARTINEAU
            </div>
            <div style={{ fontStyle: "italic", fontWeight: 400, fontSize: 38, marginTop: 22 }}>{t("ogTagline")}</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 48, fontSize: 30, fontWeight: 500 }}>
              {`${siteConfig.address.street}, Maniwaki  ·  ${siteConfig.phone.display}`}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
