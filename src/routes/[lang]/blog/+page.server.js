/** @type {import('./$types').PageServerLoad} */
export async function load({ params, platform }) {
    const db = platform.env.BLOG_DB;
    const { results } = await db.prepare(
        `SELECT id, title, slug, excerpt, category, platform, read_time, author, lang, created_at
         FROM posts WHERE published = 1 ORDER BY created_at DESC`
    ).all();

    return {
        posts: results,
        lang: params.lang,
        seo: {
            title: 'Blog - Privacy & Email Tips | Fire Temp Mail',
            description: 'Read our blog for tips on email privacy, online security, and using temporary email addresses effectively.',
            keywords: 'email privacy blog, temporary email tips, online security',
            canonical: `https://firetempmail.com/${params.lang}/blog`
        }
    };
}
