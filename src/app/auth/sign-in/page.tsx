import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("SIGN_IN");

export { SignInScreen as default } from "@/modules/auth/screens/sign-in";
