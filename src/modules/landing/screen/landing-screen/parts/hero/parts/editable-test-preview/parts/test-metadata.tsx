"use client";

import { useTranslations } from "next-intl";
import type { Test } from "@/hooks/use-create-demo-test";
import { useEditableTestFormContext } from "../hooks/use-editable-test-form-context";

interface TestMetadataProps {
  test: Test;
}

export function TestMetadata({ test }: TestMetadataProps) {
  const t = useTranslations("ShowcasePage.preview");
  const { fields } = useEditableTestFormContext();

  const content = test.content;
  const metadata = content?.test_metadata;

  if (!metadata) return null;

  return (
    <div className="text-sm text-muted-foreground space-y-1">
      <div>
        <span className="font-medium">{t("subject")}:</span> {test.subject}
      </div>
      <div>
        <span className="font-medium">{t("topic")}:</span> {metadata.topic}
      </div>
      <div>
        <span className="font-medium">{t("questions")}:</span> {fields.length}
        {" | "}
        <span className="font-medium">{t("timeLimit")}:</span>{" "}
        {metadata.time_limit_min} {t("minutes")}
      </div>
    </div>
  );
}
