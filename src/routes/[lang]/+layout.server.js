import { error } from '@sveltejs/kit';
import { isSupported, defaultLocale } from '$lib/i18n/lang.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    const lang = params.lang;

    // Block invalid language codes
    if (!isSupported(lang) || lang === defaultLocale) {
        throw error(404, 'Not found');
    }

    return { lang };
}
