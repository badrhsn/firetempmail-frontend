<script>
    export let items = [];
</script>

{#if items.length}
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
            {#each items as item, index}
                <li>
                    {#if item.href && index < items.length - 1}
                        <a href={item.href}>{item.name}</a>
                    {:else}
                        <span aria-current="page">{item.name}</span>
                    {/if}
                </li>
            {/each}
        </ol>
    </nav>
{/if}

<style>
    .breadcrumb {
        margin: 0 0 18px;
        color: #667085;
        font-size: 14px;
    }

    .breadcrumb ol {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .breadcrumb li {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .breadcrumb li:not(:last-child)::after {
        content: "/";
        color: #98a2b3;
    }

    .breadcrumb a {
        color: #475467;
        text-decoration: none;
        font-weight: 700;
    }

    .breadcrumb a:hover {
        color: #111827;
        text-decoration: underline;
    }

    .breadcrumb span {
        color: #111827;
        font-weight: 800;
    }
</style>
