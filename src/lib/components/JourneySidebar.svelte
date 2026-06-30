<script>
    import RelatedGuides from './RelatedGuides.svelte';

    /** @type {Array<{ href: string; title: string; description?: string }>} */
    export let guides = [];
    export let label = 'Related guides';
</script>

<aside class="tool-sidebar journey-sidebar sidebar" aria-label={label}>
    <RelatedGuides {guides} />
</aside>

<style>
    aside {
        position: static;
        display: flex;
        min-width: 0;
        flex-direction: column;
    }

    aside :global(.related-guides) {
        margin-top: 0;
        padding: 22px;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 4px 16px rgba(23, 32, 51, 0.05);
    }
</style>
