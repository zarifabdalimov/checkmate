import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de", "cs"],

  // Used when no locale matches
  defaultLocale: "en",

  // Use always mode temporarily to test
  localePrefix: "always",
});

