import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const gradeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors border-2",
  {
    variants: {
      value: {
        A: "border-emerald-500 text-emerald-600 hover:bg-emerald-50",
        B: "border-green-500 text-green-600 hover:bg-green-50",
        C: "border-yellow-500 text-yellow-600 hover:bg-yellow-50",
        D: "border-orange-500 text-orange-600 hover:bg-orange-50",
        F: "border-red-500 text-red-600 hover:bg-red-50",
      },
      size: {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
        xl: "w-12 h-12 text-lg",
      },
    },
    defaultVariants: {
      value: "F",
      size: "md",
    },
  },
);

export type GradeValue = "A" | "B" | "C" | "D" | "F";

export interface GradeProps extends VariantProps<typeof gradeVariants> {
  correctCount: number;
  totalCount: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const calculateGrade = (percentage: number): GradeValue => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

export function Grade({
  correctCount,
  totalCount,
  size,
  className,
}: GradeProps) {
  const percentage = totalCount === 0 ? 0 : (correctCount / totalCount) * 100;
  const value = calculateGrade(percentage);

  return (
    <div className={cn(gradeVariants({ value, size }), className)}>{value}</div>
  );
}
