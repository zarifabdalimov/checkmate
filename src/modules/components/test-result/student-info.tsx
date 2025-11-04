import { Grade } from "@/modules/components/grade";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";

interface TestResultStudentInfoProps {
  studentName?: string;
  correctAnswers: number;
  wrongAnswers: number;
  title: string;
  nameLabel: string;
  scoreLabel: string;
}

export function TestResultStudentInfo({
  studentName,
  correctAnswers,
  wrongAnswers,
  title,
  nameLabel,
  scoreLabel,
}: TestResultStudentInfoProps) {
  const totalCount = correctAnswers + wrongAnswers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Grade
            correctCount={correctAnswers}
            totalCount={totalCount}
            size="xl"
          />
          <div className="space-y-2">
            {studentName && (
              <div>
                <span className="font-medium">{nameLabel}: </span>
                <span>{studentName}</span>
              </div>
            )}
            <div>
              <span className="font-medium">{scoreLabel}: </span>
              <span>
                {correctAnswers} correct / {wrongAnswers} wrong
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
