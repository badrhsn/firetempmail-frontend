import { getAllPosts } from '$lib/data/blogPosts';

export async function GET() {
    const baseUrl = 'https://firetempmail.com';
    const currentDate = new Date().toISOString().split('T')[0];
    const blogPosts = getAllPosts();
    
    const pages = [
        {
            url: '/',
            lastmod: currentDate,
            changefreq: 'daily',
            priority: '1.0'
        },
        {
            url: '/privacy',
            lastmod: '2023-10-20',
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            url: '/terms',
            lastmod: '2023-10-20',
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            url: '/faq',
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '0.7'
        },
        {
            url: '/contact',
            lastmod: '2023-10-20',
            changefreq: 'monthly',
            priority: '0.6'
        },
        {
            url: '/advertising',
            lastmod: '2023-10-20',
            changefreq: 'monthly',
            priority: '0.5'
        },
        {
            url: '/blog',
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '0.7'
        }
    ];
    
    // Add blog posts to sitemap
    blogPosts.forEach(post => {
        pages.push({
            url: `/blog/${post.slug}`,
            lastmod: post.date,
            changefreq: 'monthly',
            priority: '0.6'
        });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
    `).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}