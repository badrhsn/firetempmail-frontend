import { register, init } from 'svelte-i18n';

// Register all locales
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('de', () => import('./locales/de.json'));
register('fr', () => import('./locales/fr.json'));
register('pt', () => import('./locales/pt.json'));
register('ar', () => import('./locales/ar.json'));
register('ru', () => import('./locales/ru.json'));
register('zh', () => import('./locales/zh.json'));
register('it', () => import('./locales/it.json'));
register('nl', () => import('./locales/nl.json'));
register('pl', () => import('./locales/pl.json'));

// Initialize i18n — locale is driven by URL path, not browser detection
init({
    fallbackLocale: 'en',
    initialLocale: 'en',
});

// Available languages for the selector
export const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];
