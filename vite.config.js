import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE: '/' for a user site (Ayush-Patel-10.github.io), or '/<repo>/' for a project site.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE || '/',
})
