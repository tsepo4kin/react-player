import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

const vitePWA = VitePWA({
	registerType: 'autoUpdate',
	outDir: 'dist',
	manifest: {
		name: 'pwa player',
		theme_color: '#eeeeee',
		background_color: '#eeeeee',
		display: 'standalone',
		orientation: 'portrait',
		start_url: '.'
	}
});
export default defineConfig({
	plugins: [react(), vitePWA],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	},
	base: '/pwa-player/'
});
