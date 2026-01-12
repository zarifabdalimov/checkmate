import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Test } from "@/lib/api/generated/model";

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
  description: {
    fontSize: 10,
    marginBottom: 8,
    color: "#4b5563",
  },
  metadata: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.4,
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

interface DashboardTestDocumentProps {
  test: Test;
  translations: {
    subject: string;
    difficulty: string;
    questions: string;
    time: string;
    minutes: string;
  };
}

export function DashboardTestDocument({
  test,
  translations,
}: DashboardTestDocumentProps) {
  const questionCount = test.content?.length ?? 0;
  const totalTime = test.test_params?.time_per_question_in_minutes
    ? test.test_params.time_per_question_in_minutes * questionCount
    : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{test.name}</Text>
          {test.description && (
            <Text style={styles.description}>{test.description}</Text>
          )}
          <View style={styles.metadata}>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{translations.subject}:</Text>{" "}
              {test.test_params?.subject || "N/A"} |{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{translations.difficulty}:</Text>{" "}
              {test.test_params?.difficulty_level || "N/A"} |{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{translations.questions}:</Text>{" "}
              {questionCount} |{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{translations.time}:</Text>{" "}
              {totalTime > 0 ? `${totalTime} ${translations.minutes}` : "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.questionsContainer}>
          {test.content?.map((item) => (
            <View key={item.q} style={styles.questionBlock} wrap={false}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>{item.q}.</Text>
                <Text style={styles.questionText}>{item.question}</Text>
              </View>

              <View style={styles.optionsContainer}>
                {item.options.map((option, optionIndex) => (
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
