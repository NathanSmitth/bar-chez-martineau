import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import frMessages from "../messages/fr.json";
import enMessages from "../messages/en.json";

const messageMap = { fr: frMessages, en: enMessages } as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: "America/Toronto",
    messages: messageMap[locale],
  };
});
