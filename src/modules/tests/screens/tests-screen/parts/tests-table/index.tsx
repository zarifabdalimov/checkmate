import { ReactTable } from "@/modules/components/react-table";
import * as React from "react";
import { useTestsTable } from "./hooks/use-tests-table";
import { Test } from "@/lib/api/generated/model";

interface TestsTableProps {
  data: Test[];
  onDeleteTest?: (test: Test) => void;
}

export function TestsTable({ data, onDeleteTest }: TestsTableProps) {
  const table = useTestsTable({
    data,
    onDeleteTest,
  });

  return <ReactTable table={table} />;
}
