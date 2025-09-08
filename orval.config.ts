import { defineConfig } from 'orval';

export default defineConfig({
  checkmate: {
    input: {
      target: './openapi.yaml',
    },
    output: {
      mode: 'split',
      target: 'src/lib/api/generated',
      schemas: 'src/lib/api/generated/model',
      client: 'react-query',
      mock: false,
      clean: true,
      prettier: true,
      override: {
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
