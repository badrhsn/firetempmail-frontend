/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
    const host = request.headers.get('host')?.split(':')[0];
    const sitemap = host === 'iptvsmarterspro.firetempmail.com'
        ? 'https://iptvsmarterspro.firetempmail.com/sitemap-iptv.xml'
        : 'https://firetempmail.com/sitemap.xml';

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
