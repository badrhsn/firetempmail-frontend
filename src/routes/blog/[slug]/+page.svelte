<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { getPostBySlug, getAllPosts } from '$lib/data/blogPosts';
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';

    export let data;

    let post = data?.post || null; // Start with SSR data if available
    let error = null;
    let isLoading = !post; // Only loading if no post was preloaded
    let scrollPercentage = 0;
    let copyrightYear = new Date().getFullYear();
    let relatedPosts = [];

    // Get slug from URL
    let slug;
    $: slug = $page.params.slug;

    function getRelatedPosts(currentPost) {
        if (!currentPost) return [];
        const allPosts = getAllPosts();
        return allPosts
            .filter(p => p.slug !== currentPost.slug)
            .filter(p => p.category === currentPost.category)
            .slice(0, 3);
    }

    // Load post on mount if not already provided by SSR
    onMount(() => {
        if (!post) {
            try {
                const fetchedPost = getPostBySlug(slug);
                if (fetchedPost) {
                    post = fetchedPost;
                    relatedPosts = getRelatedPosts(post);
                    isLoading = false;
                } else {
                    error = 'Post not found';
                    isLoading = false;
                }
            } catch (err) {
                console.error('Error loading post:', err);
                error = 'Failed to load post';
                isLoading = false;
            }
        } else {
            relatedPosts = getRelatedPosts(post);
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

{#if post}<Hreflang path={'/blog/' + post.slug} />{/if}
<svelte:head>
    <title>{post ? `${post.title} - Fire Temp Mail Blog` : 'Blog Post - Fire Temp Mail'}</title>
    {#if post}
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://firetempmail.com/blog/${post.slug}`} />

        <!-- Open Graph -->
        <meta property="og:title" content={`${post.title} - Fire Temp Mail Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://firetempmail.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Fire Temp Mail" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Fire Temp Mail Team" />
        <meta property="article:section" content={post.category} />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />

        <!-- Sitemap -->
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        <!-- BlogPosting Schema -->
        {@html `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
                "@type": "Person",
                "name": post.author || "Fire Temp Mail Team",
                "url": "https://firetempmail.com/about"
            },
            "publisher": {
                "@type": "Organization",
                "@id": "https://firetempmail.com/#organization",
                "name": "Fire Temp Mail",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://firetempmail.com/favicon.ico"
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
    <!-- Breadcrumb Navigation -->
    <nav aria-label="Breadcrumb" style="max-width: 800px; margin: 1rem auto; padding: 0 1rem;">
        <ol style="display: flex; list-style: none; padding: 0; margin: 0; font-size: 0.85rem; color: #6c757d;">
            <li><a href="/" style="color: #007bff; text-decoration: none;">Home</a></li>
            <li style="margin: 0 0.5rem;">/</li>
            <li><a href="/blog" style="color: #007bff; text-decoration: none;">Blog</a></li>
            <li style="margin: 0 0.5rem;">/</li>
            <li style="color: #333;">{post.title}</li>
        </ol>
    </nav>

    <!-- Show actual post content when data is available -->
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <!-- Back button -->
                <div style="text-align: left; margin-bottom: 2rem;">
                    <a href="/blog" style="color: #007bff; text-decoration: none; display: inline-flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                            <path d="M19 12H5M5 12l6-6m-6 6l6 6"></path>
                        </svg>
                        {$_('blog.backToBlog')}
                    </a>
                </div>
                
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
                    
                    <div style="display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; background: #007bff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 1rem; color: white; font-weight: 600;">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <a href="/about" style="font-weight: 500; color: inherit; text-decoration: none;">{post.author}</a>
                            <div style="color: #6c757d; font-size: 0.9rem;">Privacy & Security Expert at Fire Temp Mail</div>
                        </div>
                    </div>
                </div>
                
                <!-- Article Content -->
                <div style="text-align: left; line-height: 1.8;">
                    {@html post.content}
                </div>
                
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
                                <div style="font-size: 0.8rem; color: #999; margin-top: 0.5rem;">{related.category} · {related.readTime}</div>
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