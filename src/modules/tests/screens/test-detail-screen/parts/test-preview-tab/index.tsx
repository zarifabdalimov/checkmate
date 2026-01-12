"use client";

import { Test } from "@/lib/api/generated/model";
import { Separator } from "@/modules/ui/separator";
import { DashboardTestPDFDownload } from "@/modules/pdf";
import { useTranslations } from "next-intl";
import * as React from "react";

interface TestPreviewTabProps {
  test: Test;
}

export function TestPreviewTab({ test }: TestPreviewTabProps) {
  const t = useTranslations("Dashboard.tests.testDetail");
  const questionCount = test.content?.length ?? 0;

  return (
    <div className="max-w-4xl space-y-10 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
        {test.description && <p className="text-lg mb-2">{test.description}</p>}
        <div className="text-sm">
          <span className="font-medium">{t("preview.subject")}:</span>{" "}
          {test.test_params?.subject || "N/A"} |
          <span className="font-medium ml-2">{t("preview.difficulty")}:</span>{" "}
          {test.test_params?.difficulty_level || "N/A"} |
          <span className="font-medium ml-2">{t("preview.questions")}:</span> {questionCount} |
          <span className="font-medium ml-2">{t("preview.time")}:</span>{" "}
          {test.test_params?.time_per_question_in_minutes
            ? `${test.test_params.time_per_question_in_minutes * questionCount} ${t("preview.minutes")}`
            : "N/A"}
        </div>
      </div>
      <Separator className="bg-black" />
      <div className="space-y-4">
        {test.content?.map((item) => (
          <div key={item.q} className="space-y-2">
            <div>
              <span className="text-sm">
                <span>{item.q}. </span>
                {item.question}
              </span>
            </div>

            <div className="space-y-1">
              {item.options.map((option, optionIndex) => (
                <div key={option.order} className="flex items-start gap-3">
                  <span className="text-xs">
                    <span className="font-bold">
                      {String.fromCharCode(65 + optionIndex)}.{" "}
                    </span>
                    {option.answer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Separator className="bg-black" />
      <div className="print:hidden">
        <DashboardTestPDFDownload
          test={test}
          translations={{
            subject: t("preview.subject"),
            difficulty: t("preview.difficulty"),
            questions: t("preview.questions"),
            time: t("preview.time"),
            minutes: t("preview.minutes"),
          }}
          buttonText={t("preview.exportPdf")}
        />
      </div>
    </div>
  );
}
