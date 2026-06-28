import adsTxt from '$lib/server/ads.txt?raw';

/** @type {import('./$types').RequestHandler} */
export function GET() {
    return new Response(adsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=300, must-revalidate'
        }
    });
}
