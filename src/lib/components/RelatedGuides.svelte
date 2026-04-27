<script>
    /**
     * @typedef {{ href: string; title: string; description?: string }} Guide
     * @type {Guide[]}
     */
    export let guides = [];
</script>

{#if guides.length > 0}
<section class="related-guides" aria-labelledby="related-guides-heading">
    <h2 id="related-guides-heading" class="rg-heading">Related Guides</h2>
    <ul class="rg-list">
        {#each guides as guide}
            <li class="rg-card">
                <a href={guide.href} class="rg-link">
                    <span class="rg-arrow" aria-hidden="true">→</span>
                    <span class="rg-content">
                        <span class="rg-title">{guide.title}</span>
                        {#if guide.description}
                            <span class="rg-desc">{guide.description}</span>
                        {/if}
                    </span>
                </a>
            </li>
        {/each}
    </ul>
</section>
{/if}

<style>
    .related-guides {
        margin-top: 3rem;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
    }

    .rg-heading {
        font-size: 1.35rem;
        font-weight: 700;
        margin: 0 0 1.25rem;
        color: rgba(255, 255, 255, 0.9);
    }

    .rg-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
    }

    .rg-card {
        display: block;
    }

    .rg-link {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        text-decoration: none;
        transition: background 0.15s, border-color 0.15s;
    }

    .rg-link:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.2);
        text-decoration: none;
    }

    .rg-arrow {
        color: #f97316;
        font-size: 1rem;
        flex-shrink: 0;
        margin-top: 0.1em;
    }

    .rg-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .rg-title {
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
        font-size: 0.95rem;
        line-height: 1.4;
    }

    .rg-desc {
        color: rgba(255, 255, 255, 0.55);
        font-size: 0.85rem;
        line-height: 1.4;
    }
</style>
