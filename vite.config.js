import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'MediPulse Specialty Hospital',
        short_name: 'MediPulse',
        description: 'Schedule appointments with top specialist doctors quickly and securely',
        theme_color: '#008080',
        background_color: '#f4f7f6',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate node_modules vendor libraries into their own cached chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('redux') || id.includes('router')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});