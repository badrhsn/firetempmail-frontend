import { getHomeSeo } from '$lib/i18n/home-seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const seo = getHomeSeo(params.lang || 'en');
    const canonical = seo.lang === 'en'
        ? 'https://firetempmail.com'
        : `https://firetempmail.com/${seo.lang}`;

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
