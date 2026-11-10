import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory confuses root detection — pin it.
  turbopack: { root: path.join(__dirname) },
  images: {
    // WebP only: AVIF encoding hung the local optimizer (requests stuck pending).
    formats: ["image/webp"],
    // 50 = hero (sits under an 80% overlay, so artifacts never show)
    qualities: [50, 75],
  },
};

export default withNextIntl(nextConfig);
