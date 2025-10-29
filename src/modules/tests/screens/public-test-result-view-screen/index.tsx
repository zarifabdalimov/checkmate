"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/modules/ui/button";
import { TestResultDisplay } from "@/modules/components/test-result";
import type { TestItemWithAnswer, TestResult } from "@/lib/api/generated/model";
import { useRouter } from "@/i18n/navigation";

// Mock test result data with explanations
const mockTestResult: TestResult & {
  test_with_answers?: Array<TestItemWithAnswer & { explanation?: string }>;
} = {
  id: "test-result-1",
  student_name: "John Doe",
  status: "evaluated",
  correct_answers: 8,
  wrong_answers: 2,
  original_file_url:
    "https://via.placeholder.com/600x800/e3f2fd/1976d2?text=Original+Test",
  evaluated_file_url:
    "https://via.placeholder.com/600x800/c8e6c9/388e3c?text=Evaluated+Test",
  test_with_answers: [
    {
      q: 1,
      question: "What is the capital of France?",
      explanation:
        "Paris is the capital and largest city of France. It has been the capital since the 12th century and is located in the north-central part of the country along the Seine River.",
      options: [
        { order: 0, answer: "London", correct: false },
        { order: 1, answer: "Paris", correct: true },
        { order: 2, answer: "Berlin", correct: false },
        { order: 3, answer: "Madrid", correct: false },
      ],
      student_answer: [1],
    },
    {
      q: 2,
      question: "Which planet is known as the Red Planet?",
      explanation:
        "Mars is called the Red Planet because of its reddish appearance, which is caused by iron oxide (rust) on its surface. This gives the planet its distinctive red-orange color when viewed from Earth.",
      options: [
        { order: 0, answer: "Venus", correct: false },
        { order: 1, answer: "Mars", correct: true },
        { order: 2, answer: "Jupiter", correct: false },
        { order: 3, answer: "Saturn", correct: false },
      ],
      student_answer: [1],
    },
    {
      q: 3,
      question: "What is 2 + 2?",
      explanation:
        "Basic arithmetic: 2 + 2 = 4. This is a fundamental addition problem where we combine two groups of 2 to get a total of 4.",
      options: [
        { order: 0, answer: "3", correct: false },
        { order: 1, answer: "4", correct: true },
        { order: 2, answer: "5", correct: false },
        { order: 3, answer: "6", correct: false },
      ],
      student_answer: [1],
    },
    {
      q: 4,
      question: "Who wrote Romeo and Juliet?",
      explanation:
        "William Shakespeare wrote Romeo and Juliet around 1594-1596. It is one of his most famous tragedies and tells the story of two young star-crossed lovers from feuding families in Verona, Italy.",
      options: [
        { order: 0, answer: "Charles Dickens", correct: false },
        { order: 1, answer: "William Shakespeare", correct: true },
        { order: 2, answer: "Jane Austen", correct: false },
        { order: 3, answer: "Mark Twain", correct: false },
      ],
      student_answer: [1],
    },
    {
      q: 5,
      question: "What is the largest ocean on Earth?",
      explanation:
        "The Pacific Ocean is the largest ocean on Earth, covering approximately 63 million square miles (165 million square kilometers). It contains more than half of the Earth's free water and is larger than all of Earth's land area combined.",
      options: [
        { order: 0, answer: "Atlantic Ocean", correct: false },
        { order: 1, answer: "Indian Ocean", correct: false },
        { order: 2, answer: "Arctic Ocean", correct: false },
        { order: 3, answer: "Pacific Ocean", correct: true },
      ],
      student_answer: [3],
    },
    {
      q: 6,
      question: "Which element has the chemical symbol 'O'?",
      explanation:
        "Oxygen has the chemical symbol 'O' and atomic number 8. It is a highly reactive nonmetal and an essential element for most life on Earth, making up about 21% of the Earth's atmosphere.",
      options: [
        { order: 0, answer: "Gold", correct: false },
        { order: 1, answer: "Oxygen", correct: true },
        { order: 2, answer: "Silver", correct: false },
        { order: 3, answer: "Osmium", correct: false },
      ],
      student_answer: [1],
    },
    {
      q: 7,
      question: "In which year did World War II end?",
      explanation:
        "World War II ended in 1945. Germany surrendered on May 8, 1945 (V-E Day), and Japan surrendered on September 2, 1945 (V-J Day) after the atomic bombings of Hiroshima and Nagasaki, officially ending the war.",
      options: [
        { order: 0, answer: "1943", correct: false },
        { order: 1, answer: "1944", correct: false },
        { order: 2, answer: "1945", correct: true },
        { order: 3, answer: "1946", correct: false },
      ],
      student_answer: [2],
    },
    {
      q: 8,
      question: "What is the smallest prime number?",
      explanation:
        "2 is the smallest prime number. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 2 is also the only even prime number.",
      options: [
        { order: 0, answer: "0", correct: false },
        { order: 1, answer: "1", correct: false },
        { order: 2, answer: "2", correct: true },
        { order: 3, answer: "3", correct: false },
      ],
      student_answer: [2],
    },
    {
      q: 9,
      question: "Which continent is the Sahara Desert located on?",
      explanation:
        "The Sahara Desert is located in Africa. It is the world's largest hot desert, covering approximately 9 million square kilometers across North Africa, including parts of 11 countries.",
      options: [
        { order: 0, answer: "Asia", correct: false },
        { order: 1, answer: "Africa", correct: true },
        { order: 2, answer: "Australia", correct: false },
        { order: 3, answer: "South America", correct: false },
      ],
      student_answer: [0],
    },
    {
      q: 10,
      question: "What is the speed of light?",
      explanation:
        "The speed of light in a vacuum is approximately 300,000 kilometers per second (or more precisely, 299,792,458 m/s). This is the maximum speed at which all energy, matter, and information in the universe can travel.",
      options: [
        { order: 0, answer: "300,000 km/s", correct: true },
        { order: 1, answer: "150,000 km/s", correct: false },
        { order: 2, answer: "450,000 km/s", correct: false },
        { order: 3, answer: "600,000 km/s", correct: false },
      ],
      student_answer: [0],
    },
  ],
};

