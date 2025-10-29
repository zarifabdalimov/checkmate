import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/modules/ui/alert";
import { Button } from "@/modules/ui/button";
import type { TestItemWithAnswer } from "@/lib/api/generated/model";
import { InfoIcon, SparklesIcon } from "lucide-react";
import { toast } from "sonner";

interface TestResultQuestionsProps {
  questions?: (TestItemWithAnswer & { explanation?: string })[];
  title: string;
  questionNumberLabel: (number: number) => string;
  studentAnswerLabel: string;
  correctAnswerLabel: string;
  explanationLabel?: string;
  askAiLabel?: string;
}

export function TestResultQuestions({
  questions,
  title,
  questionNumberLabel,
  studentAnswerLabel,
  correctAnswerLabel,
  explanationLabel = "Explanation",
  askAiLabel = "Ask AI",
}: TestResultQuestionsProps) {
  const handleAskAi = (questionText: string) => {
    toast.info("Not implemented yet", {
      description: `AI assistance for: "${questionText}"`,
    });
  };
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <div className="font-medium">
                {questionNumberLabel(index + 1)}: {question.question}
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
                          ? "bg-green-100 dark:bg-green-900/30"
                          : isStudentAnswer && !isCorrectAnswer
                            ? "bg-red-100 dark:bg-red-900/30"
                            : !isStudentAnswer && isCorrectAnswer
                              ? "bg-blue-50 dark:bg-blue-900/30"
                              : ""
                      }`}
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}.</span>
                      <span>{option.answer}</span>
                      {isStudentAnswer && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({studentAnswerLabel})
                        </span>
                      )}
                      {isCorrectAnswer && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({correctAnswerLabel})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {question.explanation && (
                <Alert className="ml-4 mt-3">
                  <InfoIcon />
                  <AlertTitle>{explanationLabel}</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-3">
                      <p>{question.explanation}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => handleAskAi(question.question)}
                      >
                        <SparklesIcon className="h-3.5 w-3.5" />
                        {askAiLabel}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
