<script>
    import { supportedLocales, localePath } from '$lib/i18n/lang.js';

    /** The canonical (English) path, e.g. '/blog', '/temp-gmail', '/' */
    export let path = '/';

    const siteUrl = 'https://firetempmail.com';

    $: alternates = supportedLocales.map(lang => ({
        lang,
        href: `${siteUrl}${localePath(path, lang)}`
    }));
</script>

<svelte:head>
    <!-- Hreflang alternate links for all supported languages -->
    {#each alternates as alt}
        <link rel="alternate" hreflang={alt.lang} href={alt.href} />
    {/each}
    <link rel="alternate" hreflang="x-default" href="{siteUrl}{path === '/' ? '' : path}" />
</svelte:head>
