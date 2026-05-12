<script>
    export let compact = false; // compact = small inline version for post header
</script>

{#if compact}
    <!-- Compact version: used in article header -->
    <div class="author-compact">
        <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50"
            alt="Alex Morgan"
            class="author-compact-avatar"
            width="40"
            height="40"
            loading="eager"
        />
        <div>
            <a href="/about/author" class="author-compact-name">Alex Morgan</a>
            <div class="author-compact-role">Privacy & Email Security Researcher</div>
        </div>
    </div>
{:else}
    <!-- Full author box: appears below article content -->
    <aside class="author-box" aria-label="About the author">
        <div class="author-box-inner">
            <a href="/about/author" class="author-avatar-link" aria-label="View Alex Morgan's profile">
                <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50"
                    alt="Alex Morgan – Privacy & Email Security Researcher"
                    class="author-avatar"
                    width="80"
                    height="80"
                    loading="lazy"
                />
            </a>
            <div class="author-info">
                <div class="author-label">Written by</div>
                <a href="/about/author" class="author-name">Alex Morgan</a>
                <p class="author-bio">
                    I research email privacy, spam protection, and disposable inbox tools — and I've spent years testing what actually keeps your real address safe online.
                    When I'm not writing, I'm digging into how platforms handle user data and what that means for everyday people trying to stay private.
                </p>
                <div class="author-links-row">
                    <a href="/about/author" class="author-more-link">
                        More about Alex
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="/methodology" class="author-more-link author-more-link-secondary">
                        How we test
                    </a>
                </div>
            </div>
        </div>
    </aside>
{/if}

<style>
    /* ── Compact (header) ── */
    .author-compact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .author-compact-avatar {
        border-radius: 50%;
        border: 2px solid #e9ecef;
        flex-shrink: 0;
    }
    .author-compact-name {
        font-weight: 600;
        color: inherit;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.2s;
    }
    .author-compact-name:hover {
        color: #ff6b35;
    }
    .author-compact-role {
        color: #6c757d;
        font-size: 0.85rem;
    }

    /* ── Full author box ── */
    .author-box {
        margin: 2.5rem 0 1rem;
        border-top: 2px solid #f0f0f0;
        padding-top: 2rem;
    }
    .author-box-inner {
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
        background: #f8f9fa;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid #e9ecef;
    }
    .author-avatar-link {
        flex-shrink: 0;
    }
    .author-avatar {
        border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        display: block;
    }
    .author-info {
        flex: 1;
        min-width: 0;
    }
    .author-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #999;
        margin-bottom: 0.2rem;
        font-weight: 600;
    }
    .author-name {
        display: block;
        font-family: 'Inter Tight', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #1a1a1a;
        text-decoration: none;
        margin-bottom: 0.6rem;
        transition: color 0.2s;
    }
    .author-name:hover {
        color: #ff6b35;
    }
    .author-bio {
        font-size: 0.92rem;
        color: #555;
        line-height: 1.7;
        margin: 0 0 0.9rem;
    }
    .author-more-link {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: #ff6b35;
        text-decoration: none;
        transition: gap 0.2s;
    }
    .author-more-link:hover {
        gap: 0.5rem;
    }
    .author-links-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 1.25rem;
        align-items: center;
    }
    .author-more-link-secondary {
        color: #475569;
        font-weight: 500;
        text-decoration: underline;
        text-decoration-color: #cbd5e1;
    }
    .author-more-link-secondary:hover {
        color: #0f172a;
    }

    @media (max-width: 480px) {
        .author-box-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .author-more-link {
            justify-content: center;
        }
    }
</style>
