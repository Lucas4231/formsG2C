import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    allowedHosts: ['formsg2c.onrender.com']
  },
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    allowedHosts: ['formsg2c.onrender.com']
  },
  define: {
    'process.env': {
      VITE_CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
      VITE_CLOUDINARY_API_KEY: JSON.stringify(process.env.VITE_CLOUDINARY_API_KEY),
      VITE_CLOUDINARY_API_SECRET: JSON.stringify(process.env.VITE_CLOUDINARY_API_SECRET)
    }
  },
  resolve: {
    alias: {
      'cloudinary': 'cloudinary/lib/cloudinary'
    }
  }
})
