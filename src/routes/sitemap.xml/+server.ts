import { getAllPosts } from '$lib/data/blogPosts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const siteUrl = 'https://firetempmail.com'; // 🔥 change to your domain
    const posts = getAllPosts();

    // Static pages (like in your current sitemap)
    const staticPages = [
        { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/email-generator`, priority: '0.9', changefreq: 'daily', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/gmail-generator`, priority: '0.9', changefreq: 'daily', lastmod: '2025-09-18' },
        { loc: `${siteUrl}/best-temp-mail`, priority: '0.9', changefreq: 'daily', lastmod: '2025-10-05' },
        { loc: `${siteUrl}/temp-gmail`, priority: '0.9', changefreq: 'daily', lastmod: '2025-09-20' },
        { loc: `${siteUrl}/temporary-gmail`, priority: '0.9', changefreq: 'daily', lastmod: '2025-09-20' },
        { loc: `${siteUrl}/edu-email-generator`, priority: '0.9', changefreq: 'daily', lastmod: '2025-09-06' },
        { loc: `${siteUrl}/10minutemail`, priority: '0.9', changefreq: 'daily', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/temp-mail-edu`, priority: '0.9', changefreq: 'daily', lastmod: '2025-08-29' },
        { loc: `${siteUrl}/privacy-policy`, priority: '0.3', changefreq: 'monthly', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/terms`, priority: '0.3', changefreq: 'monthly', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/faq`, priority: '0.3', changefreq: 'monthly', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/contact`, priority: '0.3', changefreq: 'monthly', lastmod: '2025-08-27' },
        { loc: `${siteUrl}/blog`, priority: '0.8', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] }
    ];

    // Blog posts
    const blogUrls = posts.map(post => `
        <url>
            <loc>${siteUrl}/blog/${post.slug}</loc>
            <lastmod>${post.date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
    `).join('');

    // Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages.map(page => `
            <url>
                <loc>${page.loc}</loc>
                <lastmod>${page.lastmod}</lastmod>
                <changefreq>${page.changefreq}</changefreq>
                <priority>${page.priority}</priority>
            </url>
        `).join('')}
        ${blogUrls}
    </urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
};
