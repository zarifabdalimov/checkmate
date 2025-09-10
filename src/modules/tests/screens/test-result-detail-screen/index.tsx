'use client';

import { useParams } from "next/navigation";
import { Card } from "@/modules/ui/card";

export function TestResultDetailScreen() {
  const { testId, resultId } = useParams<{
    testId: string;
    resultId: string;
  }>();

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Test Result Details</h1>
        <p className="text-muted-foreground">
          Test ID: {testId}, Result ID: {resultId}
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Student Information</h2>
            <p className="text-muted-foreground">Student details will go here...</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Test Results</h2>
            <p className="text-muted-foreground">Test results details will go here...</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Answer Analysis</h2>
            <p className="text-muted-foreground">Detailed answer analysis will go here...</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
