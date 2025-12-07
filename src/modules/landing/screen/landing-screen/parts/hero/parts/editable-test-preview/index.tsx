"use client";

import { Card, CardContent } from "@/modules/ui/card";
import { Separator } from "@/modules/ui/separator";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Test } from "@/hooks/use-create-demo-test";
import { FormProvider } from "react-hook-form";
import { useEditableTestForm } from "./hooks/use-editable-test-form";
import { FieldArrayProvider } from "./hooks/field-array-context";
import { TestHeader } from "./parts/test-header";
import { TestTitle } from "./parts/test-title";
import { TestMetadata } from "./parts/test-metadata";
import { QuestionsList } from "./parts/questions-list/questions-list";

interface EditableTestPreviewProps {
  test: Test;
  onClose?: () => void;
}

export function EditableTestPreview({
  test,
  onClose,
}: EditableTestPreviewProps) {
  const t = useTranslations("ShowcasePage.preview");
  const [isEditing, setIsEditing] = useState(false);
  const { fields, append, remove, update, ...methods } = useEditableTestForm(test);

  const onSubmit = () => {
    setIsEditing(false);
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      methods.handleSubmit(onSubmit)();
    } else {
      setIsEditing(true);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <FormProvider {...methods}>
      <FieldArrayProvider value={{ fields, append, remove, update } as any}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        <Card>
          <CardContent className="p-8 space-y-6">
            <TestHeader
              isEditing={isEditing}
              onToggleEdit={handleToggleEdit}
              onExportPDF={handleExportPDF}
              onClose={onClose}
            />
            <div className="text-center space-y-4">
              <TestTitle isEditing={isEditing} />
              <TestMetadata test={test} />
            </div>
            <Separator />
            <QuestionsList isEditing={isEditing} />
            <Separator />
            <div className="text-center text-sm text-muted-foreground print:hidden">
              {t("generatedBy")}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </FieldArrayProvider>
    </FormProvider>
  );
}
