import type { TestItemWithAnswer, TestResult } from "@/lib/api/generated/model";
import { TestResultImages } from "./images";
import { TestResultQuestions } from "./questions";
import { TestResultStudentInfo } from "./student-info";

interface TestResultDisplayProps {
  testResult: TestResult & {
    test_with_answers?: Array<TestItemWithAnswer & { explanation?: string }>;
  };
  labels: {
    studentInfo: {
      title: string;
      nameLabel: string;
      scoreLabel: string;
    };
    images: {
      title: string;
      originalLabel: string;
      evaluatedLabel: string;
      viewFullscreenLabel: string;
      closeFullscreenLabel: string;
    };
    questions: {
      title: string;
      questionNumberLabel: (number: number) => string;
      studentAnswerLabel: string;
      correctAnswerLabel: string;
      explanationLabel?: string;
      askAiLabel?: string;
    };
  };
}

export function TestResultDisplay({
  testResult,
  labels,
}: TestResultDisplayProps) {
  return (
    <div className="space-y-6">
      <TestResultStudentInfo
        studentName={testResult.student_name}
        correctAnswers={testResult.correct_answers ?? 0}
        wrongAnswers={testResult.wrong_answers ?? 0}
        title={labels.studentInfo.title}
        nameLabel={labels.studentInfo.nameLabel}
        scoreLabel={labels.studentInfo.scoreLabel}
      />

      <TestResultImages
        originalFileUrl={testResult.original_file_url}
        evaluatedFileUrl={testResult.evaluated_file_url}
        title={labels.images.title}
        originalLabel={labels.images.originalLabel}
        evaluatedLabel={labels.images.evaluatedLabel}
        viewFullscreenLabel={labels.images.viewFullscreenLabel}
        closeFullscreenLabel={labels.images.closeFullscreenLabel}
      />

      <TestResultQuestions
        questions={testResult.test_with_answers}
        title={labels.questions.title}
        questionNumberLabel={labels.questions.questionNumberLabel}
        studentAnswerLabel={labels.questions.studentAnswerLabel}
        correctAnswerLabel={labels.questions.correctAnswerLabel}
        explanationLabel={labels.questions.explanationLabel}
        askAiLabel={labels.questions.askAiLabel}
      />
    </div>
  );
}

export { TestResultStudentInfo } from "./student-info";
export { TestResultImages } from "./images";
export { TestResultQuestions } from "./questions";
