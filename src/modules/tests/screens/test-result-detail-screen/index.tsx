"use client";

import { useGetApiV1TestsTestIdResultsResultId } from "@/lib/api/generated/aPIForCheckmateApp";
import { Status } from "@/modules/components/status";
import { TestResultDisplay } from "@/modules/components/test-result";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export function TestResultDetailScreen() {
  const t = useTranslations("Dashboard.tests.testResult");
  const { testId, resultId } = useParams<{
    testId: string;
    resultId: string;
  }>();

  const testResultDetailQuery = useGetApiV1TestsTestIdResultsResultId(
    testId,
    resultId,
  );

  if (testResultDetailQuery.isLoading) {
    return <Status isLoading />;
  }

  const testResult = testResultDetailQuery.data;

  if (testResultDetailQuery.isError || !testResult) {
    return (
      <Status title={t("error")} description={t("error")} icon="alert-circle" />
    );
  }

  return (
    <TestResultDisplay
      testResult={testResult}
      labels={{
        studentInfo: {
          title: t("studentInfo.title"),
          nameLabel: t("studentInfo.name"),
          scoreLabel: t("studentInfo.score"),
        },
        images: {
          title: t("images.title"),
          originalLabel: t("images.original"),
          evaluatedLabel: t("images.evaluated"),
          viewFullscreenLabel: t("images.viewFullscreen"),
          closeFullscreenLabel: t("images.closeFullscreen"),
        },
        questions: {
          title: t("questions.title"),
          questionNumberLabel: (number: number) =>
            t("questions.questionNumber", { number }),
          studentAnswerLabel: t("questions.studentAnswer"),
          correctAnswerLabel: t("questions.correctAnswer"),
          explanationLabel: t("questions.explanation"),
          askAiLabel: t("questions.askAi"),
        },
      }}
    />
  );
}
