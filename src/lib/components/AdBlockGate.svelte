<script>
    import { onMount, tick } from 'svelte';
    import { page } from '$app/stores';

    let status = 'checking';
    let isExcludedRoute = false;
    /** @type {HTMLButtonElement | undefined} */
    let reloadButton;

    $: isExcludedRoute = $page.url.pathname.startsWith('/admin');

    /** @param {number} milliseconds */
    const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

    async function baitIsBlocked() {
        const bait = document.createElement('div');
        bait.className = 'adsbox ad-banner ad-unit advertisement pub_300x250 text-ad';
        bait.setAttribute('aria-hidden', 'true');
        bait.style.cssText = 'position:absolute;left:-10000px;top:-10000px;width:10px;height:10px;pointer-events:none;';
        document.body.appendChild(bait);

        await wait(120);

        const styles = window.getComputedStyle(bait);
        const blocked = bait.offsetHeight === 0
            || bait.offsetWidth === 0
            || styles.display === 'none'
            || styles.visibility === 'hidden';

        bait.remove();
        return blocked;
    }

    function probeLoads() {
        return new Promise((resolve) => {
            const probe = document.createElement('script');
            /** @type {Window & { __fireTempMailAdProbeLoaded?: boolean }} */
            const probeWindow = window;
            const timeout = window.setTimeout(() => finish(false), 2500);
            let finished = false;

            probeWindow.__fireTempMailAdProbeLoaded = false;
            probe.async = true;
            probe.src = `/ads/advertisement.js?probe=${Date.now()}`;

            /** @param {boolean} loaded */
            function finish(loaded) {
                if (finished) return;
                finished = true;
                window.clearTimeout(timeout);
                probe.remove();
                resolve(loaded);
            }

            probe.onload = () => finish(probeWindow.__fireTempMailAdProbeLoaded === true);
            probe.onerror = () => finish(false);
            document.head.appendChild(probe);
        });
    }

    async function detectAdBlocker() {
        status = 'checking';
        document.body.classList.add('access-gate-open');

        const [blockedBait, loadedProbe] = await Promise.all([
            baitIsBlocked(),
            probeLoads()
        ]);

        status = blockedBait || !loadedProbe ? 'blocked' : 'clear';

        if (status === 'clear') {
            document.body.classList.remove('access-gate-open');
        } else {
            await tick();
            reloadButton?.focus();
        }
    }

    function reloadPage() {
        window.location.reload();
    }

    onMount(() => {
        if (isExcludedRoute) {
            status = 'clear';
            return;
        }

        detectAdBlocker();

        return () => {
            document.body.classList.remove('access-gate-open');
        };
    });
</script>

{#if !isExcludedRoute && status !== 'clear'}
    <div class="access-gate-backdrop">
        {#if status === 'checking'}
            <div class="access-gate-checking" role="status" aria-live="polite">
                <span class="access-gate-spinner" aria-hidden="true"></span>
                <span>Checking browser access...</span>
            </div>
        {:else}
            <div
                class="access-gate-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="access-gate-title"
                aria-describedby="access-gate-description"
            >
                <img class="access-gate-logo" src="/logo.svg" alt="" width="64" height="64" />
                <h2 id="access-gate-title">Please disable your ad blocker</h2>
                <p id="access-gate-description">
                    Fire Temp Mail is free to use and advertising helps cover the cost of running the service. Please allow ads for this site, then reload the page to continue.
                </p>
                <ol class="access-gate-steps">
                    <li>Open your ad blocker or browser privacy extension.</li>
                    <li>Allow ads or add firetempmail.com to its allowlist.</li>
                    <li>Reload this page to confirm the change.</li>
                </ol>
                <button class="access-gate-button" type="button" on:click={reloadPage} bind:this={reloadButton}>
                    I disabled it - reload page
                </button>
            </div>
        {/if}
    </div>
{/if}

<style>
    :global(body.access-gate-open) {
        overflow: hidden !important;
    }

    .access-gate-backdrop {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: grid;
        place-items: center;
        padding: 20px;
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(3px);
    }

    .access-gate-checking {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        border: 1px solid #dfe5ed;
        border-radius: 8px;
        background: #ffffff;
        color: #344054;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 16px 48px rgba(15, 23, 42, 0.22);
    }

    .access-gate-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #d0d5dd;
        border-top-color: #ff6b35;
        border-radius: 50%;
        animation: access-gate-spin 0.7s linear infinite;
    }

    .access-gate-dialog {
        width: min(100%, 520px);
        max-height: calc(100vh - 40px);
        overflow-y: auto;
        padding: 36px;
        border: 1px solid #dfe5ed;
        border-radius: 8px;
        background: #ffffff;
        color: #172033;
        text-align: center;
        box-shadow: 0 24px 72px rgba(15, 23, 42, 0.32);
    }

    .access-gate-logo {
        display: block;
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
    }

    .access-gate-dialog h2 {
        margin: 0 0 14px;
        color: #111827;
        font-size: 28px;
        line-height: 1.2;
        letter-spacing: 0;
    }

    .access-gate-dialog > p {
        margin: 0 auto 22px;
        color: #667085;
        font-size: 16px;
        line-height: 1.65;
    }

    .access-gate-steps {
        display: grid;
        gap: 8px;
        margin: 0 0 24px;
        padding-left: 24px;
        color: #475467;
        font-size: 14px;
        line-height: 1.5;
        text-align: left;
    }

    .access-gate-button {
        width: 100%;
        min-height: 48px;
        padding: 12px 18px;
        border: 0;
        border-radius: 6px;
        background: #1f2937;
        color: #ffffff;
        font: inherit;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
    }

    .access-gate-button:hover {
        background: #111827;
    }

    .access-gate-button:focus-visible {
        outline: 3px solid rgba(37, 99, 235, 0.35);
        outline-offset: 3px;
    }

    @keyframes access-gate-spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 560px) {
        .access-gate-dialog {
            padding: 28px 22px;
        }

        .access-gate-dialog h2 {
            font-size: 24px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .access-gate-spinner {
            animation-duration: 1.5s;
        }
    }
</style>
