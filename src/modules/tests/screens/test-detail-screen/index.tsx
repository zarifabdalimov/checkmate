"use client";

import { useGetApiV1TestsTestId } from "@/lib/api/generated/aPIForCheckmateApp";
import { Status } from "@/modules/components/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import * as React from "react";
import { EditTestTab } from "./parts/edit-test-tab";
import { TestResultsTab } from "./parts/test-results-tab";
import { UploadResultsTab } from "./parts/upload-results-tab";

export function TestDetailScreen() {
  const params = useParams<{ testId: string }>();
  const testQuery = useGetApiV1TestsTestId(params.testId, {
    query: {
      refetchInterval: (query) => {
        return query.state.data?.status === "draft" ? 3000 : false;
      },
    },
  });
  const t = useTranslations("Dashboard.tests.testDetail");
  const test = testQuery.data;

  if (testQuery.isLoading) {
    return <Status isLoading />;
  }

  if (testQuery.isError || !test) {
    return (
      <Status
        icon="alert-circle"
        title={t("errors.loadFailed.title")}
        description={t("errors.loadFailed.description")}
      />
    );
  }

  if (test.status === "draft") {
    return (
      <Status
        animatedIcon
        icon="brain-circuit"
        title={t("draft.title")}
        description={t("draft.description")}
      />
    );
  }

  if (test.status === "generated") {
    return <EditTestTab test={testQuery.data} />;
  }

  return (
    <Tabs defaultValue="upload-results" className="w-full">
      <TabsList>
        <TabsTrigger value="upload-results">
          {t("tabs.uploadResults")}
        </TabsTrigger>
        <TabsTrigger value="test-results">{t("tabs.testResults")}</TabsTrigger>
      </TabsList>
      <TabsContent value="test-results">
        <TestResultsTab />
      </TabsContent>
      <TabsContent value="upload-results">
        <UploadResultsTab test={testQuery.data} />
      </TabsContent>
    </Tabs>
  );
}
