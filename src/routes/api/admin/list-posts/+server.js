import { json } from '@sveltejs/kit';
import { checkAuth } from '$lib/server/adminAuth.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, platform, url }) {
    if (!checkAuth(request, platform)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50', 10)));
    const offset = (page - 1) * limit;
    const platformFilter = url.searchParams.get('platform') || '';
    const langFilter = url.searchParams.get('lang') || '';

    const db = platform.env.BLOG_DB;

    // Build query with optional filters
    let where = [];
    let binds = [];

    if (platformFilter) {
        where.push('platform = ?');
        binds.push(platformFilter);
    }
    if (langFilter) {
        where.push('lang = ?');
        binds.push(langFilter);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM posts ${whereClause}`;
    const countStmt = db.prepare(countQuery);
    const { total } = await (binds.length > 0 ? countStmt.bind(...binds) : countStmt).first();

    // Get posts
    const postsQuery = `SELECT id, title, slug, platform, lang, published, created_at FROM posts ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const postsStmt = db.prepare(postsQuery);
    const { results } = await postsStmt.bind(...binds, limit, offset).all();

    return json({
        posts: results,
        total,
        page
    });
}
