import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // This makes the dev server accessible over the network
    port: 5173,           // Optional: specify a fixed port (default is 5173)
  },
})
