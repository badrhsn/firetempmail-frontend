/**
 * Shared admin authentication helper.
 * Validates Bearer token against API_SECRET environment variable.
 */
export function checkAuth(request, platform) {
    const header = request.headers.get('authorization');
    const secret = platform.env.API_SECRET;
    if (!secret || !header) return false;
    return header === `Bearer ${secret}`;
}
