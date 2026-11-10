import "@/app/globals.css";
import Link from "next/link";
import { siteConfig } from "@/data/site";

// Fallback for paths the locale proxy never sees (e.g. /foo.php). Bilingual,
// self-contained, with the phone number so it's never a dead end.
export default function RootNotFound() {
  return (
    <html lang="fr-CA">
      <body className="paper flex min-h-screen items-center justify-center px-4 text-center">
        <main>
          <p className="text-sm uppercase tracking-[0.2em] text-oxblood">404</p>
          <h1 className="mt-4 text-3xl text-oxblood">Page introuvable · Page not found</h1>
          <p className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/fr" className="underline underline-offset-4">Accueil</Link>
            <Link href="/en" className="underline underline-offset-4">Home</Link>
            <a href={siteConfig.phone.href} className="font-medium underline underline-offset-4">
              {siteConfig.phone.display}
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
