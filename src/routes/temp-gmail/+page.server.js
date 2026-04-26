import { SEO_META, OG_LOCALES } from './_seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
    const lang = params.lang || 'en';
    const seoByLang = SEO_META[lang] || SEO_META['en'];
    const canonical = lang === 'en'
        ? 'https://firetempmail.com/temp-gmail'
        : `https://firetempmail.com/${lang}/temp-gmail`;

    return {
        seo: {
            title: seoByLang.title,
            description: seoByLang.description,
            keywords: seoByLang.keywords,
            canonical,
            lang,
            ogLocale: OG_LOCALES[lang] || 'en_US'
        }
    };
}
