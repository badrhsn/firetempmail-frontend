import { redirect } from '@sveltejs/kit';
import { createAdminSession, SESSION_COOKIE } from '$lib/server/adminAuth.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies, platform }) => {
        const formData = await request.formData();
        const password = formData.get('password');
        const secret = platform?.env?.API_SECRET;

        if (!password || password !== secret) {
            return { error: 'Wrong password' };
        }

        const session = await createAdminSession(secret);
        cookies.set(SESSION_COOKIE, session, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 86400
        });

        throw redirect(302, '/admin');
    }
};
