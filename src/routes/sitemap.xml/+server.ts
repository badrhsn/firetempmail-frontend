import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';
const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ar'];
const TODAY = '2026-04-16';

export const GET: RequestHandler = async () => {
    const sitemaps = [
        ...SUPPORTED_LOCALES.map(lang =>
            `    <sitemap>
        <loc>${SITE_URL}/sitemap-${lang}.xml</loc>
        <lastmod>${TODAY}</lastmod>
    </sitemap>`
        ),
        `    <sitemap>
        <loc>${SITE_URL}/sitemap-blog.xml</loc>
        <lastmod>${TODAY}</lastmod>
    </sitemap>`
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
