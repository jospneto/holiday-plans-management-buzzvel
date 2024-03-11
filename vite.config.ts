import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
