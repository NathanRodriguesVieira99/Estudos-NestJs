import { resolve } from 'path';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		root: './',
		environment: 'node',
		coverage: {
			reportsDirectory: './coverage',
			reporter: ['text', 'html', 'lcov', 'cobertura'],
			provider: 'v8',
			include: ['**/*.spec.ts'],
			exclude: [
				'**/*.test.{ts,js}',
				'**/*.spec.{ts,js}',
				'**/types/**',
				'**/*.d.ts',
				'**/mocks/**',
				'**/*.test-utils.{ts,js}',
				'src/main.ts',
				'**/*.module.ts',
			],
		},
	},
	plugins: [
		tsConfigPaths(),
		swc.vite({
			module: { type: 'es6' },
		}),
	],
	resolve: {
		alias: {
			src: resolve(__dirname, './src'),
		},
	},
});
