import { getAllPosts } from '$lib/data/blogPosts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const siteUrl = 'https://firetempmail.com';
    const posts = getAllPosts();
    const today = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
        { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/email-generator`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/gmail-generator`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/best-temp-mail`, priority: '0.9', changefreq: 'weekly', lastmod: today },
        { loc: `${siteUrl}/temp-gmail`, priority: '0.9', changefreq: 'weekly', lastmod: today },
        { loc: `${siteUrl}/temporary-gmail`, priority: '0.9', changefreq: 'weekly', lastmod: today },
        { loc: `${siteUrl}/edu-email-generator`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/10minutemail`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/temp-mail-edu`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/fire-mail`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/gmailnator-alternative`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/temporary-email-generator`, priority: '0.9', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/burner-email`, priority: '0.8', changefreq: 'weekly', lastmod: today },
        { loc: `${siteUrl}/blog`, priority: '0.8', changefreq: 'daily', lastmod: today },
        { loc: `${siteUrl}/faq`, priority: '0.7', changefreq: 'monthly', lastmod: today },
        { loc: `${siteUrl}/contact`, priority: '0.6', changefreq: 'monthly', lastmod: today },
        { loc: `${siteUrl}/privacy-policy`, priority: '0.5', changefreq: 'monthly', lastmod: today },
        { loc: `${siteUrl}/terms`, priority: '0.5', changefreq: 'monthly', lastmod: today },
        { loc: `${siteUrl}/advertising`, priority: '0.4', changefreq: 'monthly', lastmod: today }
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
