import { locale, waitLocale } from 'svelte-i18n';

/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
    // data.lang comes from +layout.server.js (validated there).
    // Set locale here again to guarantee it's correct for this layout branch.
    const lang = data.lang;
    locale.set(lang);
    await waitLocale(lang);
    return { ...data };
}
