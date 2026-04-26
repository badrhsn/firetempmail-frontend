<script>
    import { onMount } from 'svelte';
    import Footer from '$lib/components/Footer.svelte';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';
    import BannerTop from '$lib/components/BannerTop.svelte';
    import { onDestroy } from 'svelte';
    import { allBanners, setBanner, rotateBanners } from '$lib/stores/banners';
    import '$lib/i18n';
    import { isLoading } from 'svelte-i18n';
    
    let rotationId;
    let languageSelectorInstance;
    onMount(() => {
        // Initialize active banners from the allBanners store
        const unsubscribe = allBanners.subscribe(list => {
            list.forEach(b => {
                if (b && b.isActive) setBanner(b.position, b.content);
            });
        });

        // optional rotation (30s)
        rotationId = rotateBanners(30000);

        // Mount the LanguageSelector into the static header placeholder (if present)
        if (typeof window !== 'undefined') {
            const root = document.getElementById('language-selector-root');
            if (root) {
                languageSelectorInstance = new LanguageSelector({ target: root });
            }
        }

        onDestroy(() => {
            unsubscribe();
            if (rotationId) clearInterval(rotationId);
            if (languageSelectorInstance) languageSelectorInstance.$destroy();
        });
    });
</script>

<!-- Translations are pre-loaded server-side via +layout.js waitLocale().
     The $isLoading check is kept only as a client-side fallback for navigation. -->
{#if $isLoading}
    <div class="loading-screen">
        <div class="loader"></div>
    </div>
{:else}
    <slot />
    <Footer />
{/if}

<style>
    .loading-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #fff;
    }
    
    .loader {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #000;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Reduce space between top banner and first page title */
    :global(h1:first-of-type) {
        margin-top: 0;
    }

    /* When the top banner is present, remove top padding from the first content section
       so the banner sits flush with the page title. Use the general sibling selector
       to handle intervening elements (language selector, wrappers). */
    :global(.top-banner-container) ~ :global(section:first-of-type) {
        padding-top: 0 !important;
        margin-top: 0 !important;
    }

    /* Also reduce large top padding utilities on the first section if present */
    :global(section.py-4:first-of-type),
    :global(section.py-xl-5:first-of-type) {
        padding-top: 0 !important;
    }

    /* Override Bootstrap's .p-lg-5 which adds 3rem padding at >=992px.
       Remove that padding to eliminate the large gap between banner and content. */
    @media (min-width: 992px) {
        :global(.p-lg-5) {
            padding: 0 !important;
        }
    }
</style>
