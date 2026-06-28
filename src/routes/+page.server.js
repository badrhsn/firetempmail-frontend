import { getHomeSeo } from '$lib/i18n/home-seo.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ platform }) {
    const seo = getHomeSeo('en');
    const canonical = 'https://firetempmail.com';
    const db = platform.env.BLOG_DB;
    const { results: popularArticles } = await db.prepare(
        `SELECT title, slug, excerpt, category, read_time AS readTime
         FROM posts
         WHERE published = 1
         ORDER BY created_at DESC
         LIMIT 10`
    ).all();

    return {
        popularArticles,
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
