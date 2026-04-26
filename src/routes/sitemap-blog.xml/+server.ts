import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';

export const GET: RequestHandler = async ({ platform }) => {
    const db = platform.env.BLOG_DB;

    const { results: posts } = await db.prepare(
        `SELECT slug, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC`
    ).all();

    const urls = posts.map(post => {
        const lastmod = post.created_at ? post.created_at.split(/[T ]/)[0] : '2026-02-28';
        return `
        <url>
            <loc>${SITE_URL}/blog/${post.slug}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`;
    }).join('');

    // Add /blog index page
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${SITE_URL}/blog</loc>
            <lastmod>2026-04-16</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
        </url>
    ${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
