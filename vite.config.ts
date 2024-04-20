import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

const vitePWA = VitePWA({
	registerType: 'autoUpdate',
	outDir: 'dist',
	workbox: {
		globDirectory: 'dist/',
		globPatterns: ['**/*.{js,css,html,png,svg}'],
		swDest: 'dist/sw.js',
    runtimeCaching: [
      {
				urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'font-awesome-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
	manifest: {
		name: 'pwa player',
		theme_color: '#eeeeee',
		background_color: '#eeeeee',
		display: 'standalone',
		orientation: 'portrait',
		start_url: '.',
		icons: [
			{
				src: 'img/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: 'img/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			}
		]
	}
});
export default defineConfig({
	plugins: [react(), vitePWA],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	},
	// base: '/pwa-player/'
});
