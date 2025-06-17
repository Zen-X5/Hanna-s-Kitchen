import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Useful only in local development to avoid CORS
      '/api': {
        target: 'http://localhost:8080', // your local backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
