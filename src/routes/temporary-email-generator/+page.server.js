import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 301 Permanent Redirect: Consolidating email generator pages
    throw redirect(301, '/email-generator');
}
