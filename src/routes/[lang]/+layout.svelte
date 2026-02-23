<script>
    import { page } from '$app/stores';
    import { locale } from 'svelte-i18n';
    import { isSupported, defaultLocale } from '$lib/i18n/lang.js';

    export let data;

    $: lang = data?.lang || $page.params?.lang || defaultLocale;
    $: if (lang && isSupported(lang)) {
        locale.set(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-language', lang);
        }
    }
</script>

<slot />
