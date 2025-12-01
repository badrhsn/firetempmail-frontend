import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

// Register all locales
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('de', () => import('./locales/de.json'));
register('fr', () => import('./locales/fr.json'));
register('pt', () => import('./locales/pt.json'));
register('ar', () => import('./locales/ar.json'));
register('ru', () => import('./locales/ru.json'));
register('zh', () => import('./locales/zh.json'));

// Initialize i18n
init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
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
];
