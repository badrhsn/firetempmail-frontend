<script>
    /**
     * Breadcrumb navigation component.
     * @param {Array<{name: string, href: string}>} items - Breadcrumb items (last is current page)
     */
    export let items = [];
</script>

{#if items.length > 0}
<nav aria-label="Breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-list">
        {#each items as item, i}
            <li class="breadcrumb-item" class:active={i === items.length - 1}>
                {#if i < items.length - 1}
                    <a href={item.href}>{item.name}</a>
                    <span class="breadcrumb-sep" aria-hidden="true">/</span>
                {:else}
                    <span aria-current="page">{item.name}</span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>
{/if}

<style>
    .breadcrumb-nav {
        padding: 0.75rem 0;
        margin-bottom: 0.5rem;
    }
    .breadcrumb-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0.85rem;
        gap: 0.25rem;
    }
    .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .breadcrumb-item a {
        color: #ff6b35;
        text-decoration: none;
        transition: color 0.2s;
    }
    .breadcrumb-item a:hover {
        color: #e55a28;
        text-decoration: underline;
    }
    .breadcrumb-item.active span {
        color: #8888aa;
    }
    .breadcrumb-sep {
        color: #555;
        margin: 0 0.15rem;
    }
</style>
