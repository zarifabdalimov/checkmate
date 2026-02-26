import type { Question, QuestionType } from "../index.types";

export function createDefaultQuestion(type: QuestionType): Question {
  const base = {
    id: crypto.randomUUID(),
    order: 0,
    question: "",
  };

  switch (type) {
    case "SINGLE_CHOICE":
      return {
        ...base,
        type,
        payload: {
          options: [
            { order: 1, answer: "", correct: true },
            { order: 2, answer: "", correct: false },
            { order: 3, answer: "", correct: false },
            { order: 4, answer: "", correct: false },
          ],
        },
      };
    case "MULTIPLE_CHOICE":
      return {
        ...base,
        type,
        payload: {
          options: [
            { order: 1, answer: "", correct: true },
            { order: 2, answer: "", correct: false },
            { order: 3, answer: "", correct: false },
            { order: 4, answer: "", correct: false },
          ],
        },
      };
    case "OPEN_ENDED":
      return { ...base, type, payload: {} };
    case "TRUE_FALSE":
      return { ...base, type, payload: { correctAnswer: true } };
    case "MATCH_PAIRS":
      return {
        ...base,
        type,
        payload: {
          pairs: [
            { left: "", right: "" },
            { left: "", right: "" },
          ],
        },
      };
    case "ORDERING":
      return {
        ...base,
        type,
        payload: {
          items: [
            { order: 1, text: "" },
            { order: 2, text: "" },
          ],
        },
      };
    case "FILL_IN_THE_BLANK":
      return {
        ...base,
        type,
        payload: { textWithBlanks: "", answers: [""] },
      };
    case "CATEGORIZATION":
      return {
        ...base,
        type,
        payload: {
          categories: [
            { name: "", items: [""] },
            { name: "", items: [""] },
          ],
        },
      };
    case "NUMERIC":
      return { ...base, type, payload: { correctAnswer: 0 } };
    case "SHORT_ANSWER":
      return { ...base, type, payload: { acceptedAnswers: [""] } };
    case "HIGHLIGHT":
      return {
        ...base,
        type,
        payload: { passage: "", highlights: [{ start: 0, end: 0 }] },
      };
  }
}