interface PublicTestResultViewScreenProps {
  resultId: string;
  token: string;
}

export function PublicTestResultViewScreen({
  resultId,
  token,
}: PublicTestResultViewScreenProps) {
  const router = useRouter();
  const tView = useTranslations("PublicResult.view");
  const tStudentInfo = useTranslations("PublicResult.studentInfo");
  const tImages = useTranslations("PublicResult.images");
  const tQuestions = useTranslations("PublicResult.questions");

  // In real implementation, this would:
  // 1. Call API: GET /api/results/{resultId}/view?token={token}
  // 2. The API would verify the one-time token
  // 3. If valid, return the test result and invalidate the token
  // 4. If invalid/expired, return 401/403

  // For now, we'll just use mock data
  const testResult = mockTestResult;

  const handleBackToPin = () => {
    // Go back to PIN entry page
    router.push(`/result/${resultId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">{tView("title")}</h1>
          <p className="mt-2 text-muted-foreground">{tView("subtitle")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tView("token")}: {token.substring(0, 20)}...
          </p>
        </div>

        {/* Test Result Display */}
        <TestResultDisplay
          testResult={testResult}
          labels={{
            studentInfo: {
              title: tStudentInfo("title"),
              nameLabel: tStudentInfo("name"),
              scoreLabel: tStudentInfo("score"),
            },
            images: {
              title: tImages("title"),
              originalLabel: tImages("original"),
              evaluatedLabel: tImages("evaluated"),
              viewFullscreenLabel: tImages("viewFullscreen"),
              closeFullscreenLabel: tImages("closeFullscreen"),
            },
            questions: {
              title: tQuestions("title"),
              questionNumberLabel: (number: number) =>
                tQuestions("questionNumber", { number }),
              studentAnswerLabel: tQuestions("studentAnswer"),
              correctAnswerLabel: tQuestions("correctAnswer"),
              explanationLabel: tQuestions("explanation"),
              askAiLabel: tQuestions("askAi"),
            },
          }}
        />

        {/* Footer Actions */}
        <div className="text-center">
          <Button variant="outline" onClick={handleBackToPin}>
            {tView("backToPin")}
          </Button>
        </div>
      </div>
    </div>
  );
}
