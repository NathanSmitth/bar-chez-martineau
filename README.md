# Bar Chez Martineau — site

One-page bilingual site (FR default at `/fr`, EN at `/en`) for Bar Chez Martineau, 231 Rue Commerciale, Maniwaki.
Next.js 16 (App Router) · Tailwind v4 · next-intl · Vercel Analytics.

```bash
npm install
npm run dev            # http://localhost:3000 → redirects to /fr
npm run build && npm start
npm run placeholders   # regenerate the grey photo slots
```

## Where things live
- `data/site.ts` — NAP, rating, geo, maps links, socials, hours flag, logo flag, events toggle
- `data/content.ts` — menu items, review excerpts, photo list (+ alt text FR/EN)
- `messages/fr.json`, `messages/en.json` — all copy
- `components/` — one file per section; `ui.tsx` holds buttons, the `[À CONFIRMER]` marker, section header, stars

## Before launch — still to confirm with the owner
Every unverified item renders as a visible dashed `[À CONFIRMER]` marker and stays out of the JSON-LD.

| Item | Where to update |
|---|---|
| Hours | `data/site.ts` → fill `hours`, set `hoursConfirmed: true` (adds them to schema) |
| Menu items + prices | `data/content.ts` → `menu` (`name: null` / `price: null` = placeholder) |
| Story copy + middle timeline milestone | `messages/*.json` → `story` (remove the `draft` marker in `Story.tsx` once approved) |
| Logo | drop `public/logo.png`, set `logo.available: true` (typographic badge stands in until then) |
| Photos | replace files in `public/images/` — same name & aspect ratio (see `scripts/make-placeholders.py`) |
| Facebook / Instagram | `data/site.ts` → `social` |
| Google listing link | `data/site.ts` → `maps.listing` (swap search URL for the GBP share link) |
| Domain | `data/site.ts` → `url` (assumed `barchezmartineau.ca`) |
| Events (optional) | `data/site.ts` → `events.enabled` + `items` |

## Tracking (Vercel Analytics custom events)
`call_click`, `directions_click`, `reviews_click`, `facebook_click`, `instagram_click`, each with a `location` property (header, hero, sticky-bar, menu, visit, footer…).

## Notes
- Images are served as WebP only — AVIF encoding hung the local image optimizer.
- Paper grain is a pre-rendered PNG tile (`public/images/grain.png`); an SVG `feTurbulence` version cost ~7s of main-thread paint on throttled mobile.
