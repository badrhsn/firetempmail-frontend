<script>
    import { page } from '$app/stores';
    import { locale } from 'svelte-i18n';
    import { browser } from '$app/environment';
    import { isSupported, defaultLocale } from '$lib/i18n/lang.js';

    export let data;

    // Locale is already set server-side in +layout.js via locale.set() + waitLocale().
    // This reactive block only handles client-side navigation (e.g. language switcher).
    $: lang = data?.lang || $page.params?.lang || defaultLocale;
    $: if (browser && lang && isSupported(lang)) {
        locale.set(lang);
        localStorage.setItem('preferred-language', lang);
    }
</script>

<slot />
