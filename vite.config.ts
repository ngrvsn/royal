import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/royal',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'market-block': ['/src/components/get-market-block/GetMarketBlock']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@components/get-market-block/GetMarketBlock']
  }
})
