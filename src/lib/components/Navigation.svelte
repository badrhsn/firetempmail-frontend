<script>
    import { _ } from 'svelte-i18n';
    import { page } from '$app/stores';
    import { getLangFromPath, localePath } from '$lib/i18n/lang.js';

    $: currentLang = getLangFromPath($page.url.pathname);
    $: lp = (/** @type {string} */ path) => localePath(path, currentLang);
</script>

<nav class="site-navigation">
    <a href={lp('/')}>{$_('nav.home')}</a>
    <a href={lp('/privacy-policy')}>{$_('footer.privacy')}</a>
    <a href={lp('/terms')}>{$_('footer.terms')}</a>
    <a href={lp('/faq')}>{$_('nav.faq')}</a>
    <a href={lp('/contact')}>{$_('nav.contact')}</a>
    <a href={lp('/advertising')}>{$_('nav.advertising')}</a>
</nav>

<style>
    .site-navigation {
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
    }
    
    .site-navigation a {
        color: var(--bs-dark);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .site-navigation a:hover {
        background-color: #e9ecef;
        text-decoration: none;
    }
</style>