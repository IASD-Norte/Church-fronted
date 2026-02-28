import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // aumenta el límite de advertencia a 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // separa todas las librerías de node_modules en un chunk 'vendor'
            return 'vendor';
          }
          // puedes agregar más reglas aquí si quieres chunks específicos
        }
      }
    }
  }
})
