import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://gateway.dev.dataverse.art/v1/dapp-table/graphql",
  documents: "src/**/*.gql",
  generates: {
    "src/__generated__/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        field: true,
        inputValue: true,
        object: true,
        defaultValue: true,
      },
    },
  },
};
export default config;
