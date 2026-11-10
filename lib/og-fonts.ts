import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static Cinzel / Lora (latin, incl. French accents) for next/og — Satori needs woff/ttf, not woff2.
export async function ogFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [cinzel, lora, loraItalic] = await Promise.all([
    readFile(join(dir, "cinzel-latin-700-normal.woff")),
    readFile(join(dir, "lora-latin-500-normal.woff")),
    readFile(join(dir, "lora-latin-400-italic.woff")),
  ]);
  return [
    { name: "Cinzel", data: cinzel, weight: 700 as const, style: "normal" as const },
    { name: "Lora", data: lora, weight: 500 as const, style: "normal" as const },
    { name: "Lora", data: loraItalic, weight: 400 as const, style: "italic" as const },
  ];
}
