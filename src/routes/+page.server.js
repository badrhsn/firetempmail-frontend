/** @type {import('./$types').PageServerLoad} */
export async function load({ platform }) {
    const db = platform.env.BLOG_DB;
    const { results } = await db.prepare(
        `SELECT id, title, slug, excerpt, category, read_time, author, created_at
         FROM posts WHERE published = 1 ORDER BY created_at DESC`
    ).all();

    return {
        posts: results,
        seo: {
            title: 'Fire Temp Mail - Free Temporary Email | Privacy & Security Blog',
            description: 'Free disposable email service. Expert guides on temporary email, email privacy, spam protection, and online security.',
            keywords: 'temp mail, temporary email, disposable email, email privacy, online security',
            canonical: 'https://firetempmail.com/'
        }
    };
}
