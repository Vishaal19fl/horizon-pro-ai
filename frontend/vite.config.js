import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/github-details': 'http://localhost:8000',
      '/api': 'http://localhost:8000'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
})
