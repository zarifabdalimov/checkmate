import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Types based on the OpenAPI schema
export type TestFormat = "MCQ_SINGLE" | "MCQ_MULTIPLE" | "OPEN_ENDED";

export type ModelType =
  | "THETA_ON_DEMAND"
  | "CLAUDE_HAIKU_3"
  | "CLAUSE_HAIKU_4_5"
  | "GEMINI_2_5_FLASH_LITE"
  | "GEMINI_3_FLASH_PREVIEW"
  | "THETA_DEPLOYMENT_GEMMA_2B";

export interface TestGroupRequest {
  format: TestFormat;
  amount: number;
  topic: string;
}

export interface CreateDemoTestRequest {
  model: ModelType;
  subject: string;
  difficulty_level: string;
  language: string;
  content: TestGroupRequest[];
}

export interface CreateDemoTestResponse {
  test_id: string;
}

export interface TestItemOptions {
  order: number;
  answer: string;
  correct: boolean;
}

export interface TestQuestion {
  q: number;
  type: TestFormat;
  question: string;
  options?: TestItemOptions[];
}

export interface TestGroup {
  name: string;
  items?: TestQuestion[];
}

export interface TestContent {
  groups: TestGroup[];
}

export interface TestMetadata {
  name: string;
  time_limit_min: number;
  topic: string;
  level: string;
  language: string;
}

export interface Content {
  test_metadata: TestMetadata;
  test_content: TestContent;
}

export type TestStatus = "pending" | "completed";

export interface Test {
  id: string;
  model: ModelType;
  status: TestStatus;
  subject: string;
  difficulty_level: string;
  feedback_liked?: boolean | null;
  feedback_comment?: string | null;
  content: Content | null;
}

export interface SubmitTestFeedbackRequest {
  liked: boolean;
  comment?: string;
}

const DEMO_API_BASE_URL = process.env.NEXT_PUBLIC_DEMO_API_BASE_URL || "";
const DEMO_API_KEY = process.env.NEXT_PUBLIC_DEMO_API_KEY || "";

/**
 * Hook to create a demo test
 */
export function useCreateDemoTest() {
  return useMutation<CreateDemoTestResponse, Error, CreateDemoTestRequest>({
    mutationFn: async (data: CreateDemoTestRequest) => {
      const response = await axios.post<CreateDemoTestResponse>(
        `${DEMO_API_BASE_URL}/dev/api/v1/tests`,
        data,
        {
          headers: {
            "X-Api-Key": DEMO_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
  });
}

/**
 * Hook to get a demo test by ID
 */
export function useGetDemoTest(testId: string) {
  return useQuery({
    queryKey: ["demo-test", testId],
    enabled: Boolean(testId),
    refetchInterval: (query) => {
      return query.state.data?.status === "pending" ? 1000 : false;
    },
    queryFn: async () => {
      const response = await axios.get<Test>(
        `${DEMO_API_BASE_URL}/dev/api/v1/tests/${testId}`,
        {
          headers: {
            "X-Api-Key": DEMO_API_KEY,
          },
        },
      );

      return response.data;
    },
  });
}

/**
 * Hook to submit feedback for a demo test
 */
export function useSubmitDemoTestFeedback(testId: string) {
  return useMutation<void, Error, SubmitTestFeedbackRequest>({
    mutationFn: async (data: SubmitTestFeedbackRequest) => {
      await axios.put(
        `${DEMO_API_BASE_URL}/dev/api/v1/tests/${testId}/feedback`,
        data,
        {
          headers: {
            "X-Api-Key": DEMO_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
    },
  });
}
