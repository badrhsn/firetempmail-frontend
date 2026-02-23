import { getAllPosts } from '$lib/data/blogPosts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const siteUrl = 'https://firetempmail.com';
    const posts = getAllPosts();
    const today = new Date().toISOString().split('T')[0];

    // Supported languages for hreflang
    const languages = ['en', 'es', 'de', 'fr', 'pt', 'ar', 'ru', 'zh'];

    // Helper: build localized URL (en = root, others = /lang/path)
    function langUrl(path: string, lang: string): string {
        const prefix = lang === 'en' ? '' : `/${lang}`;
        if (path === '/') return `${siteUrl}${prefix || '/'}`;
        return `${siteUrl}${prefix}${path}`;
    }

    // Helper: generate xhtml:link alternates for a path
    function hreflangLinks(path: string): string {
        return languages.map(lang =>
            `            <xhtml:link rel="alternate" hreflang="${lang}" href="${langUrl(path, lang)}" />`
        ).join('\n') +
        `\n            <xhtml:link rel="alternate" hreflang="x-default" href="${langUrl(path, 'en')}" />`;
    }

    // Static pages - Only unique, non-redirected pages
    const staticPages = [
        { path: '/', priority: '1.0', changefreq: 'daily', lastmod: today },
        { path: '/temp-gmail', priority: '0.9', changefreq: 'weekly', lastmod: today },
        { path: '/email-generator', priority: '0.9', changefreq: 'daily', lastmod: today },
        { path: '/edu-email-generator', priority: '0.9', changefreq: 'daily', lastmod: today },
        { path: '/burner-email', priority: '0.8', changefreq: 'weekly', lastmod: today },
        { path: '/best-temp-mail', priority: '0.9', changefreq: 'weekly', lastmod: today },
        { path: '/10minutemail', priority: '0.8', changefreq: 'weekly', lastmod: today },
        { path: '/temp-mail-edu', priority: '0.8', changefreq: 'weekly', lastmod: today },
        { path: '/temporary-gmail', priority: '0.7', changefreq: 'weekly', lastmod: today },
        { path: '/temporary-email-generator', priority: '0.7', changefreq: 'weekly', lastmod: today },
        { path: '/fire-mail', priority: '0.7', changefreq: 'weekly', lastmod: today },
        { path: '/gmailnator-alternative', priority: '0.7', changefreq: 'weekly', lastmod: today },
        { path: '/gmail-generator', priority: '0.8', changefreq: 'weekly', lastmod: today },
        { path: '/blog', priority: '0.8', changefreq: 'daily', lastmod: today },
        { path: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: today },
        { path: '/about', priority: '0.7', changefreq: 'monthly', lastmod: today },
        { path: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: today },
        { path: '/privacy-policy', priority: '0.5', changefreq: 'monthly', lastmod: today },
        { path: '/terms', priority: '0.5', changefreq: 'monthly', lastmod: today },
        { path: '/advertising', priority: '0.4', changefreq: 'monthly', lastmod: today }
    ];

    // Build static page URLs with hreflang for each language
    const staticUrls = staticPages.flatMap(page => {
        // English (root) URL entry with hreflang
        const entries = [`
        <url>
            <loc>${langUrl(page.path, 'en')}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
${hreflangLinks(page.path)}
        </url>`];

        // Non-English language URLs
        for (const lang of languages) {
            if (lang === 'en') continue;
            entries.push(`
        <url>
            <loc>${langUrl(page.path, lang)}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${(parseFloat(page.priority) * 0.9).toFixed(1)}</priority>
${hreflangLinks(page.path)}
        </url>`);
        }
        return entries;
    }).join('');

    // Blog post URLs with hreflang
    const blogUrls = posts.flatMap(post => {
        const blogPath = `/blog/${post.slug}`;
        const entries = [`
        <url>
            <loc>${langUrl(blogPath, 'en')}</loc>
            <lastmod>${post.date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
${hreflangLinks(blogPath)}
        </url>`];

        for (const lang of languages) {
            if (lang === 'en') continue;
            entries.push(`
        <url>
            <loc>${langUrl(blogPath, lang)}</loc>
            <lastmod>${post.date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
${hreflangLinks(blogPath)}
        </url>`);
        }
        return entries;
    }).join('');

    // Build XML with xhtml namespace for hreflang
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
