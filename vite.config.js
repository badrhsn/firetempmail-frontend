import { sveltekit } from '@sveltejs/kit/vite';

/**
 * Vite configuration
 * NOTE: PurgeCSS temporarily removed due to build error ("purgecss is not a function").
 * We'll re-introduce a safer CSS pruning strategy after stabilizing the build.
 * For now rely on default minification.
 * If you need PostCSS plugins, add a `postcss.config.js` entry (plugin currently commented out there).
 */
const config = {
	plugins: [sveltekit()]
};

export default config;
