import * as React from "react";

export interface Step {
  id: string;
  title: string;
  description: string;
}

export function useMultiStep(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const goToNext = React.useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const goToPrevious = React.useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = React.useCallback(
    (stepIndex: number) => {
      setCurrentStepIndex(Math.max(0, Math.min(stepIndex, steps.length - 1)));
    },
    [steps.length],
  );

  const reset = React.useCallback(() => {
    setCurrentStepIndex(0);
  }, []);

  return {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    goToStep,
    reset,
    totalSteps: steps.length,
  };
}
