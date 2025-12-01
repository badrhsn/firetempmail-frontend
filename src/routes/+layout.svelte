<script>
    import { onMount } from 'svelte';
    import Footer from '$lib/components/Footer.svelte';
    import LanguageSelector from '$lib/components/LanguageSelector.svelte';
    import '$lib/i18n';
    import { isLoading } from 'svelte-i18n';
    
    // Wait for i18n to load
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
    });
</script>

{#if !$isLoading}
    <!-- Language Selector Fixed Position -->
    <div class="language-selector-wrapper">
        <LanguageSelector />
    </div>
    
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
</style>
