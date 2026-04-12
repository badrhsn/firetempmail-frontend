/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://firetempmail.com/sitemap.xml`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}
