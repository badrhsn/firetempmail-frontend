<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { _ } from 'svelte-i18n';
    import AuthorBox from '$lib/components/AuthorBox.svelte';
    export let data;

    let post = data?.post || null;
    let error = null;
    let isLoading = !post;
    let scrollPercentage = 0;
    let copyrightYear = new Date().getFullYear();
    let relatedPosts = data?.relatedPosts || [];

    // Normalize D1 field names
    $: if (post) {
        if (!post.date && post.created_at) post.date = post.created_at;
        if (!post.readTime && post.read_time) post.readTime = post.read_time;
    }

    // Determine if content is thin (< 1500 chars of text)
    $: isThinContent = post?.content
        ? post.content.replace(/<[^>]*>/g, '').length < 1500
        : false;

    // Build FAQPage schema from FAQ section in content
    function extractFaqSchema(postObj) {
        if (!postObj?.content) return null;
        const faqItems = [];
        const h3Regex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs;
        let match;
        while ((match = h3Regex.exec(postObj.content)) !== null) {
            faqItems.push({
                "@type": "Question",
                "name": match[1].replace(/<[^>]*>/g, ''),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": match[2].replace(/<[^>]*>/g, '')
                }
            });
        }
        if (faqItems.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems
        };
    }

    // Build HowTo schema for Guides category
    function buildHowToSchema(postObj) {
        if (!postObj || postObj.category !== 'Guides') return null;
        // Extract ordered list items from the "How to Use" section
        const olMatch = postObj.content?.match(/<h2>How to Use FireTempMail.*?<\/h2>.*?<ol>([\s\S]*?)<\/ol>/);
        if (!olMatch) return null;
        const steps = [];
        const liRegex = /<li>.*?<strong>(.*?)<\/strong>(.*?)<\/li>/gs;
        let m;
        let pos = 1;
        while ((m = liRegex.exec(olMatch[1])) !== null) {
            steps.push({
                "@type": "HowToStep",
                "position": pos++,
                "name": m[1].replace(/<[^>]*>/g, '').replace(/:$/, ''),
                "text": (m[1] + m[2]).replace(/<[^>]*>/g, '').trim()
            });
        }
        if (steps.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to Use Temp Email for ${postObj.platform || postObj.title}`,
            "step": steps
        };
    }

    // Build Review schema from test results data embedded in content
    function buildReviewSchema(postObj) {
        if (!postObj?.platform || !postObj?.content) return null;
        // Extract rating from the test results table
        const ratingMatch = postObj.content.match(/Compatibility rating<\/td>\s*<td[^>]*><strong>(\d)\/5<\/strong>\s*—\s*(\w+)/);
        if (!ratingMatch) return null;
        return {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "WebApplication",
                "name": postObj.platform,
                "applicationCategory": "WebApplication"
            },
            "author": {
                "@type": "Organization",
                "name": "Fire Temp Mail"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": parseInt(ratingMatch[1]),
                "bestRating": 5,
                "worstRating": 1
            },
            "reviewBody": `We tested FireTempMail's disposable email service with ${postObj.platform}. Compatibility rating: ${ratingMatch[1]}/5 (${ratingMatch[2]}).`
        };
    }

    $: faqSchema = extractFaqSchema(post);
    $: howToSchema = buildHowToSchema(post);
    $: reviewSchema = buildReviewSchema(post);

    // Top 15 traffic articles to show the methodology badge on (May 2026).
    // Kept deliberately narrow to avoid the "everything was changed at once" footprint.
    const METHODOLOGY_BADGE_SLUGS = new Set([
        'best-temp-mail-gmail-alternatives',
        'best-temp-mail-in-germany',
        'how-to-recover-temp-mail-email-address',
        'temp-email-for-claude',
        'instagram-temp-mail-sign-up-without-personal-email',
        'germany-temp-mail-services',
        'temp-mail-vs-burner-email',
        'gmailnator-alternatives',
        'temp-email-for-chatgpt',
        'temp-email-for-ai-tools',
        'temp-mail-for-amazon-prime',
        'temp-email-for-cursor',
        'temp-email-for-gaming-platforms',
        'tiktok-temporary-email-guide-avoid-spam-signups',
        'temp-email-for-tiktok'
    ]);
    $: showMethodologyBadge = post && METHODOLOGY_BADGE_SLUGS.has(post.slug);

    onMount(() => {
        if (!post) {
            error = 'Post not found';
            isLoading = false;
        } else {
            isLoading = false;
        }

        // Scroll progress bar
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            scrollPercentage = (scrollTop / documentHeight) * 100;
            scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    // Share functions
    function shareOnFacebook(post) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }

    function shareOnTwitter(post) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }

    function shareOnLinkedIn(post) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title);
        const summary = encodeURIComponent(post.excerpt);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
    }
</script>

