import { SEO_META, OG_LOCALES } from './_seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const lang = 'en';
    const seo = SEO_META.en;
    const canonical = 'https://firetempmail.com';

    return {
        seo: {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
            canonical,
            lang,
            ogLocale: OG_LOCALES.en || 'en_US'
        }
    };
}
