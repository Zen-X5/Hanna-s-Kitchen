import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Base public path when served in production.
  // Change this if your app is deployed under a subpath, e.g., '/app/'
  base: '/',

  // Build options for production
  build: {
    outDir: 'dist',          // default output directory for production build
    sourcemap: false,        // disable sourcemaps in production for smaller build
    minify: 'esbuild',       // default minifier, fast and efficient
    rollupOptions: {
      // You can add manual chunking or other Rollup options here if needed
    }
  },

  // No need for dev server config in production build
  // Proxy and server options are only for development
})
