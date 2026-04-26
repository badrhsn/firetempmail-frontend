/** @type {import('./$types').PageServerLoad} */
export async function load({ platform, url }) {
    const db = platform.env.BLOG_DB;
    const { results } = await db.prepare(
        `SELECT id, title, slug, excerpt, category, read_time, author, created_at
         FROM posts WHERE published = 1 ORDER BY created_at DESC`
    ).all();

    const initialQuery = (url.searchParams.get('q') || '').trim().slice(0, 100);

    return {
        posts: results,
        initialQuery,
        seo: {
            title: 'Blog - Privacy & Email Tips | Fire Temp Mail',
            description: 'Read our blog for tips on email privacy, online security, and using temporary email addresses effectively.',
            keywords: 'email privacy blog, temporary email tips, online security',
            canonical: 'https://firetempmail.com/blog'
        }
    };
}
