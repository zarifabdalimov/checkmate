import React from "react";

interface ParameterFieldProps {
  label: string;
  fieldName: string;
  value?: React.ReactNode;
  options?: { value: string; label: string }[];
}

export function ParameterField({
  label,
  fieldName,
  value,
  options,
}: ParameterFieldProps) {
  let displayValue = value || "-";

  // Format specific fields
  if (fieldName === "student_age_range" && value) {
    displayValue = `${value} years`;
  } else if (fieldName === "time_per_question_in_minutes" && value) {
    displayValue = `${value} minutes`;
  } else if (fieldName === "difficulty_level" && value && options) {
    // Find the label for the difficulty value
    const option = options.find((opt) => opt.value === value);
    displayValue = option?.label || value;
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="px-3 py-2 text-sm bg-muted rounded-md min-h-9 flex items-center">
        {displayValue}
      </div>
    </div>
  );
}
