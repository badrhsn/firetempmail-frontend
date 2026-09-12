import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // This legacy comparison URL has no standalone comparison content.
    throw redirect(301, '/');
}
