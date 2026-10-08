import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import markdownPostsPlugin from './vite-plugin-posts.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), markdownPostsPlugin()],
})

