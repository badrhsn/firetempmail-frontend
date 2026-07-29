/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
    // Always point robots to the main FireTempMail sitemap to avoid exposing the IPTV section
    const sitemap = 'https://firetempmail.com/sitemap.xml';

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

Sitemap: ${sitemap}`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}
