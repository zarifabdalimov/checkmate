import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "../backend/openapi.yaml",
    },
    output: {
      mode: "split",
      target: "src/lib/api/generated",
      schemas: "src/lib/api/generated/model",
      httpClient: "axios",
      client: "react-query",
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/lib/api/client.ts",
          name: "axios",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
