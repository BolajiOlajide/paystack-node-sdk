import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    minWorkers: 1,
    maxWorkers: process.env.CI ? 1 : 10,
  },
});
