import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 301: /temp-gmail is the single canonical Gmail-alias tool page.
    throw redirect(301, '/temp-gmail');
}
