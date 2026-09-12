import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';

const PAGES = [
    { path: '/api', priority: '0.8', changefreq: 'weekly' },
];

export const GET: RequestHandler = async () => {
    const urls = PAGES.map((page) => `
    <url>
        <loc>${SITE_URL}${page.path}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('');

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