<svelte:head>
    <title>{post ? `${post.title} - Fire Temp Mail Blog` : 'Blog Post - Fire Temp Mail'}</title>
    {#if post}
        <meta name="description" content={post.excerpt} />
    <meta name="robots" content={isThinContent ? "noindex, follow" : "index, follow"}>
        <link rel="canonical" href={`https://firetempmail.com/blog/${post.slug}`} />

        <!-- Open Graph -->
        <meta property="og:title" content={`${post.title} - Fire Temp Mail Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://firetempmail.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://firetempmail.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="{post.title} – Fire Temp Mail" />
        <meta property="article:published_time" content={post.created_at || post.date} />
        <meta property="article:author" content="Alex Morgan" />
        <meta property="article:section" content={post.category} />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png" />
    <meta name="twitter:site" content="@firetempmail" />

        <!-- Sitemap -->
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        <!-- BlogPosting Schema -->
        {@html `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.created_at || post.date,
            "dateModified": post.created_at || post.date,
            "author": {
                "@type": "Person",
                "@id": "https://firetempmail.com/about/author#person",
                "name": "Alex Morgan",
                "url": "https://firetempmail.com/about/author"
            },
            "publisher": {
                "@type": "Organization",
                "@id": "https://firetempmail.com/#organization",
                "name": "Fire Temp Mail",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://firetempmail.com/og-image.png",
                    "width": 1200,
                    "height": 630
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://firetempmail.com/blog/${post.slug}`
            },
            "articleSection": post.category,
            "wordCount": post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0
        })}</script>`}

        <!-- BreadcrumbList Schema -->
        {@html `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://firetempmail.com/blog" },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://firetempmail.com/blog/${post.slug}` }
            ]
        })}</script>`}

        <!-- FAQPage Schema (extracted from FAQ section) -->
        {#if faqSchema}
            {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
        {/if}

        <!-- HowTo Schema (for Guides category) -->
        {#if howToSchema}
            {@html `<script type="application/ld+json">${JSON.stringify(howToSchema)}</script>`}
        {/if}

        <!-- Review Schema (for platform compatibility rating) -->
        {#if reviewSchema}
            {@html `<script type="application/ld+json">${JSON.stringify(reviewSchema)}</script>`}
        {/if}
    {:else}
        <meta name="description" content="Read about temporary email, privacy, and online security on the Fire Temp Mail blog." />
    {/if}
</svelte:head>


<!-- Reading Progress Bar -->
<div class="reading-progress-bar">
    <div class="reading-progress" style={`width: ${scrollPercentage}%`}></div>
</div>

{#if isLoading}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>{$_('blog.loading')}</h1>
                <p>{$_('blog.pleaseWait')}</p>
                <a href="/blog">← {$_('blog.backToBlog')}</a>
            </div>
        </div>
    </section>
{:else if error}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>{$_('blog.error')}</h1>
                <p>{error}</p>
                <a href="/blog">← {$_('blog.backToBlog')}</a>
            </div>
        </div>
    </section>
{:else if post}
    <!-- Show actual post content when data is available -->
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">

                    {#if showMethodologyBadge}
                        <div class="methodology-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M9 12l2 2 4-4"/>
                                <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Reviewed against our <a href="/methodology">testing methodology</a>
                        </div>
                    {/if}
                <!-- Article Header -->
                <div style="text-align: left; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <span style="background: #e9ecef; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                            {post.category}
                        </span>
                        <span style="margin: 0 0.5rem;">•</span>
                        <span style="color: #6c757d; font-size: 0.9rem;">{post.date}</span>
                        <span style="margin: 0 0.5rem;">•</span>
                        <span style="color: #6c757d; font-size: 0.9rem;">{post.readTime}</span>
                    </div>
                    
                    <h1 style="font-family: 'Inter Tight', sans-serif; font-weight: 600; margin-bottom: 1rem;">
                        {post.title}
                    </h1>
                    
                    <p style="font-size: 1.2rem; color: #6c757d; margin-bottom: 1.5rem;">
                        {post.excerpt}
                    </p>
                    
                    <AuthorBox compact={true} />
                </div>
                
                <!-- Article Content -->
                <div style="text-align: left; line-height: 1.8;">
                    {@html post.content}
                </div>
                
                <!-- Author Box -->
                <AuthorBox />

                <!-- Share buttons -->
                <div style="text-align: left; margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">{$_('blog.shareArticle')}</h3>
                    <div style="display: flex; gap: 1rem;">
                        <button on:click={() => shareOnFacebook(post)} style="padding: 0.5rem 1rem; background: #3b5998; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">Facebook</button>
                        <button on:click={() => shareOnTwitter(post)} style="padding: 0.5rem 1rem; background: #1da1f2; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">Twitter</button>
                        <button on:click={() => shareOnLinkedIn(post)} style="padding: 0.5rem 1rem; background: #0077b5; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">LinkedIn</button>
                    </div>
                </div>

                <!-- Related Articles -->
                {#if relatedPosts.length > 0}
                <div style="text-align: left; margin: 2rem 0; padding: 1.5rem; border-top: 1px solid #e9ecef;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 1.5rem;">Related Articles</h3>
                    <div style="display: grid; gap: 1rem;">
                        {#each relatedPosts as related}
                            <a href="/blog/{related.slug}" style="display: block; padding: 1rem; background: #f8f9fa; border-radius: 8px; text-decoration: none; color: inherit; transition: background 0.2s;">
                                <div style="font-weight: 600; color: #333; margin-bottom: 0.25rem;">{related.title}</div>
                                <div style="font-size: 0.85rem; color: #6c757d;">{related.excerpt}</div>
                                <div style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">{related.category} · {related.read_time || related.readTime}</div>
                            </a>
                        {/each}
                    </div>
                </div>
                {/if}
            </div>
        </div>
    </section>
{:else}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>{$_('blog.error')}</h1>
                <p>{$_('blog.postNotFound')}</p>
                <a href="/blog">← {$_('blog.backToBlog')}</a>
            </div>
        </div>
    </section>
{/if}

<style>
    .reading-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(0, 123, 255, 0.2);
        z-index: 10000;
        transition: opacity 0.3s;
    }
    
    .reading-progress {
        height: 100%;
        background: linear-gradient(90deg, #007bff, #0056b3);
        transition: width 0.2s ease-out;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    }

    /* Subtle methodology badge — sits under the date/category line on top traffic articles */
    .methodology-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.82rem;
        color: #475569;
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        margin-bottom: 1rem;
    }
    .methodology-badge svg {
        color: #16a34a;
        flex-shrink: 0;
    }
    .methodology-badge a {
        color: #475569;
        text-decoration: underline;
        text-decoration-color: #cbd5e1;
        text-underline-offset: 2px;
    }
    .methodology-badge a:hover {
        color: #0f172a;
        text-decoration-color: #0f172a;
    }

    /* Blog Content Styling */
    :global(.quick-answer-box) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        margin: 24px 0;
        border-left: 5px solid #fff;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    :global(.quick-answer-box strong) {
        font-size: 1.1rem;
        display: block;
        margin-bottom: 8px;
    }

    :global(.note-box) {
        background: #e7f3ff;
        border-left: 4px solid #2196F3;
        padding: 16px 20px;
        margin: 20px 0;
        border-radius: 8px;
    }

    :global(.note-box strong) {
        color: #1976D2;
        font-weight: 600;
    }

    :global(.warning-box) {
        background: #fff3cd;
        border-left: 4px solid #ff9800;
        padding: 16px 20px;
        margin: 20px 0;
        border-radius: 8px;
    }

    :global(.warning-box strong) {
        color: #f57c00;
        font-weight: 600;
    }

    :global(.cta-link) {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white !important;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.2s, box-shadow 0.2s;
        margin: 8px 0;
    }

    :global(.cta-link:hover) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        color: white !important;
    }

    :global(article table) {
        width: 100%;
        border-collapse: collapse;
        margin: 24px 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    :global(article thead) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    :global(article th) {
        padding: 14px 16px;
        text-align: left;
        font-weight: 600;
    }

    :global(article td) {
        padding: 12px 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    :global(article tbody tr:nth-child(even)) {
        background-color: #f8f9fa;
    }

    :global(article tbody tr:hover) {
        background-color: #e7f3ff;
    }

    :global(article code) {
        background: #f4f4f4;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        color: #d73a49;
    }

    :global(article ul), :global(article ol) {
        margin: 16px 0;
        padding-left: 24px;
        line-height: 1.8;
    }

    :global(article li) {
        margin: 8px 0;
    }

    :global(article h2) {
        margin-top: 32px;
        margin-bottom: 16px;
        color: #1a1a1a;
        font-weight: 700;
        font-size: 1.8rem;
    }

    :global(article h3) {
        margin-top: 24px;
        margin-bottom: 12px;
        color: #333;
        font-weight: 600;
        font-size: 1.4rem;
    }

    :global(article h4) {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #444;
        font-weight: 600;
        font-size: 1.2rem;
    }

    :global(article p) {
        margin: 16px 0;
        line-height: 1.8;
        color: #333;
    }

    :global(article a) {
        color: #667eea;
        text-decoration: underline;
        transition: color 0.2s;
    }

    :global(article a:hover) {
        color: #764ba2;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
        .reading-progress-bar {
            height: 3px;
        }

        :global(.quick-answer-box),
        :global(.note-box),
        :global(.warning-box) {
            padding: 16px;
            margin: 16px 0;
        }

        :global(article h2) {
            font-size: 1.5rem;
        }

        :global(article h3) {
            font-size: 1.2rem;
        }

        :global(article table) {
            font-size: 0.9rem;
        }
    }
</style>
