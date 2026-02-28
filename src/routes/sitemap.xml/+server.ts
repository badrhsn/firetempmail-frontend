import { getAllPosts } from '$lib/data/blogPosts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const siteUrl = 'https://firetempmail.com';
    const posts = getAllPosts();

    // ---------------------------------------------------------------
    // SITEMAP STRATEGY (Phase 1 — English only)
    //
    // Why English-only?
    //   1. Localized blog posts serve English content → near-duplicate.
    //   2. Localized static pages are only partially translated → thin.
    //   3. A 384-URL sitemap overwhelms crawl budget for a young site.
    //   4. HTML <link rel="alternate" hreflang> on every page already
    //      tells Google about every language variant — the sitemap
    //      doesn't need to duplicate that signal.
    //
    // Once the English pages are indexed and the site builds authority,
    // localized URLs can be added back (Phase 2).
    // ---------------------------------------------------------------

    // Static pages — English canonical URLs only (20 pages)
    const staticPages = [
        { path: '/',                        priority: '1.0', changefreq: 'daily',   lastmod: '2026-02-28' },
        { path: '/temp-gmail',              priority: '0.9', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/email-generator',         priority: '0.9', changefreq: 'daily',   lastmod: '2026-02-28' },
        { path: '/edu-email-generator',     priority: '0.9', changefreq: 'daily',   lastmod: '2026-02-28' },
        { path: '/burner-email',            priority: '0.8', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/best-temp-mail',          priority: '0.9', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/10minutemail',            priority: '0.8', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/temp-mail-edu',           priority: '0.8', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/temporary-gmail',         priority: '0.7', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/temporary-email-generator', priority: '0.7', changefreq: 'weekly', lastmod: '2026-02-28' },
        { path: '/fire-mail',               priority: '0.7', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/gmailnator-alternative',  priority: '0.7', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/gmail-generator',         priority: '0.8', changefreq: 'weekly',  lastmod: '2026-02-28' },
        { path: '/blog',                    priority: '0.8', changefreq: 'daily',   lastmod: '2026-02-28' },
        { path: '/faq',                     priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-28' },
        { path: '/about',                   priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-28' },
        { path: '/contact',                 priority: '0.6', changefreq: 'monthly', lastmod: '2026-02-28' },
        { path: '/privacy-policy',          priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-28' },
        { path: '/terms',                   priority: '0.5', changefreq: 'monthly', lastmod: '2026-02-28' },
        { path: '/advertising',             priority: '0.4', changefreq: 'monthly', lastmod: '2026-02-28' }
    ];

    // Build static page URL entries
    const staticUrls = staticPages.map(page => `
        <url>
            <loc>${siteUrl}${page.path === '/' ? '/' : page.path}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
        </url>`).join('');

    // Blog post URL entries — English only (28 posts)
    const blogUrls = posts.map(post => `
        <url>
            <loc>${siteUrl}/blog/${post.slug}</loc>
            <lastmod>${post.date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>`).join('');

    // Build clean XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${blogUrls}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600'
        }
    });
};
