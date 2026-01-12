"use client";

import { Button } from "@/modules/ui/button";
import { Edit2, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { TestPDFDownload } from "@/modules/pdf";
import type { Test } from "@/hooks/use-create-demo-test";

interface TestHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onClose?: () => void;
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
}

export function TestHeader({
  isEditing,
  onToggleEdit,
  onClose,
  test,
  questions,
  testName,
}: TestHeaderProps) {
  const t = useTranslations("ShowcasePage.preview");

  return (
    <div className="flex justify-between items-start print:hidden">
      <div className="flex gap-2">
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={onToggleEdit}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              {t("saveEdits")}
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              {t("editTest")}
            </>
          )}
        </Button>
        <TestPDFDownload
          test={test}
          questions={questions}
          testName={testName}
          translations={{
            subject: t("subject"),
            topic: t("topic"),
            questions: t("questions"),
            timeLimit: t("timeLimit"),
            minutes: t("minutes"),
          }}
          buttonText={t("exportPdf")}
        />
      </div>
      {onClose && (
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
