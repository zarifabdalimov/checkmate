"use client";

import { useGetApiV1TestsTestIdResultsResultId } from "@/lib/api/generated/aPIForCheckmateApp";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import { Spinner } from "@/modules/ui/spinner";
import { useTranslations } from "next-intl";
import { Grade } from "@/modules/components/grade";

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
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (testResultDetailQuery.isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        {t("error")}
      </div>
    );
  }

  const testResult = testResultDetailQuery.data;

  if (!testResult) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
        {t("notFound")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t("studentInfo.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Grade
              correctCount={testResult.correct_answers ?? 0}
              totalCount={
                (testResult.correct_answers ?? 0) +
                (testResult.wrong_answers ?? 0)
              }
              size="xl"
            />
            <div className="space-y-2">
              <div>
                <span className="font-medium">{t("studentInfo.name")}: </span>
                <span>{testResult.student_name}</span>
              </div>
              <div>
                <span className="font-medium">{t("studentInfo.score")}: </span>
                <span>
                  {t("studentInfo.scoreValue", {
                    correct: testResult.correct_answers ?? 0,
                    wrong: testResult.wrong_answers ?? 0,
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Questions */}
      {testResult.test_with_answers && (
        <Card>
          <CardHeader>
            <CardTitle>{t("questions.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {testResult.test_with_answers.map((question, index) => (
                <div key={index} className="space-y-4">
                  <div className="font-medium">
                    {t("questions.questionNumber", { number: index + 1 })}:{" "}
                    {question.question}
                  </div>

                  {/* Options */}
                  <div className="ml-4 space-y-2">
                    {question.options?.map((option, optionIndex) => {
                      const isStudentAnswer = question.student_answer?.includes(
                        option.order,
                      );
                      const isCorrectAnswer = option.correct;

                      return (
                        <div
                          key={optionIndex}
                          className={`flex items-center space-x-2 rounded p-2 ${
                            isStudentAnswer && isCorrectAnswer
                              ? "bg-green-100"
                              : isStudentAnswer && !isCorrectAnswer
                                ? "bg-red-100"
                                : !isStudentAnswer && isCorrectAnswer
                                  ? "bg-blue-50"
                                  : ""
                          }`}
                        >
                          <span>{String.fromCharCode(65 + optionIndex)}.</span>
                          <span>{option.answer}</span>
                          {isStudentAnswer && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              ({t("questions.studentAnswer")})
                            </span>
                          )}
                          {isCorrectAnswer && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              ({t("questions.correctAnswer")})
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
