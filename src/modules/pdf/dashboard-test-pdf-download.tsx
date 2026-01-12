"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/modules/ui/button";
import { Download } from "lucide-react";
import type { Test } from "@/lib/api/generated/model";
import { DashboardTestDocument } from "./dashboard-test-document";

interface DashboardTestPDFDownloadProps {
  test: Test;
  translations: {
    subject: string;
    difficulty: string;
    questions: string;
    time: string;
    minutes: string;
  };
  buttonText?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function DashboardTestPDFDownload({
  test,
  translations,
  buttonText = "Export PDF",
  variant = "outline",
  size = "default",
}: DashboardTestPDFDownloadProps) {
  const fileName = `${test.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;

  return (
    <PDFDownloadLink
      document={
        <DashboardTestDocument test={test} translations={translations} />
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
