import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

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
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/core': resolve(__dirname, 'src/core'),
      '@/assets': resolve(__dirname, 'public/assets')
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
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
