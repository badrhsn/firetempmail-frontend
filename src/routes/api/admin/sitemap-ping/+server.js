import { json } from '@sveltejs/kit';
import { checkAuth } from '$lib/server/adminAuth.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, platform }) {
    if (!checkAuth(request, platform)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sitemapUrl = 'https://firetempmail.com/sitemap.xml';

    try {
        const res = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
        return json({
            success: true,
            pinged: true,
            status: res.status
        });
    } catch (err) {
        return json({
            success: false,
            pinged: false,
            error: 'Failed to ping Google'
        }, { status: 502 });
    }
}
