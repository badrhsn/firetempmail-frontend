import { json } from '@sveltejs/kit';
import { checkAuth } from '$lib/server/adminAuth.js';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request, platform }) {
    if (!checkAuth(request, platform)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { slug } = body;

    if (!slug) {
        return json({ error: 'slug is required' }, { status: 400 });
    }

    const db = platform.env.BLOG_DB;

    // Check post exists
    const existing = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first();
    if (!existing) {
        return json({ error: 'Post not found' }, { status: 404 });
    }

    await db.prepare('DELETE FROM posts WHERE slug = ?').bind(slug).run();

    return json({ success: true, deleted: slug });
}
