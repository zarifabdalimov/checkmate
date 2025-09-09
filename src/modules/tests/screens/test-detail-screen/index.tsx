"use client";

import { Test } from "@/lib/api/generated/model";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/ui/tabs";
import { EditTestTab } from "./parts/edit-test-tab";
import { TestResultsTab } from "./parts/test-results-tab";
import { UploadResultsTab } from "./parts/upload-results-tab";

interface TestDetailScreenProps {
  test?: Test;
}

export function TestDetailScreen({ test }: TestDetailScreenProps) {
  const handleSave = () => {
    // console.log("Saving test data:", data);
    // // TODO: Implement save functionality
  };

  return (
    <div>
      <Tabs defaultValue="edit-test" className="w-full">
        <TabsList>
          <TabsTrigger value="edit-test">Edit Test</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
          <TabsTrigger value="upload-results">Upload Results</TabsTrigger>
        </TabsList>
        <TabsContent value="edit-test">
          <EditTestTab test={test} onSave={handleSave} />
        </TabsContent>
        <TabsContent value="test-results">
          <TestResultsTab />
        </TabsContent>
        <TabsContent value="upload-results">
          <UploadResultsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
