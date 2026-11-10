"use client";

import { useEffect, useRef, useState } from "react";

// Google Maps iframe, mounted only when it nears the viewport: keeps Google's
// ~1 MB of map JS and third-party cookies off the initial page load.
export default function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full min-h-[240px] w-full">
      {show && (
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: 240 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}
