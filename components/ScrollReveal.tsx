"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Subtle fade/slide-up for elements marked data-reveal. Only elements that
// start below the fold are hidden (so no flash, nothing hidden without JS),
// and nothing moves at all for visitors who prefer reduced motion.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='shown'])"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.dataset.reveal = "pending";
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
