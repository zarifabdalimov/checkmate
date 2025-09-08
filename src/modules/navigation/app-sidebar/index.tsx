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
import { BookOpen, FileText, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getNavigationItems = (t: ReturnType<typeof useTranslations>) => [
  {
    title: t("navigation.students"),
    url: "/dashboard/students",
    icon: Users,
  },
  {
    title: t("navigation.groups"),
    url: "/dashboard/groups",
    icon: BookOpen,
  },
  {
    title: t("navigation.tests"),
    url: "/dashboard/tests",
    icon: FileText,
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
