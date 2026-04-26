import type { RequestHandler } from './$types';

const SITE_URL = 'https://firetempmail.com';
const SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'ar'];

// Service pages that have localized versions
const SERVICE_PAGES = [
    { path: '/',                    priority: '1.0', changefreq: 'daily',   lastmod: '2026-04-16' },
    { path: '/temp-gmail',          priority: '0.9', changefreq: 'weekly',  lastmod: '2026-04-16' },
    { path: '/email-generator',     priority: '0.9', changefreq: 'daily',   lastmod: '2026-04-16' },
    { path: '/edu-email-generator', priority: '0.9', changefreq: 'daily',   lastmod: '2026-04-16' },
    { path: '/burner-email',        priority: '0.8', changefreq: 'weekly',  lastmod: '2026-04-16' },
    { path: '/best-temp-mail',      priority: '0.9', changefreq: 'weekly',  lastmod: '2026-04-16' },
    { path: '/faq',                 priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-28' },
    { path: '/about',               priority: '0.7', changefreq: 'monthly', lastmod: '2026-04-16' },
    { path: '/contact',             priority: '0.6', changefreq: 'monthly', lastmod: '2026-02-28' },
    { path: '/privacy-policy',      priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-28' },
    { path: '/terms',               priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-28' },
];

export const GET: RequestHandler = async ({ params }) => {
    const lang = params.lang;

    if (!SUPPORTED_LOCALES.includes(lang)) {
        return new Response('Not found', { status: 404 });
    }

    const langUrl = (path: string) => {
        if (lang === 'en') return `${SITE_URL}${path}`;
        return path === '/' ? `${SITE_URL}/${lang}` : `${SITE_URL}/${lang}${path}`;
    };

    const hreflangLinks = (path: string) => SUPPORTED_LOCALES.map(l => {
        const href = l === 'en' ? `${SITE_URL}${path}` : (path === '/' ? `${SITE_URL}/${l}` : `${SITE_URL}/${l}${path}`);
        return `            <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />`;
    }).concat(
        `            <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}" />`
    ).join('\n');

    const urls = SERVICE_PAGES.map(page => `
        <url>
            <loc>${langUrl(page.path)}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
${hreflangLinks(page.path)}
        </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
