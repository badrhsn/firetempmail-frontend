<script>
    import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<svelte:head>
    <title>About Alex Morgan – Privacy & Email Security Researcher | Fire Temp Mail</title>
    <meta name="description" content="Alex Morgan is a privacy and email security researcher and the author behind the Fire Temp Mail blog. Read about Alex's background in disposable email tools and online data protection." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://firetempmail.com/about/author" />

    <meta property="og:title" content="About Alex Morgan – Fire Temp Mail Blog" />
    <meta property="og:description" content="Privacy and email security researcher. Author of the Fire Temp Mail blog covering disposable email, spam protection, and online privacy." />
    <meta property="og:url" content="https://firetempmail.com/about/author" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:image" content="https://api.dicebear.com/9.x/avataaars/png?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50&size=400" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="About Alex Morgan – Fire Temp Mail" />
    <meta name="twitter:description" content="Privacy researcher and author behind the Fire Temp Mail blog." />
    <meta name="twitter:image" content="https://api.dicebear.com/9.x/avataaars/png?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50&size=400" />
    <meta name="twitter:site" content="@firetempmail" />

    <!-- Person Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://firetempmail.com/about/author#person",
      "name": "Alex Morgan",
      "url": "https://firetempmail.com/about/author",
      "image": {
        "@type": "ImageObject",
        "url": "https://api.dicebear.com/9.x/avataaars/png?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50&size=400",
        "width": 400,
        "height": 400
      },
      "jobTitle": "Privacy & Email Security Researcher",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://firetempmail.com/#organization",
        "name": "Fire Temp Mail",
        "url": "https://firetempmail.com"
      },
      "description": "Privacy and email security researcher specializing in disposable email tools, spam protection, and online data privacy.",
      "sameAs": [
        "https://firetempmail.com/blog"
      ],
      "knowsAbout": [
        "Disposable email",
        "Email privacy",
        "Spam protection",
        "Online anonymity",
        "Data security"
      ]
    }
    </script>

    <!-- BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://firetempmail.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Alex Morgan", "item": "https://firetempmail.com/about/author" }
      ]
    }
    </script>
</svelte:head>

<div class="container" style="max-width: 800px; margin: 0 auto; padding: 0 1rem;">
    <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Alex Morgan", href: "/about/author" }
    ]} />
</div>

<section class="author-page">
    <div class="author-page-inner">

        <!-- Hero -->
        <div class="author-hero">
            <img
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=AlexMorgan&backgroundColor=b6e3f4&radius=50"
                alt="Alex Morgan"
                class="author-hero-avatar"
                width="120"
                height="120"
            />
            <div class="author-hero-text">
                <h1 class="author-hero-name">Alex Morgan</h1>
                <p class="author-hero-title">Privacy &amp; Email Security Researcher</p>
                <p class="author-hero-at">
                    <a href="/" class="author-at-link">🔥 Fire Temp Mail</a>
                </p>
            </div>
        </div>

        <!-- Bio -->
        <article class="author-bio-section">
            <h2>Hey, I'm Alex.</h2>

            <p>
                I've spent the better part of the last decade thinking about something most people don't: 
                what happens to your email address after you hand it to a website. The answer, honestly, 
                is usually nothing good. It ends up on a list, that list gets sold, and before long your 
                inbox looks like a classified ads section from 2003. I got tired of it, which is part of 
                why I ended up writing so much about disposable email tools.
            </p>

            <p>
                My background is in privacy research and security testing. I've spent years looking at 
                how platforms collect, store, and — occasionally — leak user data. Email addresses are 
                low-hanging fruit for data brokers, and most people have no idea how many places have 
                theirs on file. That bothers me, and it probably should bother you too.
            </p>

            <p>
                What I actually do here is test things. I sign up for services with disposable addresses, 
                track what happens, and write about it plainly. No jargon for the sake of it, no 
                breathless "EVERYTHING IS A DISASTER" headlines. Just honest breakdowns of what works, 
                what doesn't, and why your privacy matters even when you're just signing up for a free trial.
            </p>

            <p>
                I'm particularly interested in the intersection of convenience and security — the idea 
                that protecting yourself online shouldn't require a computer science degree. Tools like 
                FireTempMail exist precisely because the friction of maintaining a clean inbox shouldn't 
                fall entirely on the user. You deserve to try things without committing your real identity 
                to every service that asks for it.
            </p>

            <p>
                If you read something I wrote and want to push back on it, or you've got a specific 
                privacy question you'd like me to dig into — <a href="/contact">reach out</a>. 
                I read everything.
            </p>
        </article>

        <!-- Areas of focus -->
        <div class="author-topics">
            <h3>What I write about</h3>
            <ul class="author-topics-list">
                <li>🛡️ Disposable &amp; temporary email tools</li>
                <li>🔒 Email privacy and spam prevention</li>
                <li>🕵️ Online anonymity and data protection</li>
                <li>📬 How platforms handle (and mishandle) user data</li>
                <li>🧪 Hands-on reviews of privacy services</li>
            </ul>
        </div>

        <!-- CTA -->
        <div class="author-cta">
            <a href="/blog" class="author-cta-btn">Read the blog →</a>
            <a href="/contact" class="author-cta-secondary">Get in touch</a>
        </div>

    </div>
