import { Link } from "@/i18n/navigation";
import type { TestResult } from "@/lib/api/generated/model/testResult";
import { Grade } from "@/modules/components/grade";
import { ReactTable } from "@/modules/components/react-table";
import { Status } from "@/modules/components/status";
import { TableExternalLinkAction } from "@/modules/ui/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface ResultsTableProps {
  data: TestResult[];
  isLoading?: boolean;
  testId: string;
}

export function ResultsTable({ data, isLoading, testId }: ResultsTableProps) {
  const columnHelper = createColumnHelper<TestResult>();

  const columns = [
    columnHelper.accessor("student_name", {
      header: "Student Name",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor(
      (row) => ({
        correct: row.correct_answers || 0,
        total: (row.correct_answers || 0) + (row.wrong_answers || 0),
      }),
      {
        id: "score",
        header: "Score",
        cell: (info) => {
          const { correct, total } = info.getValue();
          return `${correct}/${total}`;
        },
      },
    ),
    columnHelper.accessor(
      (row) => ({
        correct: row.correct_answers || 0,
        total: (row.correct_answers || 0) + (row.wrong_answers || 0),
      }),
      {
        id: "grade",
        header: "Grade",
        cell: (info) => {
          const { correct, total } = info.getValue();
          return <Grade correctCount={correct} totalCount={total} />;
        },
      },
    ),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <Link
          href={`/dashboard/tests/${testId}/results/${info.row.original.id}`}
        >
          <TableExternalLinkAction />
        </Link>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Status isLoading />;
  }

  return <ReactTable table={table} />;
}
