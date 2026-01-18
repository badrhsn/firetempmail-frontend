<script>
    import { onMount } from 'svelte';
    import Footer from '$lib/components/Footer.svelte';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';
    import BannerTop from '$lib/components/BannerTop.svelte';
    import { onDestroy } from 'svelte';
    import { allBanners, setBanner, rotateBanners } from '$lib/stores/banners';
    import '$lib/i18n';
    import { isLoading } from 'svelte-i18n';
    
    // Wait for i18n to load
    let rotationId;
    let languageSelectorInstance;
    onMount(() => {
        // Check for stored language preference
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang) {
                import('svelte-i18n').then(({ locale }) => {
                    locale.set(savedLang);
                });
            }
        }

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

{#if !$isLoading}
     <!--Global banner (top only) --
    <BannerTop />-->
    
    <slot />
    
    <Footer />
{:else}
    <div class="loading-screen">
        <div class="loader"></div>
    </div>
{/if}

<style>
    .language-selector-wrapper {
        position: fixed;
        top: 80px;
        right: 2rem;
        z-index: 999;
    }
    
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
    
    @media (max-width: 768px) {
        .language-selector-wrapper {
            top: 70px;
            right: 1rem;
        }
    }

    /* Reduce space between top banner and first page title */
    :global(h1:first-of-type) {
        margin-top: 0;
    }

    /* When the top banner is present, remove top padding from the first content section
       so the banner sits flush with the page title. Use the general sibling selector
       to handle intervening elements (language selector, wrappers). */
    :global(.top-banner-container) ~ :global(section:first-of-type),
    :global(.top-banner-container) ~ :global(section:first-of-type) .container,
    :global(.top-banner-container) ~ :global(section:first-of-type) .text-center {
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
