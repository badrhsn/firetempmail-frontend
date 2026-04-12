import { json } from '@sveltejs/kit';
import { checkAuth } from '$lib/server/adminAuth.js';

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, platform }) {
    if (!checkAuth(request, platform)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { title, slug, excerpt, content, category, platform: postPlatform, lang, meta_title, meta_description, read_time, published } = body;

    // Validate required fields
    if (!title || !slug) {
        return json({ error: 'title and slug are required' }, { status: 400 });
    }

    // Validate slug format
    if (!SLUG_REGEX.test(slug)) {
        return json({ error: 'slug must be lowercase with hyphens only (e.g. my-post-title)' }, { status: 400 });
    }

    const db = platform.env.BLOG_DB;

    // Check if slug already exists
    const existing = await db.prepare('SELECT id FROM posts WHERE slug = ?').bind(slug).first();
    if (existing) {
        return json({ error: 'Slug already exists' }, { status: 409 });
    }

    // Insert post
    const result = await db.prepare(
        `INSERT INTO posts (title, slug, excerpt, content, category, platform, lang, meta_title, meta_description, read_time, published, author)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        title,
        slug,
        excerpt || '',
        content || '',
        category || 'Guides',
        postPlatform || null,
        lang || 'en',
        meta_title || title,
        meta_description || excerpt || '',
        read_time || '5 min read',
        published ?? 1,
        'Fire Temp Mail Team'
    ).run();

    return json({
        success: true,
        post: { id: result.meta.last_row_id, slug }
    }, { status: 201 });
}
