export const NAV_SECTIONS = [
  { id: "why-checkmate", translationKey: "navigation.features" },
  { id: "how-it-works", translationKey: "navigation.howItWorks" },
  { id: "team", translationKey: "navigation.about" },
  { id: "sponsors", translationKey: "navigation.partners" },
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
