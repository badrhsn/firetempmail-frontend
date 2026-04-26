import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import nl from './locales/nl.json';
import pl from './locales/pl.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

const LOCALE_STRINGS = {
    en,
    fr,
    de,
    es,
    it,
    pt,
    nl,
    pl,
    ar,
    ru,
    zh
};

export const OG_LOCALE_MAP = {
    en: 'en_US',
    fr: 'fr_FR',
    de: 'de_DE',
    es: 'es_ES',
    it: 'it_IT',
    pt: 'pt_PT',
    nl: 'nl_NL',
    pl: 'pl_PL',
    ar: 'ar_AR',
    ru: 'ru_RU',
    zh: 'zh_CN'
};

const DEFAULT_KEYWORDS = 'temp mail, temporary email, disposable email, fake email, throwaway email, free temp mail';

export function getHomeSeo(locale = 'en') {
    const lang = /** @type {keyof typeof LOCALE_STRINGS} */ (
        Object.prototype.hasOwnProperty.call(LOCALE_STRINGS, locale) ? locale : 'en'
    );
    const current = LOCALE_STRINGS[lang] || LOCALE_STRINGS.en;
    const fallback = LOCALE_STRINGS.en;

    const title = current?.home?.title || fallback?.home?.title || 'Fire Temp Mail';
    const description = current?.home?.subtitle || fallback?.home?.subtitle || 'Generate free temporary email addresses instantly.';

    return {
        lang,
        title,
        description,
        keywords: DEFAULT_KEYWORDS,
        ogLocale: OG_LOCALE_MAP[lang] || 'en_US'
    };
}