</section>

<style>
    .author-page {
        padding: 2rem 1rem 4rem;
    }
    .author-page-inner {
        max-width: 800px;
        margin: 0 auto;
    }

    /* Hero */
    .author-hero {
        display: flex;
        align-items: center;
        gap: 1.75rem;
        margin-bottom: 2.5rem;
        padding: 2rem;
        background: linear-gradient(135deg, #fff7f4 0%, #f0f4ff 100%);
        border-radius: 16px;
        border: 1px solid #eee;
    }
    .author-hero-avatar {
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        flex-shrink: 0;
    }
    .author-hero-name {
        font-family: 'Inter Tight', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.25rem;
        color: #1a1a1a;
    }
    .author-hero-title {
        font-size: 1rem;
        color: #555;
        margin: 0 0 0.4rem;
    }
    .author-hero-at {
        margin: 0;
    }
    .author-at-link {
        font-size: 0.9rem;
        font-weight: 600;
        color: #ff6b35;
        text-decoration: none;
    }
    .author-at-link:hover {
        text-decoration: underline;
    }

    /* Bio */
    .author-bio-section {
        line-height: 1.85;
        color: #333;
    }
    .author-bio-section h2 {
        font-family: 'Inter Tight', sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: #1a1a1a;
    }
    .author-bio-section p {
        margin-bottom: 1.25rem;
        font-size: 1.02rem;
    }
    .author-bio-section a {
        color: #ff6b35;
        text-decoration: underline;
    }

    /* Topics */
    .author-topics {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 2rem 0;
        border: 1px solid #e9ecef;
    }
    .author-topics h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 1rem;
        color: #1a1a1a;
    }
    .author-topics-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.6rem;
    }
    .author-topics-list li {
        font-size: 0.95rem;
        color: #444;
    }

    /* CTA */
    .author-cta {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 2.5rem;
    }
    .author-cta-btn {
        background: linear-gradient(135deg, #ff6b35, #e85d2e);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 700;
        text-decoration: none;
        font-size: 0.95rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .author-cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(255, 107, 53, 0.35);
    }
    .author-cta-secondary {
        color: #555;
        font-size: 0.9rem;
        text-decoration: none;
        border-bottom: 1px solid #ccc;
        padding-bottom: 1px;
        transition: color 0.2s;
    }
    .author-cta-secondary:hover {
        color: #ff6b35;
        border-color: #ff6b35;
    }

    @media (max-width: 520px) {
        .author-hero {
            flex-direction: column;
            text-align: center;
        }
        .author-hero-name {
            font-size: 1.6rem;
        }
    }
</style>
