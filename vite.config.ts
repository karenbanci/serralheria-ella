import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Configure base for GitHub Pages
  // Se seu repo se chama 'serralheria-ella', a base será '/serralheria-ella/'
  // Se for username.github.io, deixe base como '/'
  // base: process.env.GITHUB_PAGES ? '/serralheria-ella/' : '/',
  base: '/serralheria-ella/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
