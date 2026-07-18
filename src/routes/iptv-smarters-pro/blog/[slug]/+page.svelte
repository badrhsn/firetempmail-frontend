<script>
    export let data;

    const { post, related } = data;
    const canonical = `https://iptvsmarterspro.firetempmail.com/blog/${post.slug}/`;
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: '2026-07-18',
        dateModified: '2026-07-18',
        author: {
            '@type': 'Organization',
            name: 'FireTempMail'
        },
        publisher: {
            '@type': 'Organization',
            name: 'FireTempMail'
        },
        mainEntityOfPage: canonical
    };
</script>

<svelte:head>
    <title>{post.title} | IPTV Smarters Pro Blog</title>
    <meta name="description" content={post.description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="article" />
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
</svelte:head>

<main class="iptv-article-page">
    <nav class="article-nav" aria-label="IPTV article navigation">
        <a class="brand" href="/">
            <span class="brand-mark">IP</span>
            <span>
                <strong>IPTV Smarters Pro</strong>
                <small>Powered by FireTempMail</small>
            </span>
        </a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/#plans">Subscriptions</a>
            <a href="/blog/">Blog</a>
        </div>
        <a class="nav-cta" href="/#plans">Buy Now</a>
    </nav>

    <article class="article-shell">
        <header class="article-hero">
            <a class="back-link" href="/blog/">Back to Blog</a>
            <div class="hero-copy">
                <p class="eyebrow">{post.category}</p>
                <h1>{post.title}</h1>
                <p>{post.intro}</p>
                <div class="hero-links" aria-label="Important IPTV links">
                    <a href="/">IPTV Smarters Pro homepage</a>
                    <a href="/#plans">Compare IPTV subscriptions</a>
                </div>
                <div class="article-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                    <span>USA, UK & Canada</span>
                </div>
            </div>
            <div class={`article-visual ${post.accent}`} aria-hidden="true">
                <span>{post.hero}</span>
                <strong>2026 Guide</strong>
            </div>
        </header>

        <div class="article-layout">
            <div class="article-content">
                <section class="takeaway-box">
                    <h2>Key takeaways</h2>
                    <ul>
                        {#each post.keyTakeaways as takeaway}
                            <li>{takeaway}</li>
                        {/each}
                    </ul>
                </section>

                <section class="subscription-callout">
                    <h2>Start with the right IPTV Smarters Pro subscription</h2>
                    <p>
                        Before following this guide, make sure you are using a compatible IPTV service. You can review the
                        <a href="/">IPTV Smarters Pro landing page</a>
                        or jump directly to the
                        <a href="/#plans">IPTV subscription plans</a>
                        for USA, UK, and Canada viewers.
                    </p>
                </section>

                {#each post.sections as section}
                    <section>
                        <h2>{section.heading}</h2>
                        {#if section.paragraphs}
                            {#each section.paragraphs as paragraph}
                                <p>{paragraph}</p>
                            {/each}
                        {/if}
                        {#if section.bullets}
                            <ul>
                                {#each section.bullets as bullet}
                                    <li>{bullet}</li>
                                {/each}
                            </ul>
                        {/if}
                    </section>
                {/each}

                <section class="faq-block">
                    <h2>Frequently asked questions</h2>
                    {#each post.faq as item, index}
                        <details open={index === 0}>
                            <summary>{item[0]}</summary>
                            <p>{item[1]}</p>
                        </details>
                    {/each}
                </section>

                <section class="article-cta">
                    <h2>Ready to choose your IPTV Smarters Pro compatible subscription?</h2>
                    <p>
                        Pick a plan that matches your device, country, and streaming habits. Start from the
                        <a href="/">main IPTV Smarters Pro page</a>
                        or compare options in the
                        <a href="/#plans">subscription section</a>.
                    </p>
                    <a class="primary-btn" href="/#plans">View IPTV plans</a>
                </section>
            </div>

            <aside class="article-sidebar" aria-label="Related IPTV guides">
                <div class="sidebar-card">
                    <h2>Related Guides</h2>
                    {#each related as item}
                        <a href={`/blog/${item.slug}/`}>
                            <span>{item.category}</span>
                            <strong>{item.shortTitle}</strong>
                            <small>{item.description}</small>
                        </a>
                    {/each}
                </div>
                <div class="sidebar-card compact">
                    <h2>Popular Tools</h2>
                    <a href="/"><strong>IPTV Smarters Pro</strong><small>Visit the main IPTV page for features, devices, and setup details.</small></a>
                    <a href="/#plans"><strong>IPTV Subscriptions</strong><small>Compare plans for USA, UK, and Canada.</small></a>
                    <a href="/#compatibility"><strong>Device Setup</strong><small>Firestick, Smart TV, iOS, Android, and more.</small></a>
                </div>
            </aside>
        </div>
    </article>
</main>

<style>
    :global(.modern-header),
    :global(.footer) {
        display: none !important;
    }

    :global(body) {
        background: #f8fafc;
    }

    .iptv-article-page {
        --primary: #ff6b35;
        --primary-dark: #e85d2c;
        --primary-soft: #fff2ec;
        --ink: #111827;
        --muted: #667085;
        --line: #e6e9ef;
        min-height: 100vh;
        color: var(--ink);
        background: #f8fafc;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .iptv-article-page * {
        box-sizing: border-box;
    }

    a {
        color: inherit;
    }

    h1,
    h2,
    p {
        margin-top: 0;
    }

    .article-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 18px max(22px, calc((100vw - 1120px) / 2));
        color: #fff;
        background: #0b1220;
    }

    .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
    }

    .brand-mark {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        color: var(--primary);
        background: var(--primary-soft);
        font-size: 12px;
        font-weight: 950;
    }

    .brand strong,
    .brand small {
        display: block;
        line-height: 1.1;
    }

    .brand small {
        margin-top: 3px;
        color: rgba(255, 255, 255, 0.62);
        font-size: 11px;
        font-weight: 800;
    }

    .nav-links {
        display: flex;
        gap: 6px;
    }

    .nav-links a,
    .nav-cta {
        border-radius: 999px;
        padding: 9px 13px;
        color: rgba(255, 255, 255, 0.76);
        text-decoration: none;
        font-size: 13px;
        font-weight: 850;
    }

    .nav-links a:hover,
    .nav-cta {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
    }

    .nav-cta,
    .primary-btn {
        background: var(--primary);
    }

    .article-shell {
        max-width: 1120px;
        margin: 0 auto;
        padding: 52px 22px 90px;
    }

    .article-hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 360px;
        gap: 34px;
        align-items: end;
        margin-bottom: 42px;
    }

    .back-link,
    .eyebrow {
        display: inline-flex;
        width: fit-content;
        text-decoration: none;
        font-weight: 900;
    }

    .back-link {
        grid-column: 1 / -1;
        color: var(--primary-dark);
        font-size: 14px;
    }

    .hero-copy {
        max-width: 730px;
        min-width: 0;
    }

    .eyebrow {
        margin: 0 0 14px;
        border-radius: 999px;
        padding: 7px 12px;
        color: var(--primary-dark);
        background: var(--primary-soft);
        font-size: 12px;
    }

    h1 {
        margin-bottom: 18px;
        font-family: "Inter Tight", Inter, sans-serif;
        font-size: clamp(38px, 5vw, 58px);
        line-height: 1.04;
        letter-spacing: 0;
        text-wrap: balance;
    }

    .article-hero p {
        max-width: 680px;
        color: #53637b;
        font-size: 18px;
        line-height: 1.68;
    }

    .hero-links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
    }

    .hero-links a {
        display: inline-flex;
        align-items: center;
        min-height: 38px;
        border: 1px solid #fed7c2;
        border-radius: 999px;
        padding: 0 13px;
        color: var(--primary-dark);
        background: #fff;
        text-decoration: none;
        font-size: 13px;
        font-weight: 900;
    }

    .article-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
    }

    .article-meta span {
        border-radius: 999px;
        padding: 8px 11px;
        color: #344054;
        background: #fff;
        border: 1px solid var(--line);
        font-size: 13px;
        font-weight: 850;
    }

    .article-visual {
        display: grid;
        align-content: end;
        min-height: 230px;
        border-radius: 18px;
        padding: 28px;
        color: #fff;
        box-shadow: 0 18px 45px rgba(17, 24, 39, 0.16);
        background:
            linear-gradient(145deg, rgba(17, 24, 39, 0.76), rgba(17, 24, 39, 0.96)),
            radial-gradient(circle at 82% 18%, rgba(255, 107, 53, 0.78), transparent 30%),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 18px);
    }

    .article-visual span,
    .article-visual strong {
        display: block;
    }

    .article-visual span {
        max-width: 330px;
        font-size: 30px;
        line-height: 1;
        font-weight: 950;
        text-wrap: balance;
    }

    .article-visual strong {
        margin-top: 10px;
        color: #ffbd9f;
    }

    .article-layout {
        display: grid;
        grid-template-columns: minmax(0, 760px) 320px;
        gap: 44px;
        align-items: start;
    }

    .article-content {
        min-width: 0;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 38px;
        background: #fff;
        box-shadow: 0 14px 34px rgba(17, 24, 39, 0.05);
    }

    .article-content section + section {
        margin-top: 42px;
        padding-top: 36px;
        border-top: 1px solid var(--line);
    }

    .article-content h2 {
        margin-bottom: 16px;
        font-family: "Inter Tight", Inter, sans-serif;
        font-size: clamp(28px, 4vw, 40px);
        line-height: 1.08;
        letter-spacing: 0;
    }

    .article-content p,
    .article-content li {
        color: #3f4a5d;
        font-size: 18px;
        line-height: 1.78;
    }

    .article-content ul {
        display: grid;
        gap: 12px;
        padding-left: 24px;
    }

    .takeaway-box {
        border: 1px solid #fed7c2;
        border-radius: 16px;
        padding: 24px;
        background: var(--primary-soft);
    }

    .subscription-callout {
        border: 1px solid #fed7c2;
        border-radius: 16px;
        padding: 24px;
        background: linear-gradient(180deg, #fff, var(--primary-soft));
    }

    .subscription-callout h2 {
        font-size: 28px;
    }

    .article-content a {
        color: var(--primary-dark);
        font-weight: 900;
        text-decoration: underline;
        text-underline-offset: 3px;
    }

    .article-content .primary-btn {
        color: #fff;
        text-decoration: none;
    }

    .takeaway-box h2 {
        font-size: 28px;
    }

    .faq-block details {
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 16px 18px;
        background: #f8fafc;
    }

    .faq-block details + details {
        margin-top: 12px;
    }

    .faq-block summary {
        cursor: pointer;
        font-weight: 950;
    }

    .faq-block p {
        margin: 12px 0 0;
    }

    .article-cta {
        text-align: center;
    }

    .primary-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        border-radius: 12px;
        padding: 0 22px;
        color: #fff;
        text-decoration: none;
        font-weight: 950;
        box-shadow: 0 14px 30px rgba(255, 107, 53, 0.26);
    }

    .article-sidebar {
        position: sticky;
        top: 24px;
        display: grid;
        gap: 18px;
    }

    .sidebar-card {
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px;
        background: #fff;
        box-shadow: 0 14px 34px rgba(17, 24, 39, 0.05);
    }

    .sidebar-card h2 {
        margin-bottom: 18px;
        font-size: 24px;
        line-height: 1.15;
    }

    .sidebar-card a {
        display: block;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 16px;
        text-decoration: none;
    }

    .sidebar-card a + a {
        margin-top: 12px;
    }

    .sidebar-card span,
    .sidebar-card small {
        display: block;
    }

    .sidebar-card span {
        margin-bottom: 7px;
        color: var(--primary-dark);
        font-size: 12px;
        font-weight: 950;
    }

    .sidebar-card strong {
        display: block;
        margin-bottom: 6px;
        line-height: 1.25;
    }

    .sidebar-card small {
        color: var(--muted);
        line-height: 1.5;
    }

    @media (max-width: 960px) {
        .article-hero,
        .article-layout {
            grid-template-columns: 1fr;
        }

        .article-sidebar {
            position: static;
        }
    }

    @media (max-width: 720px) {
        .article-nav,
        .nav-links {
            align-items: flex-start;
            flex-direction: column;
        }

        .article-shell {
            padding-top: 36px;
        }

        .article-content {
            padding: 24px 18px;
        }

        .article-visual {
            min-height: 230px;
        }
    }
</style>
