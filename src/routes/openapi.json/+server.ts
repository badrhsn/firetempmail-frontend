import type { RequestHandler } from './$types';
import openapi from '../../../../api-gateway/openapi.json';

/** Public, version-controlled API contract for documentation tools and customers. */
export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify(openapi, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        }
    });
};
