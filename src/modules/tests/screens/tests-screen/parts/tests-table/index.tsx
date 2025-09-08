import { ReactTable } from "@/modules/components/react-table";
import * as React from "react";
import { useTestsTable } from "./hooks/use-tests-table";
import { Test } from "@/lib/api/generated/model";

interface TestsTableProps {
  data: Test[];
  onEditTest?: (test: Test) => void;
  onDeleteTest?: (test: Test) => void;
}

export function TestsTable({
  data,
  onEditTest,
  onDeleteTest,
}: TestsTableProps) {
  const table = useTestsTable({
    data,
    onEditTest,
    onDeleteTest,
  });

  return <ReactTable table={table} />;
}
