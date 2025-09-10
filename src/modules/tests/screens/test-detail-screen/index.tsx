"use client";

import { useGetApiV1TestsTestId } from "@/lib/api/generated/aPIForCheckmateApp";
import { Status } from "@/modules/components/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import * as React from "react";
import { EditTestTab } from "./parts/edit-test-tab";
import { TestPreviewTab } from "./parts/test-preview-tab";
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
    <Tabs defaultValue="test-preview" className="max-w-4xl">
      <TabsList className="print:hidden">
        <TabsTrigger value="test-preview">{t("tabs.testPreview")}</TabsTrigger>
        <TabsTrigger value="upload-results">
          {t("tabs.uploadResults")}
        </TabsTrigger>
        <TabsTrigger value="test-results">{t("tabs.testResults")}</TabsTrigger>
      </TabsList>
      <TabsContent value="test-preview">
        <TestPreviewTab test={testQuery.data} />
      </TabsContent>
      <TabsContent value="test-results">
        <TestResultsTab test={testQuery.data} />
      </TabsContent>
      <TabsContent value="upload-results">
        <UploadResultsTab test={testQuery.data} />
      </TabsContent>
    </Tabs>
  );
}
