"use client";

import type { Test } from "@/hooks/use-create-demo-test";
import { Card, CardContent } from "@/modules/ui/card";
import { Separator } from "@/modules/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { FieldArrayProvider } from "./hooks/field-array-context";
import { useEditableTestForm } from "./hooks/use-editable-test-form";
import { QuestionsList } from "./parts/questions-list/questions-list";
import { TestFeedback } from "./parts/test-feedback";
import { TestHeader } from "./parts/test-header";
import { TestMetadata } from "./parts/test-metadata";
import { TestTitle } from "./parts/test-title";

interface EditableTestPreviewProps {
  test: Test;
  onClose?: () => void;
}

export function EditableTestPreview({
  test,
  onClose,
}: EditableTestPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { fieldArrayMethods, ...methods } = useEditableTestForm(test);

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

  const testName = methods.watch("testName");
  const questions = methods.watch("questions");

  return (
    <FormProvider {...methods}>
      <FieldArrayProvider value={fieldArrayMethods}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 space-y-6">
              <TestHeader
                isEditing={isEditing}
                onToggleEdit={handleToggleEdit}
                onClose={onClose}
                test={test}
                questions={questions}
                testName={testName}
              />
              <div className="flex items-center gap-4">
                <Image
                  src="/mascot/mascot-reading-green.svg"
                  alt=""
                  width={64}
                  height={64}
                  className="shrink-0 hidden sm:block"
                />
                <div className="text-center flex-1 space-y-4">
                  <TestTitle isEditing={isEditing} />
                  <TestMetadata test={test} />
                </div>
              </div>
              <Separator />
              <QuestionsList isEditing={isEditing} />
              <Separator />
              <div className="print:hidden">
                <TestFeedback
                  testId={test.id}
                  initialLiked={test.feedback_liked}
                  initialComment={test.feedback_comment}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </FieldArrayProvider>
    </FormProvider>
  );
}
