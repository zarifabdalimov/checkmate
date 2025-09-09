import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("STUDENTS");

export { StudentsScreen as default } from "@/modules/students/screens/students-screen";
