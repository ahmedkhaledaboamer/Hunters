import { defineConfig } from 'vitest/config'

// Unit tests: pure logic and data checks, no browser. E2E lives in e2e/ (Playwright).
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
