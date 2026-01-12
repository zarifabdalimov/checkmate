import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Test } from "@/hooks/use-create-demo-test";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  metadata: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  metadataRow: {
    marginBottom: 2,
  },
  metadataLabel: {
    fontFamily: "Helvetica-Bold",
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    marginVertical: 10,
  },
  questionsContainer: {
    gap: 12,
  },
  questionBlock: {
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: "row",
    marginBottom: 6,
  },
  questionNumber: {
    fontFamily: "Helvetica-Bold",
    marginRight: 4,
    minWidth: 18,
  },
  questionText: {
    flex: 1,
    lineHeight: 1.3,
  },
  optionsContainer: {
    paddingLeft: 22,
    gap: 4,
  },
  optionRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  optionLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginRight: 6,
    minWidth: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.3,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
  },
});

interface TestDocumentProps {
  test: Test;
  questions: Array<{
    question: string;
    options: Array<{
      order: number;
      answer: string;
      correct: boolean;
    }>;
  }>;
  testName: string;
  translations: {
    subject: string;
    topic: string;
    questions: string;
    timeLimit: string;
    minutes: string;
  };
}

export function TestDocument({
  test,
  questions,
  testName,
  translations,
}: TestDocumentProps) {
  const content = test.content;
  const metadata = content?.test_metadata;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{testName}</Text>
          {metadata && (
            <View style={styles.metadata}>
              <View style={styles.metadataRow}>
                <Text>
                  <Text style={styles.metadataLabel}>
                    {translations.subject}:
                  </Text>{" "}
                  {test.subject}
                </Text>
              </View>
              <View style={styles.metadataRow}>
                <Text>
                  <Text style={styles.metadataLabel}>{translations.topic}:</Text>{" "}
                  {metadata.topic}
                </Text>
              </View>
              <View style={styles.metadataRow}>
                <Text>
                  <Text style={styles.metadataLabel}>
                    {translations.questions}:
                  </Text>{" "}
                  {questions.length} |{" "}
                  <Text style={styles.metadataLabel}>
                    {translations.timeLimit}:
                  </Text>{" "}
                  {metadata.time_limit_min} {translations.minutes}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.questionsContainer}>
          {questions.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.questionBlock} wrap={false}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>{questionIndex + 1}.</Text>
                <Text style={styles.questionText}>{question.question}</Text>
              </View>

              <View style={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => (
                  <View key={option.order} style={styles.optionRow}>
                    <Text style={styles.optionLabel}>
                      {String.fromCharCode(65 + optionIndex)}.
                    </Text>
                    <Text style={styles.optionText}>{option.answer}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
