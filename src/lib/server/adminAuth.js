/**
 * Shared admin authentication helper.
 * Validates Bearer token against API_SECRET environment variable.
 */
export function checkAuth(request, platform) {
    const header = request.headers.get('authorization');
    const secret = platform?.env?.API_SECRET;
    console.log('[AUTH DEBUG] header exists:', !!header);
    console.log('[AUTH DEBUG] header value:', header ? `Bearer ***${header.slice(-4)}` : 'null');
    console.log('[AUTH DEBUG] secret exists:', !!secret);
    console.log('[AUTH DEBUG] secret length:', secret?.length);
    console.log('[AUTH DEBUG] match:', header === `Bearer ${secret}`);
    if (!secret || !header) return false;
    return header === `Bearer ${secret}`;
}
