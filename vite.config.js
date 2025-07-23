import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    global: 'globalThis',
    process: { version: 'globalThis' }
  }
})
