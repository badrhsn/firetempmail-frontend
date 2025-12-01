<script>
    import { _ } from 'svelte-i18n';
</script>

<nav class="site-navigation">
    <a href="/">{$_('nav.home')}</a>
    <a href="/privacy-policy">{$_('footer.privacy')}</a>
    <a href="/terms">{$_('footer.terms')}</a>
    <a href="/faq">{$_('nav.faq')}</a>
    <a href="/contact">{$_('nav.contact')}</a>
    <a href="/advertising">{$_('nav.advertising')}</a>
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