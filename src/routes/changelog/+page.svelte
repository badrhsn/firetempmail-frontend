<svelte:head>
    <title>Changelog - Fire Temp Mail</title>
    <meta name="description" content="Operational changelog for Fire Temp Mail editorial, testing, and maintenance updates." />
</svelte:head>

<main class="changelog-page">
    <div class="container">
        <header class="page-header">
            <h1>Changelog</h1>
            <p>Operational updates to Fire Temp Mail content, testing, and maintenance.</p>
        </header>

        <section class="log-list" aria-label="Changelog entries">
            <article class="log-entry">
                <h2>22 May 2026</h2>
                <ul>
                    <li>Published public changelog page documenting recent editorial and testing updates.</li>
                </ul>
            </article>

            <article class="log-entry">
                <h2>19 May 2026</h2>
                <ul>
                    <li>Rewrote Gmailnator alternatives article after retesting delivery consistency and public inbox behaviour.</li>
                    <li>Removed numerical ranking format from the comparison.</li>
                </ul>
            </article>

            <article class="log-entry">
                <h2>12 May 2026</h2>
                <ul>
                    <li>Removed 63 outdated low-traffic articles after consolidating overlapping topics.</li>
                    <li>Added redirects from deprecated duplicate URLs.</li>
                    <li>Published testing methodology page.</li>
                    <li>Fixed contrast issue affecting product pages.</li>
                </ul>
            </article>

            <article class="log-entry">
                <h2>9 May 2026</h2>
                <ul>
                    <li>Retested ChatGPT signup compatibility and updated findings.</li>
                </ul>
            </article>

            <article class="log-entry">
                <h2>8 May 2026</h2>
                <ul>
                    <li>One disposable domain was silently filtered during OpenAI testing.</li>
                </ul>
            </article>
        </section>
    </div>
</main>

<style>
    .changelog-page {
        background: #ffffff;
        color: #0f172a;
        padding: 56px 0 24px;
    }

    .container {
        max-width: 760px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .page-header {
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 24px;
        margin-bottom: 32px;
    }

    h1 {
        font-family: 'Inter Tight', sans-serif;
        font-size: 2.25rem;
        line-height: 1.15;
        margin: 0 0 12px;
        font-weight: 650;
    }

    .page-header p {
        color: #475569;
        font-size: 1rem;
        line-height: 1.6;
        margin: 0;
    }

    .log-list {
        display: grid;
        gap: 28px;
    }

    .log-entry {
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 28px;
    }

    .log-entry:last-child {
        border-bottom: 0;
    }

    h2 {
        font-size: 1rem;
        line-height: 1.4;
        margin: 0 0 12px;
        font-weight: 650;
        color: #0f172a;
    }

    ul {
        margin: 0;
        padding-left: 20px;
    }

    li {
        color: #334155;
        line-height: 1.7;
        margin-bottom: 6px;
    }

    li:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 640px) {
        .changelog-page {
            padding-top: 40px;
        }

        h1 {
            font-size: 1.9rem;
        }
    }
</style>