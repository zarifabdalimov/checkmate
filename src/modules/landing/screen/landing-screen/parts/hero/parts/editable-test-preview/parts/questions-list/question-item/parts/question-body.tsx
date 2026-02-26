"use client";

import type { QuestionType } from "../../../../index.types";
import type { QuestionComponentProps } from "./questions/question-component.types";
import {
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  OpenEndedQuestion,
  TrueFalseQuestion,
  MatchPairsQuestion,
  OrderingQuestion,
  FillInTheBlankQuestion,
  CategorizationQuestion,
  NumericQuestion,
  ShortAnswerQuestion,
  HighlightQuestion,
} from "./questions";

const QUESTION_COMPONENTS: Record<
  QuestionType,
  React.ComponentType<QuestionComponentProps>
> = {
  SINGLE_CHOICE: SingleChoiceQuestion,
  MULTIPLE_CHOICE: MultipleChoiceQuestion,
  OPEN_ENDED: OpenEndedQuestion,
  TRUE_FALSE: TrueFalseQuestion,
  MATCH_PAIRS: MatchPairsQuestion,
  ORDERING: OrderingQuestion,
  FILL_IN_THE_BLANK: FillInTheBlankQuestion,
  CATEGORIZATION: CategorizationQuestion,
  NUMERIC: NumericQuestion,
  SHORT_ANSWER: ShortAnswerQuestion,
  HIGHLIGHT: HighlightQuestion,
};

interface QuestionBodyProps extends QuestionComponentProps {
  type: QuestionType;
}

export function QuestionBody({ type, ...props }: QuestionBodyProps) {
  const Component = QUESTION_COMPONENTS[type];
  if (!Component) return null;
  return <Component {...props} />;
}
