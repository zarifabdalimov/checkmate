import { createPageMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata("DASHBOARD");

export default function DashboardPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard Home</h1>
    </div>
  );
}
