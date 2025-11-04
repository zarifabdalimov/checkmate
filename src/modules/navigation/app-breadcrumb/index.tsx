"use client";

import { Link } from "@/i18n/navigation";
import { useGetApiV1TestsTestId } from "@/lib/api/generated/aPIForCheckmateApp";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/modules/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const params = useParams<{ testId?: string }>();
  const t = useTranslations("Dashboard.pages");

  const testQuery = useGetApiV1TestsTestId(params.testId ?? "", {
    query: {
      enabled: !!params.testId,
    },
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.startsWith("/dashboard/tests") && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/tests">{t("tests")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {params.testId && testQuery.data && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{testQuery.data.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}
        {pathname.startsWith("/dashboard/groups") && !params.testId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("groups")}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {pathname.startsWith("/dashboard/students") && !params.testId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("students")}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
