import { json } from '@sveltejs/kit';
import { checkAuth } from '$lib/server/adminAuth.js';

const ALLOWED_FIELDS = ['title', 'excerpt', 'content', 'category', 'platform', 'lang', 'meta_title', 'meta_description', 'read_time', 'published', 'author'];

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, platform }) {
    if (!checkAuth(request, platform)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { slug, ...fields } = body;

    if (!slug) {
        return json({ error: 'slug is required' }, { status: 400 });
    }

    const db = platform.env.BLOG_DB;

    // Check post exists
    const existing = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first();
    if (!existing) {
        return json({ error: 'Post not found' }, { status: 404 });
    }

    // Build dynamic SET clause from provided fields
    const setClauses = [];
    const values = [];

    for (const [key, value] of Object.entries(fields)) {
        if (ALLOWED_FIELDS.includes(key)) {
            setClauses.push(`${key} = ?`);
            values.push(value);
        }
    }

    if (setClauses.length === 0) {
        return json({ error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(slug);
    await db.prepare(
        `UPDATE posts SET ${setClauses.join(', ')} WHERE slug = ?`
    ).bind(...values).run();

    return json({
        success: true,
        post: { id: existing.id, slug }
    });
}
