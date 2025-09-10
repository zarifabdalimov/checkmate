import { useGetApiV1TestsResults } from "@/lib/api/generated/aPIForCheckmateApp";
import { Test } from "@/lib/api/generated/model";
import { ResultsTable } from "./parts/results-table";

interface TestResultsTabProps {
  test: Test;
}

export function TestResultsTab({ test }: TestResultsTabProps) {
  const resultsQuery = useGetApiV1TestsResults({ test_id_filter: test.id });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Test Results</h2>
      <ResultsTable
        data={resultsQuery.data ?? []}
        isLoading={resultsQuery.isLoading}
        testId={test.id}
      />
    </div>
  );
}
