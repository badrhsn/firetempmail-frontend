<script>
    export let twitterUrl = '[TWITTER_URL]';
    export let githubUrl = '[GITHUB_URL]';
    export let productHuntUrl = '[PRODUCTHUNT_URL]';
</script>

<nav class="social-links" aria-label="Fire Temp Mail social profiles">
    <a
        class="social-link"
        href={twitterUrl}
        target="_blank"
        rel="me noopener noreferrer"
        aria-label="X (Twitter)"
        title="X (Twitter)"
    >
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M18.901 2H22l-6.77 7.737L23.194 22h-6.232l-4.88-7.067L5.899 22H2.8l7.24-8.274L1.194 2h6.393l4.412 6.417L18.901 2zm-1.084 18h1.717L6.659 3.896H4.817L17.817 20z" />
        </svg>
    </a>

    <a
        class="social-link"
        href={githubUrl}
        target="_blank"
        rel="me noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
    >
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12 .5C5.649.5.5 5.65.5 12.004c0 5.083 3.292 9.397 7.862 10.919.575.107.785-.25.785-.555 0-.274-.01-1-.015-1.962-3.198.696-3.874-1.541-3.874-1.541-.523-1.33-1.278-1.684-1.278-1.684-1.045-.714.08-.699.08-.699 1.155.082 1.763 1.186 1.763 1.186 1.027 1.761 2.695 1.252 3.352.957.104-.744.402-1.252.731-1.54-2.552-.29-5.237-1.276-5.237-5.68 0-1.255.448-2.282 1.182-3.086-.118-.289-.512-1.455.112-3.033 0 0 .965-.31 3.162 1.178a10.96 10.96 0 012.879-.387c.977.004 1.961.132 2.88.387 2.195-1.488 3.158-1.178 3.158-1.178.626 1.578.232 2.744.114 3.033.737.804 1.18 1.831 1.18 3.086 0 4.416-2.689 5.387-5.25 5.672.413.354.781 1.053.781 2.123 0 1.533-.014 2.77-.014 3.147 0 .308.207.667.79.554C20.211 21.397 23.5 17.085 23.5 12.004 23.5 5.65 18.351.5 12 .5z" />
        </svg>
    </a>

    <a
        class="social-link"
        href={productHuntUrl}
        target="_blank"
        rel="me noopener noreferrer"
        aria-label="Product Hunt"
        title="Product Hunt"
    >
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M10 7h3.4a2.6 2.6 0 0 1 0 5.2H10z" />
            <path d="M10 12.2V17" />
        </svg>
    </a>
</nav>

<style>
    .social-links {
        --social-icon-color: var(--footer-social-color, var(--footer-link-color, #718096));
        --social-icon-hover-color: var(--footer-social-hover-color, var(--footer-link-hover-color, #1a1a1a));
        --social-icon-border: var(--footer-social-border, #e2e8f0);
        --social-icon-bg: var(--footer-social-bg, transparent);
        --social-icon-hover-bg: var(--footer-social-hover-bg, #f8fafc);

        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    .social-link {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        color: var(--social-icon-color);
        background: var(--social-icon-bg);
        border: 1px solid var(--social-icon-border);
        border-radius: 999px;
        text-decoration: none;
        transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    }

    .social-link:hover {
        color: var(--social-icon-hover-color);
        background: var(--social-icon-hover-bg);
        border-color: var(--social-icon-hover-bg);
        transform: translateY(-1px);
    }

    .social-link:focus-visible {
        outline: 2px solid var(--footer-focus-ring, #3b82f6);
        outline-offset: 2px;
    }

    .social-icon {
        width: 16px;
        height: 16px;
        display: block;
    }

    @media (prefers-color-scheme: dark) {
        .social-links {
            --social-icon-color: var(--footer-social-color-dark, #cbd5e1);
            --social-icon-hover-color: var(--footer-social-hover-color-dark, #ffffff);
            --social-icon-border: var(--footer-social-border-dark, #334155);
            --social-icon-bg: var(--footer-social-bg-dark, transparent);
            --social-icon-hover-bg: var(--footer-social-hover-bg-dark, #1e293b);
        }
    }
</style>