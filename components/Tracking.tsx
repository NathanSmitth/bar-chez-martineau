"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";

// One delegated listener tracks every lead action site-wide:
//   call_click        — any tel: link (the #1 local conversion metric)
//   directions_click  — Google Maps directions links
//   facebook_click    — outbound social
// Tag links with data-track="call|directions|facebook" and data-track-location.
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a");
      if (!link) return;
      const kind =
        link.dataset.track ?? (link.href.startsWith("tel:") ? "call" : undefined);
      if (!kind) return;
      track(`${kind}_click`, {
        location: link.dataset.trackLocation ?? "unknown",
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <Analytics />;
}
