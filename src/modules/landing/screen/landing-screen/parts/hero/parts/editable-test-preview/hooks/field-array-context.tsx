"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UseFieldArrayReturn } from "react-hook-form";
import type { TestFormData } from "../index.types";

type FieldArrayContextType = UseFieldArrayReturn<TestFormData, "questions", "id">;

const FieldArrayContext = createContext<FieldArrayContextType | null>(null);

interface FieldArrayProviderProps {
  children: ReactNode;
  value: FieldArrayContextType;
}

export function FieldArrayProvider({ children, value }: FieldArrayProviderProps) {
  return (
    <FieldArrayContext.Provider value={value}>
      {children}
    </FieldArrayContext.Provider>
  );
}

export function useFieldArrayContext() {
  const context = useContext(FieldArrayContext);
  if (!context) {
    throw new Error("useFieldArrayContext must be used within FieldArrayProvider");
  }
  return context;
}
