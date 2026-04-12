import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, platform }) {
    const token = cookies.get('admin_token');
    const secret = platform.env.API_SECRET;

    if (!token || token !== secret) {
        throw redirect(302, '/admin/login');
    }

    const db = platform.env.BLOG_DB;

    const { results } = await db.prepare(
        `SELECT id, title, slug, platform, category, lang, published, created_at
         FROM posts ORDER BY created_at DESC`
    ).all();

    const { total } = await db.prepare('SELECT COUNT(*) as total FROM posts').first();

    return { posts: results, total };
}
