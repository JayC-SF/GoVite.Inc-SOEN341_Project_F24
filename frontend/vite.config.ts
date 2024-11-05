import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config'; // Import Vitest config helper

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Optional setup file
  },
})
