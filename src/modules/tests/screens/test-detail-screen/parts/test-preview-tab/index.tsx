"use client";

import { Test } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";
import { Printer } from "lucide-react";
import * as React from "react";

interface TestPreviewTabProps {
  test: Test;
}

export function TestPreviewTab({ test }: TestPreviewTabProps) {
  const questionCount = test.content?.length ?? 0

  return (
    <div className="max-w-4xl space-y-6 py-4">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
        {test.description && <p className="text-lg mb-2">{test.description}</p>}
        <div className="text-sm">
          <span className="font-medium">Subject:</span>{" "}
          {test.test_params?.subject || "N/A"} |
          <span className="font-medium ml-2">Difficulty:</span>{" "}
          {test.test_params?.difficulty_level || "N/A"} |
          <span className="font-medium ml-2">Questions:</span>{" "}
          {questionCount} |<span className="font-medium ml-2">Time:</span>{" "}
          {test.test_params?.time_per_question_in_minutes
            ? `${test.test_params.time_per_question_in_minutes * questionCount} minutes`
            : "N/A"}
        </div>
      </div>

      <div className="space-y-8">
        {test.content?.map((item) => (
          <div key={item.q} className="space-y-2">
            <div>
              <span className="text-lg">
                <span>{item.q}. </span>
                {item.question}
              </span>
            </div>

            <div className="space-y-1">
              {item.options.map((option, optionIndex) => (
                <div key={option.order} className="flex items-start gap-3">
                  <span className="text-md">
                    <span className="font-bold">
                      {String.fromCharCode(65 + optionIndex)}.{" "}
                    </span>
                    {option.answer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 pt-6 border-t-2 border-black print:hidden">
        <Button onClick={window.print} className="gap-2" variant="outline">
          <Printer className="h-4 w-4" />
          Print Test
        </Button>
      </div>
    </div>
  );
}
