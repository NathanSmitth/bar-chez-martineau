import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match root and locale-prefixed paths, skip Next.js internals and static files
  matcher: ["/((?!_next|_vercel|api|icon|apple-icon|.*\\..*).*)"],
};
