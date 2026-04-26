import { getHomeSeo } from '$lib/i18n/home-seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const seo = getHomeSeo('en');
    const canonical = 'https://firetempmail.com';

    return {
        seo: {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
            canonical,
            lang: seo.lang,
            ogLocale: seo.ogLocale
        }
    };
}
