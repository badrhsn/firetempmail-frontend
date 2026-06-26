import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';

const NOINDEX_BLOG_SLUGS = [
    'temp-mail-for-amazon-prime',
    'why-temp-student-gmail-accounts-popular',
    'temporary-email-for-free-trials',
    'temp-email-for-free-trials',
    'instagram-temp-mail-sign-up-without-personal-email',
    'tiktok-temporary-email-guide-avoid-spam-signups',
    'temp-email-for-ai-tools',
    'temp-email-for-ai-video-tools',
    'temp-email-for-gaming-platforms',
    'temp-email-for-vpn-services',
    'temp-email-for-chatgpt',
    'temp-email-for-claude',
    'temp-email-for-freepik',
    'temp-email-for-canva',
    'temp-email-for-adobe',
    'temp-email-for-tumblr',
    'temp-email-for-pinterest',
    'temp-email-for-kick',
    'temp-email-for-aliexpress',
    'temp-email-for-reddit',
    'temp-email-for-notion',
    'temp-email-for-spotify'
];

export const GET: RequestHandler = async ({ platform }) => {
    const db = platform.env.BLOG_DB;

    const { results: posts } = await db.prepare(
        `SELECT slug, created_at
         FROM posts
         WHERE published = 1
           AND slug NOT IN (${NOINDEX_BLOG_SLUGS.map(() => '?').join(',')})
         ORDER BY created_at DESC`
    ).bind(...NOINDEX_BLOG_SLUGS).all();

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
