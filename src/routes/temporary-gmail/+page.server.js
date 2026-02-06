import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 301 Permanent Redirect: Consolidating duplicate Gmail pages
    throw redirect(301, '/temp-gmail');
}
