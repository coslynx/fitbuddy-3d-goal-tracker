import { defineConfig, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

try {
	export default defineConfig((): UserConfigExport => {
		return {
			plugins: [react()],
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
				},
			},
			build: {
				outDir: './dist',
				assetsDir: 'assets',
				minify: 'terser',
				rollupOptions: {
					output: {
						entryFileNames: 'assets/[name]-[hash].js',
						chunkFileNames: 'assets/[name]-[hash].js',
						assetFileNames: 'assets/[name]-[hash].[ext]',
					},
				},
			},
			server: {
				port: 3000,
				hmr: true,
				https: false,
			},
			define: {
				'import.meta.env.VITE_THREE_MODEL_PATH': JSON.stringify(process.env.VITE_THREE_MODEL_PATH || '/models/hero-model.glb'),
				'import.meta.env.VITE_APP_NAME': JSON.stringify(process.env.VITE_APP_NAME || 'FitnessTracker3D'),
			},
		}
	})
} catch (error: any) {
	console.error('Vite configuration error:', error.message)
	console.error('Stack trace:', error.stack)
	process.exit(1)
}