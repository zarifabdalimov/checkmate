"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/modules/ui/button";
import { Download } from "lucide-react";
import type { Test } from "@/hooks/use-create-demo-test";
import { TestDocument } from "./test-document";

interface TestPDFDownloadProps {
  test: Test;
  questions: Array<{
    question: string;
    options: Array<{
      order: number;
      answer: string;
      correct: boolean;
    }>;
  }>;
  testName: string;
  translations: {
    subject: string;
    topic: string;
    questions: string;
    timeLimit: string;
    minutes: string;
  };
  buttonText?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function TestPDFDownload({
  test,
  questions,
  testName,
  translations,
  buttonText = "Export PDF",
  variant = "outline",
  size = "sm",
}: TestPDFDownloadProps) {
  const fileName = `${testName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;

  return (
    <PDFDownloadLink
      document={
        <TestDocument
          test={test}
          questions={questions}
          testName={testName}
          translations={translations}
        />
      }
      fileName={fileName}
    >
      {({ loading }) => (
        <Button variant={variant} size={size} disabled={loading}>
          <Download className="h-4 w-4" />
          {loading ? "Preparing..." : buttonText}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
