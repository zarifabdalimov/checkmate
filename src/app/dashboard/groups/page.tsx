import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("GROUPS");

export { GroupsScreen as default } from "@/modules/groups/screens/groups-screen";
