/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const body = `User-agent: *
Allow: /
Allow: /en/
Allow: /fr/
Allow: /de/
Allow: /es/
Allow: /it/
Allow: /pt/
Allow: /nl/
Allow: /pl/
Allow: /ru/
Allow: /ar/
Allow: /blog/
Disallow: /api/
Disallow: /admin/

Sitemap: https://firetempmail.com/sitemap.xml`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}
