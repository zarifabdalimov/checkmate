import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("TESTS");

export { TestsScreen as default } from "@/modules/tests/screens/tests-screen";
