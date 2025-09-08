"use client";

import { AppSidebar } from "@/modules/navigation/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/modules/ui/sidebar";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

function getPageNameKey(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return "home";
  }
  if (pathname.startsWith("/dashboard/")) {
    const segment = pathname.split("/")[2];
    switch (segment) {
      case "students":
        return "students";
      case "groups":
        return "groups";
      case "tests":
        return "tests";
      default:
        return "home";
    }
  }
  return "home";
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.pages");
  const pageNameKey = getPageNameKey(pathname);
  const pageName = t(pageNameKey);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <span className="font-medium text-sm">{pageName}</span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
