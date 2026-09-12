/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
    const sitemap = 'https://firetempmail.com/sitemap.xml';

    const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${sitemap}`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}
