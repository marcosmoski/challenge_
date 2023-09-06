import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "./**/*.spec.ts",
      "./*.spec.ts",
      "./**/**/*.spec.ts",
      "./**/**/**/*.spec.ts",
      "./**/*.vitest.ts",
      "./*.vitest.ts",
      "./**/**/*.vitest.ts",
      "./**/**/**/*.vitest.ts",
    ],
    reporters: ["junit", "basic"],
    outputFile: {
      junit: "reports/unit-report-vi.xml",
    },
    coverage: {
      reportsDirectory: "coverage-vi",
      reporter: ["cobertura", "html"],
    },
  },
});
