# Test Editing

## Question Types

Every question has a `type` field and a `payload` whose shape depends on the type.

```
QuestionItem
├── id (uuid)
├── order (number)
├── type: QuestionType
├── question (string — the prompt shown to the student)
└── payload: { ... } (shape depends on `type`)
```

### `SINGLE_CHOICE`

Pick exactly one correct answer from a list.

```ts
payload: {
  options: {
    id: string
    text: string
    correct: boolean // exactly one true
  }[]
}
```

### `MULTIPLE_CHOICE`

Pick one or more correct answers from a list.

```ts
payload: {
  options: {
    id: string
    text: string
    correct: boolean // at least one true
  }[]
}
```

### `OPEN_ENDED`

Free-text response. No predefined options.

```ts
payload: {
  expected_answer?: string // optional reference answer for grading
  max_length?: number      // optional character limit
}
```

### `MATCH_PAIRS`

Match items from the left column to items in the right column. Right column is shuffled during the test.

```ts
payload: {
  pairs: {
    id: string
    left: string  // term / prompt
    right: string // definition / match
  }[]
}
```

### `ORDERING`

Arrange items into the correct order. Items are shuffled during the test.

```ts
payload: {
  items: {
    id: string
    text: string
    correct_position: number // 0-indexed
  }[]
}
```

### `TRUE_FALSE`

True or false statement.

```ts
payload: {
  correct_answer: boolean
}
```

### `FILL_IN_THE_BLANK`

Question text contains `{{blank_id}}` placeholders the student must fill in.

Example: `"The capital of France is {{1}} and it sits on the {{2}} river."`

```ts
payload: {
  blanks: {
    id: string
    accepted_answers: string[] // case-insensitive
  }[]
}
```

### `CATEGORIZATION`

Sort items into 2 or more categories. E.g., "Classify these animals as mammals or reptiles."

```ts
payload: {
  categories: {
    id: string
    name: string // category label
  }[]
  items: {
    id: string
    text: string
    category_id: string // correct category
  }[]
}
```

### `NUMERIC`

Enter a specific number. Supports exact match or a tolerance range.

E.g., "What is pi to 2 decimal places?" — accept 3.14 ± 0.005.

```ts
payload: {
  correct_answer: number
  tolerance?: number // accepted deviation, default 0 (exact match)
}
```

### `SHORT_ANSWER`

Short text answer auto-graded against a list of accepted values. Unlike `OPEN_ENDED`, this is not manually/AI graded.

```ts
payload: {
  accepted_answers: string[] // case-insensitive match
}
```

### `HIGHLIGHT`

Given a passage of text, select the correct word(s) or sentence(s).

```ts
payload: {
  passage: string
  highlights: {
    id: string
    start: number // character offset in passage
    end: number   // character offset in passage
  }[]
}
```

---

## Implementation

### Component Architecture

The test editor is a form that renders a list of questions. Each question is rendered by a `Question` component that switches on `type` to render the correct type-specific component. Every type-specific component supports two modes: **edit** and **preview**.

```
TestEditorForm
└── questions.map(q =>
      <Question question={q} mode="edit" | "preview" />
    )
```

#### `Question`

Accepts a `QuestionItem` and a `mode` prop. Renders the shared question shell (order number, question text, type badge) and switches on `type` to delegate to the right component:

```tsx
switch (question.type) {
  case "SINGLE_CHOICE":      return <SingleChoiceQuestion />
  case "MULTIPLE_CHOICE":    return <MultipleChoiceQuestion />
  case "OPEN_ENDED":         return <OpenEndedQuestion />
  case "MATCH_PAIRS":        return <MatchPairsQuestion />
  case "ORDERING":           return <OrderingQuestion />
  case "TRUE_FALSE":         return <TrueFalseQuestion />
  case "FILL_IN_THE_BLANK":  return <FillInTheBlankQuestion />
  case "CATEGORIZATION":     return <CategorizationQuestion />
  case "NUMERIC":            return <NumericQuestion />
  case "SHORT_ANSWER":       return <ShortAnswerQuestion />
  case "HIGHLIGHT":          return <HighlightQuestion />
}
```

#### Modes

Each type-specific component receives `mode`:

- **`edit`** — form inputs to modify the payload (text fields, add/remove options, toggle correct answers, drag-and-drop reordering, etc.)
- **`preview`** — read-only rendering of the question as the student would see it (radio buttons, checkboxes, dropzones, text areas, etc.), but non-interactive

### Component Map

| Type | Component | Edit mode | Preview mode |
|------|-----------|-----------|-------------|
| `SINGLE_CHOICE` | `SingleChoiceQuestion` | Edit option texts, toggle correct (radio) | Radio button list (disabled) |
| `MULTIPLE_CHOICE` | `MultipleChoiceQuestion` | Edit option texts, toggle correct (checkboxes) | Checkbox list (disabled) |
| `OPEN_ENDED` | `OpenEndedQuestion` | Edit expected answer, max length | Empty textarea with placeholder |
| `MATCH_PAIRS` | `MatchPairsQuestion` | Edit left/right texts, add/remove pairs | Two columns with drag targets |
| `ORDERING` | `OrderingQuestion` | Edit item texts, set correct order | Shuffled draggable list |
| `TRUE_FALSE` | `TrueFalseQuestion` | Toggle correct answer | True/False radio (disabled) |
| `FILL_IN_THE_BLANK` | `FillInTheBlankQuestion` | Edit passage with `{{id}}` placeholders, edit accepted answers per blank | Passage with inline input fields |
| `CATEGORIZATION` | `CategorizationQuestion` | Edit categories, edit items, assign items to categories | Category buckets with draggable items |
| `NUMERIC` | `NumericQuestion` | Edit correct answer, tolerance | Number input (disabled) |
| `SHORT_ANSWER` | `ShortAnswerQuestion` | Edit accepted answers list | Text input (disabled) |
| `HIGHLIGHT` | `HighlightQuestion` | Edit passage, select highlight spans | Passage with highlightable text |

### File Structure

```
src/components/questions/
├── question.tsx                    # Shell + switch
├── single-choice-question.tsx
├── multiple-choice-question.tsx
├── open-ended-question.tsx
├── match-pairs-question.tsx
├── ordering-question.tsx
├── true-false-question.tsx
├── fill-in-the-blank-question.tsx
├── categorization-question.tsx
├── numeric-question.tsx
├── short-answer-question.tsx
└── highlight-question.tsx
```
