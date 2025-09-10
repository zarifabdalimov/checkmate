"use client";

import { useGetApiV1TestsTestId } from "@/lib/api/generated/aPIForCheckmateApp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import { useParams } from "next/navigation";
import { EditTestTab } from "./parts/edit-test-tab";
import { TestResultsTab } from "./parts/test-results-tab";
import { UploadResultsTab } from "./parts/upload-results-tab";
import { Status } from "@/modules/components/status";

export function TestDetailScreen() {
  const params = useParams<{ testId: string }>();
  const testQuery = useGetApiV1TestsTestId(params.testId);

  const handleSave = () => {
    // console.log("Saving test data:", data);
    // // TODO: Implement save functionality
  };

  if (testQuery.isLoading) {
    return <Status isLoading />;
  }

  if (testQuery.isError) {
    return (
      <Status
        icon="alert-circle"
        title="Failed to load test"
        description="There was an error loading your test. Please try again."
      />
    );
  }

  return (
    <Tabs defaultValue="edit-test" className="w-full">
      <TabsList>
        <TabsTrigger value="edit-test">Edit Test</TabsTrigger>
        <TabsTrigger value="test-results">Test Results</TabsTrigger>
        <TabsTrigger value="upload-results">Upload Results</TabsTrigger>
      </TabsList>
      <TabsContent value="edit-test">
        <EditTestTab test={testQuery.data} onSave={handleSave} />
      </TabsContent>
      <TabsContent value="test-results">
        <TestResultsTab />
      </TabsContent>
      <TabsContent value="upload-results">
        <UploadResultsTab />
      </TabsContent>
    </Tabs>
  );
}
