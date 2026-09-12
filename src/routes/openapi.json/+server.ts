import type { RequestHandler } from './$types';

const API_SPEC_URL = 'https://firetempmail-api.badr-hsn96.workers.dev/openapi.json';

/** Public, branded API-contract URL; the gateway remains the single source of truth. */
export const GET: RequestHandler = async () => {
    const upstream = await fetch(API_SPEC_URL);
    if (!upstream.ok) {
        return new Response('API specification temporarily unavailable.', { status: 503 });
    }

    return new Response(upstream.body, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
