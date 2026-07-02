const SESSION_COOKIE = 'admin_session';

async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function createAdminSession(secret) {
    if (!secret) return null;
    return sha256(`firetempmail-admin-session:${secret}`);
}

export async function checkAuth(request, platform, cookies) {
    const secret = platform?.env?.API_SECRET;
    const suppliedSession = cookies?.get(SESSION_COOKIE);
    if (!secret || !suppliedSession) return false;

    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
        const origin = request.headers.get('origin');
        if (!origin || origin !== new URL(request.url).origin) return false;
    }

    const expectedSession = await createAdminSession(secret);
    return suppliedSession === expectedSession;
}

export { SESSION_COOKIE };
