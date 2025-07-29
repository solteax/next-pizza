import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ua", "ru"],

  // Used when no locale matches
  defaultLocale: "en",
})
