import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';
const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ar', 'zh'];

export const GET: RequestHandler = async () => {
    const sitemaps = [
        ...SUPPORTED_LOCALES.map(lang =>
            `    <sitemap>
        <loc>${SITE_URL}/sitemap-${lang}.xml</loc>
    </sitemap>`
        ),
        `    <sitemap>
        <loc>${SITE_URL}/sitemap-blog.xml</loc>
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
