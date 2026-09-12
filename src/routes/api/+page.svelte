<script>
    export let data;

    const rapidApiUrl = 'https://rapidapi.com/badr.hsn96/api/firetempmail';
    const quickStart = `const inbox = await fetch('https://firetempmail.p.rapidapi.com/api/inboxes', {
  method: 'POST',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'firetempmail.p.rapidapi.com'
  }
}).then((response) => response.json());

// Use inbox.inbox.address in your signup test.
const received = await fetch(
  \`https://firetempmail.p.rapidapi.com/api/inboxes/\${inbox.inbox.id}/wait?timeout=20\`,
  { headers: { 'x-inbox-secret': inbox.inbox.secret } }
).then((response) => response.json());`;
</script>

<svelte:head>
    <title>{data?.seo?.title || 'Temporary Email API for Developers & Testing | FireTempMail'}</title>
    <meta name="description" content={data?.seo?.description || 'Create private temporary inboxes and automate email testing with FireTempMail.'}>
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/api'}>
    <meta property="og:title" content="Temporary Email API for Developers & Testing | FireTempMail">
    <meta property="og:description" content="Private temporary inboxes for QA, CI/CD, and verification-email testing.">
    <meta property="og:url" content="https://firetempmail.com/api">
</svelte:head>

<main class="api-page">
    <section class="hero">
        <p class="eyebrow">FireTempMail API</p>
        <h1>Temporary Email API for Developers</h1>
        <p class="lead">Create private disposable inboxes, receive real test emails, and automate verification workflows in QA, Playwright, Cypress, Selenium, and CI/CD.</p>
        <div class="actions">
            <a class="primary" href={rapidApiUrl} rel="external">Try free on RapidAPI</a>
            <a class="secondary" href="#quick-start">View quick start</a>
        </div>
        <p class="note">Private inboxes are token-protected. Do not use temporary email for accounts that need long-term recovery or sensitive information.</p>
    </section>

    <section class="workflow" aria-labelledby="workflow-heading">
        <h2 id="workflow-heading">Test an email flow in four steps</h2>
        <ol>
            <li><strong>Create an inbox</strong><span>Receive a random address, inbox ID, and one-time secret.</span></li>
            <li><strong>Run your signup test</strong><span>Use the address in your application’s registration or verification flow.</span></li>
            <li><strong>Wait for the message</strong><span>Use a bounded wait endpoint instead of brittle client-side polling.</span></li>
            <li><strong>Read the code or link</strong><span>Retrieve the message or extract a verification code and links.</span></li>
        </ol>
    </section>

    <section id="quick-start" class="quick-start">
        <div>
            <p class="eyebrow">Quick start · JavaScript</p>
            <h2>Private inboxes for automated tests</h2>
            <p>Subscribe to the free RapidAPI plan, keep your API key in an environment variable, and store the returned inbox secret only for the duration of your test.</p>
            <a class="text-link" href={rapidApiUrl} rel="external">Get a RapidAPI key →</a>
        </div>
        <pre><code>{quickStart}</code></pre>
    </section>

    <section class="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Built for developer workflows</h2>
        <div class="feature-grid">
            <article><h3>Private inbox ownership</h3><p>An inbox secret and RapidAPI consumer ownership protect v2 inbox operations.</p></article>
            <article><h3>Wait for email</h3><p>Wait briefly for an expected message instead of hammering an inbox endpoint.</p></article>
            <article><h3>Verification extraction</h3><p>Extract common numeric verification codes and links from received messages.</p></article>
            <article><h3>Bulk and legacy support</h3><p>Existing disposable-address generation remains available for non-sensitive test data.</p></article>
        </div>
    </section>

    <section class="cta">
        <h2>Start with the free plan</h2>
        <p>Validate your integration first, then upgrade only when your test volume needs more capacity.</p>
        <a class="primary" href={rapidApiUrl} rel="external">Open FireTempMail on RapidAPI</a>
    </section>
</main>

<style>
    .api-page { max-width: 1120px; margin: 0 auto; padding: 3rem 1.25rem 5rem; color: #172033; }
    .hero { text-align: center; max-width: 790px; margin: 0 auto 4rem; }
    .eyebrow { margin: 0 0 .75rem; color: #c2410c; font-size: .85rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 0; font-size: clamp(2.35rem, 6vw, 4.2rem); line-height: 1.06; }
    h2 { font-size: clamp(1.65rem, 3vw, 2.35rem); margin: 0 0 1rem; }
    .lead { color: #475569; font-size: 1.18rem; line-height: 1.7; margin: 1.25rem auto; }
    .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: .8rem; margin: 1.6rem 0; }
    .primary, .secondary { display: inline-block; border-radius: 8px; padding: .8rem 1.1rem; font-weight: 750; text-decoration: none; }
    .primary { background: #ea580c; color: #fff; } .primary:hover { background: #c2410c; color: #fff; }
    .secondary { color: #9a3412; border: 1px solid #fdba74; } .secondary:hover { background: #fff7ed; }
    .note { color: #64748b; font-size: .9rem; }
    .workflow, .quick-start, .features, .cta { margin-top: 3rem; }
    .workflow ol { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; list-style: none; padding: 0; counter-reset: steps; }
    .workflow li { counter-increment: steps; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 1.1rem; }
    .workflow li::before { content: counter(steps); display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border-radius: 50%; background: #ea580c; color: #fff; font-weight: 800; margin-bottom: .75rem; }
    .workflow span { display: block; margin-top: .5rem; color: #475569; font-size: .94rem; line-height: 1.5; }
    .quick-start { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 2rem; align-items: center; background: #172033; color: #f8fafc; border-radius: 16px; padding: 2rem; }
    .quick-start p { color: #cbd5e1; line-height: 1.65; } .quick-start .eyebrow { color: #fdba74; }
    .text-link { color: #fed7aa; font-weight: 700; } pre { margin: 0; overflow: auto; padding: 1.25rem; border-radius: 10px; background: #0f172a; color: #dbeafe; font-size: .82rem; line-height: 1.55; }
    .feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; } .feature-grid article { padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; } .feature-grid h3 { margin: 0 0 .5rem; font-size: 1.05rem; } .feature-grid p { margin: 0; color: #475569; line-height: 1.55; }
    .cta { padding: 2.5rem; text-align: center; background: #fff7ed; border-radius: 16px; } .cta p { color: #475569; margin-bottom: 1.25rem; }
    @media (max-width: 760px) { .workflow ol, .feature-grid, .quick-start { grid-template-columns: 1fr; } .api-page { padding-top: 2rem; } }
</style>
