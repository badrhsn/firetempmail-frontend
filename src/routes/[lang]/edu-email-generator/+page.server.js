import { SEO_META, OG_LOCALES } from '../../edu-email-generator/_seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const lang = params.lang || 'en';
    const seo = SEO_META[lang] || SEO_META['en'];
    const canonical = `https://firetempmail.com/${lang}/edu-email-generator`;

    return {
        seo: {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
            canonical,
            lang,
            ogLocale: OG_LOCALES[lang] || 'en_US'
        }
    };
}
