import type { RequestHandler } from './$types';
import { iptvPosts } from '$lib/data/iptvPosts.js';

const SITE_URL = 'https://iptvsmarterspro.firetempmail.com';
const LASTMOD = '2026-07-18';

export const GET: RequestHandler = async () => {
    const urls = [
        {
            loc: `${SITE_URL}/`,
            changefreq: 'weekly',
            priority: '1.0'
        },
        {
            loc: `${SITE_URL}/blog/`,
            changefreq: 'weekly',
            priority: '0.9'
        },
        ...iptvPosts.flatMap((post) => [
            {
                loc: `${SITE_URL}/blog/${post.slug}/`,
                changefreq: 'monthly',
                priority: '0.8'
            },
            {
                loc: `${SITE_URL}/${post.slug}/`,
                changefreq: 'monthly',
                priority: '0.7'
            }
        ])
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${LASTMOD}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
};
