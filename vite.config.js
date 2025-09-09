import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [
				purgecss({
					content: ['./src/**/*.svelte', './src/app.html'],
					safelist: {
						standard: ['html', 'body', /data-bs-theme/]
					}
				})
			]
		}
	}
});
