import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: ['c07afe90-d3b5-4483-9270-ddf7ec447368-00-1hmaup0ai5uy9.kirk.replit.dev', 'localhost', '127.0.0.1']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})
