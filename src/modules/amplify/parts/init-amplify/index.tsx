"use client";

import { configureAmplify } from "@/lib/amplify";
import { useEffect } from "react";

export function InitAmplify() {
  useEffect(() => {
    configureAmplify();
  }, []);

  return null;
}
