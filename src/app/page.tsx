import { METADATA_CONSTANTS } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  openGraph: {
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  },
  twitter: {
    title: METADATA_CONSTANTS.BRAND_FULL,
    description: METADATA_CONSTANTS.LANDING_DESCRIPTION,
  },
};

export { LandingScreen as default } from "@/modules/landing/screen/landing-screen";
