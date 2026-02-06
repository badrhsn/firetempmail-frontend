import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 301 Permanent Redirect: Consolidating edu email pages
    throw redirect(301, '/edu-email-generator');
}
