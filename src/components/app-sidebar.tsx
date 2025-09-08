"use client";

import { SignOutButton } from "@/modules/dashboard/screens/home-screen/parts/sign-out-button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/modules/ui/sidebar";
import { BarChart3, BookOpen, FileText, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const getNavigationItems = (t: ReturnType<typeof useTranslations>) => [
  {
    title: t("navigation.students"),
    url: "/dashboard/students",
    icon: Users,
  },
  {
    title: t("navigation.classes"),
    url: "/dashboard/classes",
    icon: BookOpen,
  },
  {
    title: t("navigation.testBuilder"),
    url: "/dashboard/test-builder",
    icon: FileText,
  },
  {
    title: t("navigation.testResults"),
    url: "/dashboard/test-results",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.sidebar");
  const items = getNavigationItems(t);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{t("brand.title")}</span>
            <span className="truncate text-xs text-muted-foreground">
              {t("brand.subtitle")}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("navigation.title")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
