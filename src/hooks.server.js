import { redirect } from '@sveltejs/kit';
import { supportedLocales, defaultLocale, isSupported } from '$lib/i18n/lang.js';

/**
 * Parse the Accept-Language header and return the best matching supported locale.
 * e.g. "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7" => 'es'
 */
function getPreferredLocale(acceptLanguage) {
    if (!acceptLanguage) return null;

    const parts = acceptLanguage.split(',').map(part => {
        const [langTag, qPart] = part.trim().split(';');
        const q = qPart ? parseFloat(qPart.split('=')[1]) : 1;
        return { lang: langTag.trim().toLowerCase(), q };
    });

    parts.sort((a, b) => b.q - a.q);

    for (const { lang } of parts) {
        const code = lang.split('-')[0];
        if (isSupported(code)) return code;
    }
    return null;
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const { pathname } = event.url;
    const lang = event.params?.lang || defaultLocale;

    // --- Browser language detection & redirect ---
    // Only on root path '/' when no lang cookie exists (first-time visitors)
    if (pathname === '/') {
        const langCookie = event.cookies.get('lang');

        if (!langCookie) {
            const acceptLang = event.request.headers.get('accept-language');
            const preferred = getPreferredLocale(acceptLang);

            // Set cookie so we don't redirect again
            event.cookies.set('lang', preferred || defaultLocale, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
                httpOnly: false,
                secure: true,
                sameSite: 'lax'
            });

            if (preferred && preferred !== defaultLocale) {
                throw redirect(302, `/${preferred}`);
            }
        }
    }

    return resolve(event, {
        transformPageChunk({ html }) {
            return html.replace('lang="en"', `lang="${lang}"`);
        }
    });
}
