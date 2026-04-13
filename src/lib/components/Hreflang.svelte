<script>
    /** The canonical (English) path, e.g. '/blog', '/temp-gmail', '/' */
    export let path = '/';

    const siteUrl = 'https://firetempmail.com';

    $: canonicalHref = `${siteUrl}${path === '/' ? '' : path}`;
</script>

<svelte:head>
    <!-- Only English version exists (localized pages are not translated) -->
    <link rel="alternate" hreflang="en" href={canonicalHref} />
    <link rel="alternate" hreflang="x-default" href={canonicalHref} />
</svelte:head>
