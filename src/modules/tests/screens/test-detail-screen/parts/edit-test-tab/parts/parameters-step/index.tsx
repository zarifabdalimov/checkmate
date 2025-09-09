import { ParameterField } from "@/modules/tests/screens/test-detail-screen/parts/edit-test-tab/parts/parameters-step/parameter-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import { useTranslations } from "next-intl";
import { useEditTestFormContext } from "../../hooks/use-edit-test-form-context";

export function ParametersStep() {
  const form = useEditTestFormContext();
  const t = useTranslations("Dashboard.tests.dialog");
  const formData = form.watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.parameters.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ParameterField
              label={t("form.subject.label")}
              fieldName="subject"
              value={formData.subject}
            />
            <ParameterField
              label={t("form.topic.label")}
              fieldName="topic"
              value={formData.topic}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ParameterField
              label={t("form.ageRange.label")}
              fieldName="student_age_range"
              value={formData.student_age_range}
              options={[
                { value: "5-7", label: "5-7 years" },
                { value: "8-10", label: "8-10 years" },
                { value: "11-13", label: "11-13 years" },
                { value: "14-16", label: "14-16 years" },
                { value: "17-18", label: "17-18 years" },
                { value: "18+", label: "18+ years" },
              ]}
            />
            <ParameterField
              label={t("form.difficulty.label")}
              fieldName="difficulty_level"
              value={formData.difficulty_level}
              options={[
                {
                  value: "beginner",
                  label: t("form.difficulty.options.beginner"),
                },
                {
                  value: "intermediate",
                  label: t("form.difficulty.options.intermediate"),
                },
                {
                  value: "advanced",
                  label: t("form.difficulty.options.advanced"),
                },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ParameterField
              label={t("form.questionsCount.label")}
              fieldName="number_of_questions"
              value={formData.number_of_questions}
            />
            <ParameterField
              label={t("form.timePerQuestion.label")}
              fieldName="time_per_question_in_minutes"
              value={formData.time_per_question_in_minutes}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
