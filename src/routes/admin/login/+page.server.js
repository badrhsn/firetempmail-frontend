import { redirect } from '@sveltejs/kit';

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

        console.log('API_SECRET exists:', !!secret);
        console.log('API_SECRET length:', secret?.length);
        console.log('Password length:', password?.length);
        console.log('platform exists:', !!platform);
        console.log('platform.env exists:', !!platform?.env);

        if (!password || password !== secret) {
            return { error: 'Wrong password' };
        }

        cookies.set('admin_token', secret, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 86400
        });

        throw redirect(302, '/admin');
    }
};
