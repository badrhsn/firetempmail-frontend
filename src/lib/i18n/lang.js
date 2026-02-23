/**
 * i18n URL routing helpers
 * 
 * English (en) = default language at root `/`
 * Other languages get `/lang/` prefix: /es/, /de/, /fr/, /pt/, /ar/, /ru/, /zh/
 */

export const supportedLocales = ['en', 'es', 'de', 'fr', 'pt', 'ar', 'ru', 'zh'];
export const defaultLocale = 'en';

/**
 * Check if a locale code is supported
 */
export function isSupported(locale) {
    return supportedLocales.includes(locale);
}

/**
 * Get the URL prefix for a language.
 * English returns '' (no prefix), others return '/es', '/de', etc.
 */
export function getLangPrefix(lang) {
    if (!lang || lang === defaultLocale) return '';
    return `/${lang}`;
}

/**
 * Build a localized path.
 * localePath('/blog', 'es') => '/es/blog'
 * localePath('/blog', 'en') => '/blog'
 * localePath('/', 'de') => '/de'
 */
export function localePath(path, lang) {
    const prefix = getLangPrefix(lang);
    if (path === '/') return prefix || '/';
    return `${prefix}${path}`;
}

/**
 * Get the canonical (English) path from a localized path.
 * '/es/blog' => '/blog'
 * '/blog' => '/blog'
 * '/de' => '/'
 */
export function getCanonicalPath(pathname) {
    for (const lang of supportedLocales) {
        if (lang === defaultLocale) continue;
        if (pathname === `/${lang}`) return '/';
        if (pathname.startsWith(`/${lang}/`)) {
            return pathname.slice(lang.length + 1);
        }
    }
    return pathname;
}

/**
 * Extract language from a pathname.
 * '/es/blog' => 'es'
 * '/blog' => 'en'
 */
export function getLangFromPath(pathname) {
    for (const lang of supportedLocales) {
        if (lang === defaultLocale) continue;
        if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
            return lang;
        }
    }
    return defaultLocale;
}
