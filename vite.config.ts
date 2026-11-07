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
  server: {
    port: 5174,
    // Solo el CMS puede embeber la landing (preview del editor)
    headers: {
      'Content-Security-Policy': 'frame-ancestors http://localhost:5173',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 4173,
    headers: {
      'Content-Security-Policy': 'frame-ancestors http://localhost:5173',
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // El bridge solo debe cargarse con ?cms-preview=1 en iframe — nunca preload al visitante
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('cms-bridge')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/features/cms-bridge/')) {
            return 'cms-bridge'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
