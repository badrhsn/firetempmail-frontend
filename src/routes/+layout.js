import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import { isSupported, defaultLocale } from '$lib/i18n/lang.js';

// Enable SSR globally, but let individual pages opt into prerendering
export const ssr = true;
export const csr = true;

/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {
    // Extract language from URL path BEFORE any component renders.
    // This ensures svelte-i18n has the correct locale loaded for SSR.
    const firstSegment = url.pathname.split('/')[1];
    const lang = (firstSegment && isSupported(firstSegment) && firstSegment !== defaultLocale)
        ? firstSegment
        : defaultLocale;

    locale.set(lang);
    await waitLocale(lang);

    return { lang };
}
