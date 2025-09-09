import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("SIGN_UP");

export { SignUpScreen as default } from "@/modules/auth/screens/sign-up";
