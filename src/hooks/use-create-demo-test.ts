import { components, paths } from "@/types/api.v1";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export type ModelType = components["schemas"]["ModelType"];

// Types based on the OpenAPI schema
export type TestFormat = components["schemas"]["TestFormat"];

export type TestGroupRequest = components["schemas"]["TestGroupRequest"];

export type CreateDemoTestRequest = components["schemas"]["CreateTestReq"];

export type CreateDemoTestResponse =
  paths["/dev/api/v1/tests"]["post"]["responses"]["200"]["content"]["application/json"];

export type TestItemOptions = components["schemas"]["TestItemOptions"];

export type TestQuestion = components["schemas"]["TestQuestion"];

export type TestGroup = components["schemas"]["TestGroup"];

export type TestContent = components["schemas"]["TestContent"];

export type TestMetadata = components["schemas"]["TestMetadata"];

export type Content = components["schemas"]["Content"];

export type TestStatus = components["schemas"]["TestStatus"];

export type Test = components["schemas"]["Test"];

export type SubmitTestFeedbackRequest =
  components["schemas"]["SubmitTestFeedbackReq"];

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
