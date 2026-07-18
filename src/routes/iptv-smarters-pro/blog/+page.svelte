<svelte:head>
    <title>IPTV Smarters Pro Blog | USA, UK & Canada Streaming Guides</title>
    <meta
        name="description"
        content="Read IPTV Smarters Pro guides for USA, UK, and Canada viewers, including subscription tips, Firestick apps, Smart TV setup, iPhone setup, and IBO Player tutorials."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://iptvsmarterspro.firetempmail.com/blog/" />
    <meta property="og:title" content="IPTV Smarters Pro Blog" />
    <meta property="og:description" content="Practical IPTV guides for subscriptions, Firestick, Smart TV, iPhone, iPad, and IBO Player setup." />
    <meta property="og:url" content="https://iptvsmarterspro.firetempmail.com/blog/" />
    <meta property="og:type" content="website" />
</svelte:head>

<script>
    import { iptvPosts } from '$lib/data/iptvPosts.js';
</script>

<main class="iptv-blog-page">
    <nav class="blog-nav" aria-label="IPTV blog navigation">
        <a class="brand" href="/">
            <span class="brand-mark">IP</span>
            <span>
                <strong>IPTV Smarters Pro</strong>
                <small>Powered by FireTempMail</small>
            </span>
        </a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/#plans">IPTV Subscriptions</a>
            <a href="/#compatibility">Installation Guides</a>
            <a href="/blog/">Blog</a>
        </div>
        <a class="nav-cta" href="/#plans">Buy Now</a>
    </nav>

    <section class="blog-hero">
        <p class="eyebrow">IPTV Smarters Pro Guides</p>
        <h1>Blog</h1>
        <p>
            Explore in-depth IPTV USA guides, expert comparisons, and step-by-step tutorials designed to help you choose the best IPTV subscription for reliable streaming across the United States, United Kingdom, and Canada.
        </p>
        <a class="primary-btn" href="/#plans">Get Your IPTV Subscription</a>
    </section>

    <section class="posts-section" aria-label="IPTV articles">
        <div class="posts-grid">
            {#each iptvPosts as post, index}
                <article class="post-card">
                    <a class={`post-thumb ${post.accent}`} href={`/blog/${post.slug}/`} aria-label={`Read ${post.title}`}>
                        <span>{post.category}</span>
                        <strong>{post.hero}</strong>
                        <small>USA Guide 2026</small>
                        <i>{index + 1}</i>
                    </a>
                    <div class="post-body">
                        <p class="post-meta">{post.category} · {post.readTime}</p>
                        <h2><a href={`/blog/${post.slug}/`}>{post.shortTitle}</a></h2>
                        <a class="read-link" href={`/blog/${post.slug}/`}>Read More</a>
                    </div>
                </article>
            {/each}
        </div>
    </section>

    <section class="bottom-cta">
        <a class="primary-btn" href="/#plans">Get Your IPTV Subscription</a>
        <p>Instant delivery · Setup guidance · Multi-device compatibility</p>
    </section>

    <footer class="blog-footer">
        <div>
            <a class="brand" href="/">
                <span class="brand-mark">IP</span>
                <span>
                    <strong>IPTV Smarters Pro</strong>
                    <small>Powered by FireTempMail</small>
                </span>
            </a>
            <p>Practical IPTV Smarters Pro resources for USA, UK, and Canada viewers.</p>
        </div>
        <div>
            <h3>Pages</h3>
            <a href="/">Home</a>
            <a href="/#plans">Subscriptions</a>
            <a href="/blog/">Blog</a>
        </div>
        <div>
            <h3>Guides</h3>
            {#each iptvPosts.slice(0, 3) as post}
                <a href={`/blog/${post.slug}/`}>{post.shortTitle}</a>
            {/each}
        </div>
        <div>
            <h3>Contact</h3>
            <a href="mailto:business@firetempmail.com">business@firetempmail.com</a>
            <a href="https://firetempmail.com/privacy-policy">Privacy Policy</a>
            <a href="https://firetempmail.com/terms">Terms</a>
        </div>
    </footer>
</main>

<style>
    :global(.modern-header),
    :global(.footer) {
        display: none !important;
    }

    :global(body) {
        background: #f8fafc;
    }

    .iptv-blog-page {
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

    .iptv-blog-page * {
        box-sizing: border-box;
    }

    a {
        color: inherit;
    }

    h1,
    h2,
    h3,
    p {
        margin-top: 0;
    }

    .blog-nav {
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
        flex-wrap: wrap;
        justify-content: center;
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

    .blog-hero {
        max-width: 1120px;
        margin: 0 auto;
        padding: 78px 22px 88px;
        text-align: center;
        background: #f1f4f8;
    }

    .eyebrow {
        display: inline-flex;
        width: fit-content;
        margin: 0 auto 14px;
        border-radius: 999px;
        padding: 7px 12px;
        color: var(--primary-dark);
        background: var(--primary-soft);
        font-size: 12px;
        font-weight: 900;
    }

    h1 {
        margin-bottom: 18px;
        font-family: "Inter Tight", Inter, sans-serif;
        font-size: clamp(52px, 8vw, 84px);
        line-height: 0.95;
        letter-spacing: 0;
    }

    .blog-hero p {
        max-width: 780px;
        margin: 0 auto 28px;
        color: #53637b;
        font-size: 20px;
        line-height: 1.55;
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

    .posts-section {
        max-width: 1120px;
        margin: 0 auto;
        padding: 88px 22px;
    }

    .posts-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 54px 48px;
    }

    .post-card {
        min-width: 0;
    }

    .post-thumb {
        position: relative;
        display: grid;
        align-content: end;
        min-height: 242px;
        overflow: hidden;
        border-radius: 8px;
        padding: 22px;
        color: #fff;
        text-decoration: none;
        background:
            linear-gradient(145deg, rgba(17, 24, 39, 0.72), rgba(17, 24, 39, 0.94)),
            radial-gradient(circle at 80% 16%, rgba(255, 107, 53, 0.78), transparent 28%),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 16px);
    }

    .post-thumb.blue {
        background:
            linear-gradient(145deg, rgba(17, 24, 39, 0.78), rgba(17, 24, 39, 0.95)),
            radial-gradient(circle at 22% 24%, rgba(14, 165, 233, 0.82), transparent 31%),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 16px);
    }

    .post-thumb.sky,
    .post-thumb.green {
        background:
            linear-gradient(145deg, rgba(15, 23, 42, 0.7), rgba(17, 24, 39, 0.95)),
            radial-gradient(circle at 76% 18%, rgba(34, 197, 94, 0.72), transparent 30%),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 18px);
    }

    .post-thumb.red,
    .post-thumb.navy {
        background:
            linear-gradient(145deg, rgba(17, 24, 39, 0.74), rgba(17, 24, 39, 0.96)),
            radial-gradient(circle at 18% 20%, rgba(255, 107, 53, 0.72), transparent 30%),
            radial-gradient(circle at 82% 80%, rgba(14, 165, 233, 0.38), transparent 36%);
    }

    .post-thumb::before {
        content: "";
        position: absolute;
        inset: 18px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }

    .post-thumb span,
    .post-thumb strong,
    .post-thumb small {
        position: relative;
        z-index: 1;
        display: block;
    }

    .post-thumb span {
        width: fit-content;
        margin-bottom: 10px;
        border-radius: 999px;
        padding: 5px 9px;
        background: rgba(255, 255, 255, 0.14);
        font-size: 11px;
        font-weight: 950;
    }

    .post-thumb strong {
        max-width: 280px;
        font-size: 28px;
        line-height: 1.02;
        font-weight: 950;
    }

    .post-thumb small {
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.72);
        font-weight: 850;
    }

    .post-thumb i {
        position: absolute;
        right: 16px;
        top: 14px;
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: var(--primary);
        font-style: normal;
        font-weight: 950;
    }

    .post-body {
        padding-top: 22px;
    }

    .post-meta {
        margin-bottom: 9px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 850;
    }

    .post-body h2 {
        margin-bottom: 10px;
        font-size: 24px;
        line-height: 1.16;
        letter-spacing: 0;
    }

    .post-body h2 a,
    .read-link {
        text-decoration: none;
    }

    .read-link {
        color: var(--primary-dark);
        font-style: italic;
        font-weight: 850;
    }

    .bottom-cta {
        display: grid;
        gap: 14px;
        justify-items: center;
        padding: 54px 22px 70px;
        color: #fff;
        background: #0b1220;
        text-align: center;
    }

    .bottom-cta p {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
        font-weight: 850;
    }

    .blog-footer {
        display: grid;
        grid-template-columns: 1.4fr repeat(3, 1fr);
        gap: 36px;
        padding: 54px max(22px, calc((100vw - 1120px) / 2));
        color: rgba(255, 255, 255, 0.72);
        background: #05070b;
    }

    .blog-footer h3 {
        margin-bottom: 12px;
        color: #fff;
        font-size: 14px;
    }

    .blog-footer a,
    .blog-footer p {
        color: rgba(255, 255, 255, 0.64);
        line-height: 1.6;
        text-decoration: none;
    }

    .blog-footer a {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
    }

    @media (max-width: 960px) {
        .posts-grid,
        .blog-footer {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 720px) {
        .blog-nav,
        .nav-links {
            align-items: flex-start;
            flex-direction: column;
        }

        .posts-grid,
        .blog-footer {
            grid-template-columns: 1fr;
        }

        .blog-hero {
            padding-top: 54px;
        }
    }
</style>
