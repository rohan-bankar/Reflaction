import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
        '/api/v1':'http://localhost:8000'
    },
    // optimizeDeps: {
    //   include: ['jwt-decode']
    // }
  },
  
  plugins: [react()],
})