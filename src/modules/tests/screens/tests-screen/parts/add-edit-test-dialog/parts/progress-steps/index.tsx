import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  steps: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  currentStepIndex: number;
}

export function ProgressSteps({ steps, currentStepIndex }: ProgressStepsProps) {
  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-[15px] right-[15px] h-0.5 bg-muted-foreground/30 -translate-y-1/2" />

        <div
          className="absolute top-4 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors relative z-10 bg-background",
                index < currentStepIndex
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === currentStepIndex
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground",
              )}
            >
              {index < currentStepIndex ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className="mt-3 text-center">
              <div
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  index <= currentStepIndex
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {step.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
