import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    },
    resolve: {
      alias: {
        'next/router': 'react-router-dom',
        'next/link': 'react-router-dom',
      }
    }
  }
})
