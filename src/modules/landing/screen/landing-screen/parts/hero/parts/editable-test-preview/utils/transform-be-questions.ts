import type {
  TestGroup,
  TestQuestion,
} from "@/hooks/use-create-demo-test";
import type { Question } from "../index.types";

function transformQuestion(item: TestQuestion, index: number): Question {
  const base = {
    id: crypto.randomUUID(),
    order: item.q ?? index + 1,
    question: item.question,
  };

  switch (item.type) {
    case "MCQ_SINGLE":
      return {
        ...base,
        type: "SINGLE_CHOICE",
        payload: { options: item.options ?? [] },
      };
    case "MCQ_MULTIPLE":
      return {
        ...base,
        type: "MULTIPLE_CHOICE",
        payload: { options: item.options ?? [] },
      };
    case "OPEN_ENDED":
      return {
        ...base,
        type: "OPEN_ENDED",
        payload: {},
      };
  }
}

export function transformBeQuestions(groups: TestGroup[]): Question[] {
  return groups.flatMap((group) =>
    (group.items ?? []).map((item, index) => transformQuestion(item, index)),
  );
}
