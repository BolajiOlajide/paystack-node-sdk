import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    minWorkers: 1,
    maxWorkers: process.env.CI ? 1 : 10,
    coverage: {
      enabled: false, // TODO: Enable coverage so we can see which files are not being tested
      reporter: ['text'],
    },
  },
});
