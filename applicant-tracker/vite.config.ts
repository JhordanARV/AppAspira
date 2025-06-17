import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this test configuration for Vitest
  test: {
    globals: true, // Optional: to use Vitest APIs globally like Jest
    environment: 'jsdom', // Use jsdom for DOM testing
    setupFiles: './src/test/setup.ts', // Optional: for global test setup
    css: true, // Optional: if you need to process CSS in tests
  },
});
