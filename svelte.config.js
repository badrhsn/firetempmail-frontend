// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Use the Cloudflare adapter
		adapter: adapter(),

		// Enable SSR to render HTML in the source
		ssr: true,

		// Optional: If deploying on a subdirectory or specific routes
		// paths: {
		//     base: '/frontend'
		// }
	}
};

export default config;
