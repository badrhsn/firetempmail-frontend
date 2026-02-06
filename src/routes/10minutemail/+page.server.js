import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 301 Permanent Redirect: Consolidating to main homepage
    throw redirect(301, '/');
}
