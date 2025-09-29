import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],

  // Build optimizations
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,

    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router', 'react-router-dom'],
          ui: ['antd', 'react-bootstrap'],
          charts: ['apexcharts', 'react-apexcharts'],
          calendar: ['@fullcalendar/react', 'fullcalendar']
        }
      }
    },

    // Compression and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },

  // Path resolution
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@/assets': fileURLToPath(new URL('./public/assets', import.meta.url))
    }
  },

  // Server configuration
  server: {
    port: 3000,
    host: true,
    open: true
  },

  // Preview configuration
  preview: {
    port: 4173,
    host: true
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})
