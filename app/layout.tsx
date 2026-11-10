import type { ReactNode } from "react";

// Root layout — minimal shell. app/[locale]/layout.tsx provides html, body,
// fonts, header and footer for every user-facing route.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
