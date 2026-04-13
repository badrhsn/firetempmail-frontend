<script>
    import Hreflang from '$lib/components/Hreflang.svelte';
    
    export let data;
    
    const POSTS_PER_PAGE = 12;
    
    let copyrightYear = new Date().getFullYear();
    let blogPosts = (data?.posts || []).map(p => ({
        ...p,
        date: p.created_at || p.date,
        readTime: p.read_time || p.readTime
    }));
    let currentPage = 1;
    let selectedCategory = 'all';
    
    // Build categories reactively
    $: categories = (() => {
        const categoriesSet = new Set();
        blogPosts.forEach(post => categoriesSet.add(post.category));
        const allCategories = Array.from(categoriesSet)
            .map(cat => ({
                id: cat.toLowerCase().replace(/\s+/g, '-'),
                name: cat,
                count: blogPosts.filter(p => p.category === cat).length
            }))
            .sort((a, b) => b.count - a.count);
        return [
            { id: 'all', name: 'All Posts', count: blogPosts.length },
            ...allCategories
        ];
    })();
    
    $: filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => 
            post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );
    
    $: totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    $: startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    $: endIndex = startIndex + POSTS_PER_PAGE;
    $: currentPosts = filteredPosts.slice(startIndex, endIndex);
    
    // Featured post = first post (most recent)
    $: featuredPost = selectedCategory === 'all' && currentPage === 1 ? blogPosts[0] : null;
    $: displayPosts = featuredPost ? currentPosts.filter(p => p.id !== featuredPost.id) : currentPosts;
    
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric'
            });
        } catch { return dateString; }
    };
    
    const categoryColors = {
        'guides': { bg: '#f0f7ff', text: '#1a73e8', border: '#d2e3fc' },
        'comparisons': { bg: '#fef7e0', text: '#b45309', border: '#fde68a' },
        'privacy': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
        'reviews': { bg: '#fdf4ff', text: '#9333ea', border: '#e9d5ff' },
        'analysis': { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' },
        'security': { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' },
        'education': { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
        'streaming': { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
        'social': { bg: '#f0f9ff', text: '#0284c7', border: '#bae6fd' },
        'gaming': { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
        'tech': { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
        'shopping': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
        'finance': { bg: '#fefce8', text: '#a16207', border: '#fef08a' },
        'ai-tools': { bg: '#f0fdfa', text: '#0d9488', border: '#99f6e4' },
        'regional-guides': { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
    };

    function getCategoryColor(cat) {
        const key = cat?.toLowerCase().replace(/\s+/g, '-') || '';
        return categoryColors[key] || { bg: '#f8f9fa', text: '#6b7280', border: '#e5e7eb' };
    }
    
    function goToPage(page) {
        currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function handleCategoryChange(categoryId) {
        selectedCategory = categoryId;
        currentPage = 1;
    }
</script>

<Hreflang path="/" />
<svelte:head>
    <title>{data?.seo?.title || 'Fire Temp Mail - Free Temporary Email | Privacy & Security Blog'}</title>
    <meta name="description" content={data?.seo?.description || 'Free disposable email service. Expert guides on temporary email, email privacy, spam protection, and online security.'}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/'}>
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">

    <!-- Open Graph -->
    <meta property="og:title" content="Fire Temp Mail - Free Temporary Email | Privacy & Security Blog" />
    <meta property="og:description" content="Free disposable email. Expert guides on temporary email, privacy, and online security." />
    <meta property="og:url" content="https://firetempmail.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://firetempmail.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Fire Temp Mail - Free Temporary Email" />
    <meta name="twitter:description" content="Free disposable email. Email privacy & security insights." />
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png" />
    <meta name="twitter:site" content="@firetempmail" />

    <!-- Pagination -->
    {#if currentPage > 1}
        <link rel="prev" href="https://firetempmail.com/?page={currentPage - 1}" />
    {/if}
    {#if currentPage < totalPages}
        <link rel="next" href="https://firetempmail.com/?page={currentPage + 1}" />
    {/if}

    <!-- WebSite + BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://firetempmail.com/#website",
          "name": "Fire Temp Mail",
          "description": "Free temporary email service with privacy guides and security insights.",
          "url": "https://firetempmail.com/",
          "publisher": { "@id": "https://firetempmail.com/#organization" }
        },
        {
          "@type": "Organization",
          "@id": "https://firetempmail.com/#organization",
          "name": "Fire Temp Mail",
          "url": "https://firetempmail.com/",
          "logo": "https://firetempmail.com/favicon.png"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" }
          ]
        }
      ]
    }
    </script>
</svelte:head>

<div class="blog-page">
    <!-- Hero Header -->
    <header class="blog-hero">
        <div class="hero-content">
            <span class="hero-badge">🔥 Free Temporary Email</span>
            <h1>Fire Temp Mail</h1>
            <p>Protect your privacy with disposable email. Plus {blogPosts.length}+ expert guides on email security, platform reviews, and privacy tips.</p>
            <div class="hero-actions">
                <a href="/email-generator" class="hero-btn primary">Get Free Temp Email →</a>
                <a href="/blog" class="hero-btn secondary">Browse All Articles</a>
            </div>
        </div>
    </header>

    <!-- Featured Post (only on first page, "all" category) -->
    {#if featuredPost}
    <section class="featured-section">
        <a href="/blog/{featuredPost.slug}" class="featured-card">
            <div class="featured-badge">Latest</div>
            <div class="featured-body">
                <span class="featured-category" style="background:{getCategoryColor(featuredPost.category).bg};color:{getCategoryColor(featuredPost.category).text};border:1px solid {getCategoryColor(featuredPost.category).border}">
                    {featuredPost.category}
                </span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div class="featured-meta">
                    <span class="featured-author">
                        <span class="author-avatar">{(featuredPost.author || 'F').charAt(0)}</span>
                        {featuredPost.author || 'Fire Temp Mail Team'}
                    </span>
                    <span class="featured-date">{formatDate(featuredPost.date)}</span>
                    <span class="featured-readtime">{featuredPost.readTime}</span>
                </div>
            </div>
            <div class="featured-arrow">→</div>
        </a>
    </section>
    {/if}

    <!-- Category Filters -->
    <nav class="filters" aria-label="Blog categories">
        <div class="filters-track">
            {#each categories as category}
                <button 
                    class="filter-chip {selectedCategory === category.id ? 'active' : ''}" 
                    on:click={() => handleCategoryChange(category.id)}
                    aria-pressed={selectedCategory === category.id}
                >
                    {category.name}
                    <span class="chip-count">{category.count}</span>
                </button>
            {/each}
        </div>
    </nav>

    <!-- Content Area -->
    <main class="blog-content">
        <!-- Posts Grid -->
        <div class="posts-grid">
            {#each displayPosts as post}
                <article class="post-card">
                    <a href="/blog/{post.slug}" class="card-link">
                        <div class="card-top">
                            <span class="card-category" style="background:{getCategoryColor(post.category).bg};color:{getCategoryColor(post.category).text}">
                                {post.category}
                            </span>
                        </div>
                        <h3>{post.title}</h3>
                        <p class="card-excerpt">{post.excerpt}</p>
                        <div class="card-bottom">
                            <div class="card-author">
                                <span class="author-dot" style="background:{getCategoryColor(post.category).text}"></span>
                                {post.author || 'Fire Temp Mail Team'}
                            </div>
                            <div class="card-meta">
                                <span>{formatDate(post.date)}</span>
                                <span class="meta-sep">·</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </a>
                </article>
            {/each}
        </div>

        {#if currentPosts.length === 0}
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No articles found in this category</p>
                <button on:click={() => handleCategoryChange('all')} class="reset-btn">
                    View all articles
                </button>
            </div>
        {/if}

        <!-- Sidebar -->
        <aside class="sidebar">
            <!-- About Box -->
            <div class="sidebar-card about-card">
                <h3>About Fire Temp Mail</h3>
                <p>Free disposable email to protect your inbox from spam. We also test temp email services on real platforms and share honest results.</p>
                <a href="/email-generator" class="sidebar-cta">Get Free Temp Email →</a>
            </div>

            <!-- Popular Categories -->
            <div class="sidebar-card">
                <h3>Browse by Topic</h3>
                <div class="topic-list">
                    {#each categories.slice(1, 8) as cat}
                        <button 
                            class="topic-item" 
                            on:click={() => handleCategoryChange(cat.id)}
                            class:active={selectedCategory === cat.id}
                        >
                            <span class="topic-dot" style="background:{getCategoryColor(cat.name).text}"></span>
                            <span class="topic-name">{cat.name}</span>
                            <span class="topic-count">{cat.count}</span>
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Ad Placeholder for AdSense -->
            <div class="sidebar-card ad-placeholder">
                <div class="ad-label">Advertisement</div>
                <div class="ad-slot">
                    <!-- AdSense unit goes here -->
                </div>
            </div>
        </aside>
    </main>

    <!-- Pagination -->
    {#if totalPages > 1}
        <div class="pagination-wrap">
            <div class="pagination">
                <button 
                    class="page-btn" 
                    on:click={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    ← Prev
                </button>
                
                <div class="page-nums">
                    {#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNumber}
                        {#if pageNumber === 1 || pageNumber === totalPages || 
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)}
                            <button 
                                class="page-num {currentPage === pageNumber ? 'active' : ''}" 
                                on:click={() => goToPage(pageNumber)}
                                aria-label="Page {pageNumber}"
                                aria-current={currentPage === pageNumber ? 'page' : null}
                            >
                                {pageNumber}
                            </button>
                        {:else if pageNumber === currentPage - 2 || pageNumber === currentPage + 2}
                            <span class="page-ellipsis">…</span>
                        {/if}
                    {/each}
                </div>
                
                <button 
                    class="page-btn" 
                    on:click={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    Next →
                </button>
            </div>
            <p class="pagination-info">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
            </p>
        </div>
    {/if}

    <!-- Bottom CTA -->
    <section class="bottom-cta">
        <div class="cta-inner">
            <h2>Need a Temporary Email Right Now?</h2>
            <p>No signup, no installation — get a free disposable email in one click.</p>
            <a href="/email-generator" class="cta-button">Get Free Temp Email →</a>
        </div>
    </section>
</div>

<style>
    .blog-page {
        --accent: #ff6b35;
        --accent-light: #fff4ef;
        --text: #1a1a2e;
        --text-secondary: #64748b;
        --border: #e2e8f0;
        --bg: #ffffff;
        --bg-subtle: #f8fafc;
        --radius: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: var(--text);
    }

    /* Hero */
    .blog-hero {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        padding: 64px 24px 56px;
        text-align: center;
        margin-bottom: 40px;
    }

    .hero-content {
        max-width: 640px;
        margin: 0 auto;
    }

    .hero-badge {
        display: inline-block;
        background: rgba(255, 107, 53, 0.15);
        color: var(--accent);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 16px;
    }

    .blog-hero h1 {
        font-size: clamp(28px, 5vw, 42px);
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 12px;
        line-height: 1.2;
    }

    .blog-hero p {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
        max-width: 520px;
        margin: 0 auto 24px;
    }

    .hero-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .hero-btn {
        padding: 12px 24px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        transition: opacity 0.15s, transform 0.15s;
    }

    .hero-btn:hover {
        opacity: 0.92;
        transform: translateY(-1px);
    }

    .hero-btn.primary {
        background: var(--accent);
        color: white;
    }

    .hero-btn.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Featured Post */
    .featured-section {
        max-width: 1200px;
        margin: -32px auto 32px;
        padding: 0 24px;
        position: relative;
        z-index: 1;
    }

    .featured-card {
        display: flex;
        align-items: center;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 28px 32px;
        text-decoration: none;
        color: inherit;
        transition: border-color 0.2s, box-shadow 0.2s;
        position: relative;
        gap: 24px;
    }

    .featured-card:hover {
        border-color: var(--accent);
        box-shadow: 0 8px 24px rgba(255, 107, 53, 0.08);
    }

    .featured-badge {
        position: absolute;
        top: -10px;
        left: 24px;
        background: var(--accent);
        color: white;
        padding: 3px 12px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .featured-body { flex: 1; }

    .featured-category {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .featured-card h2 {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 1.3;
        color: var(--text);
    }

    .featured-card p {
        font-size: 15px;
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 12px;
    }

    .featured-meta {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 13px;
        color: var(--text-secondary);
    }

    .featured-author {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
    }

    .author-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        font-size: 11px;
        font-weight: 700;
    }

    .featured-arrow {
        font-size: 24px;
        color: var(--accent);
        flex-shrink: 0;
    }

    /* Filters */
    .filters {
        max-width: 1200px;
        margin: 0 auto 32px;
        padding: 0 24px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }
    .filters::-webkit-scrollbar { display: none; }

    .filters-track {
        display: flex;
        gap: 8px;
        min-width: min-content;
    }

    .filter-chip {
        padding: 8px 16px;
        border: 1px solid var(--border);
        background: var(--bg);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .filter-chip:hover {
        border-color: var(--accent);
        color: var(--accent);
    }

    .filter-chip.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
    }

    .filter-chip.active .chip-count {
        background: rgba(255, 255, 255, 0.25);
        color: white;
    }

    .chip-count {
        font-size: 11px;
        background: var(--bg-subtle);
        padding: 1px 7px;
        border-radius: 10px;
        font-weight: 600;
    }

    /* Content Layout */
    .blog-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 40px;
        align-items: start;
    }

    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
    }

    .post-card {
        border: 1px solid var(--border);
        border-radius: var(--radius);
        overflow: hidden;
        transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
        background: var(--bg);
    }

    .post-card:hover {
        border-color: var(--accent);
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.06);
        transform: translateY(-2px);
    }

    .card-link {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px;
        text-decoration: none;
        color: inherit;
    }

    .card-top { margin-bottom: 12px; }

    .card-category {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }

    .post-card h3 {
        font-size: 16px;
        font-weight: 650;
        line-height: 1.4;
        margin-bottom: 8px;
        color: var(--text);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-excerpt {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.5;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 16px;
    }

    .card-bottom {
        padding-top: 12px;
        border-top: 1px solid var(--border);
        margin-top: auto;
    }

    .card-author {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text);
        margin-bottom: 4px;
    }

    .author-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .card-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--text-secondary);
    }

    .meta-sep { color: var(--border); }

    /* Sidebar */
    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: sticky;
        top: 20px;
    }

    .sidebar-card {
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 20px;
    }

    .sidebar-card h3 {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--text);
    }

    .about-card p {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 16px;
    }

    .sidebar-cta {
        display: inline-block;
        background: var(--accent);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        transition: opacity 0.15s;
    }
    .sidebar-cta:hover { opacity: 0.9; }

    .topic-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .topic-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: none;
        background: transparent;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.1s;
        width: 100%;
        text-align: left;
        font-size: 13px;
        color: var(--text);
    }

    .topic-item:hover, .topic-item.active { background: var(--bg-subtle); }

    .topic-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .topic-name { flex: 1; font-weight: 500; }

    .topic-count {
        font-size: 12px;
        color: var(--text-secondary);
        background: var(--bg-subtle);
        padding: 1px 8px;
        border-radius: 10px;
    }

    .ad-placeholder {
        background: var(--bg-subtle);
        border-style: dashed;
        min-height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .ad-label {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .ad-slot {
        width: 100%;
        min-height: 200px;
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        grid-column: 1 / -1;
    }

    .empty-icon { font-size: 48px; margin-bottom: 16px; }

    .empty-state p {
        color: var(--text-secondary);
        margin-bottom: 16px;
    }

    .reset-btn {
        padding: 10px 24px;
        border: 1px solid var(--accent);
        background: var(--bg);
        color: var(--accent);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.15s;
    }
    .reset-btn:hover { background: var(--accent-light); }

    /* Pagination */
    .pagination-wrap {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 24px;
        text-align: center;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .page-btn {
        padding: 8px 16px;
        border: 1px solid var(--border);
        background: var(--bg);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text);
        cursor: pointer;
        transition: all 0.15s;
    }

    .page-btn:hover:not(:disabled) {
        border-color: var(--accent);
        color: var(--accent);
    }

    .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    .page-nums {
        display: flex;
        gap: 4px;
        align-items: center;
    }

    .page-num {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border);
        background: var(--bg);
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s;
    }

    .page-num:hover { border-color: var(--accent); color: var(--accent); }

    .page-num.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
    }

    .page-ellipsis { color: var(--text-secondary); padding: 0 2px; }

    .pagination-info { font-size: 13px; color: var(--text-secondary); }

    /* Bottom CTA */
    .bottom-cta {
        background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
        padding: 56px 24px;
        margin-top: 40px;
    }

    .cta-inner {
        max-width: 540px;
        margin: 0 auto;
        text-align: center;
    }

    .bottom-cta h2 {
        font-size: 24px;
        font-weight: 700;
        color: white;
        margin-bottom: 8px;
    }

    .bottom-cta p {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.65);
        margin-bottom: 24px;
    }

    .cta-button {
        display: inline-block;
        background: var(--accent);
        color: white;
        padding: 14px 32px;
        border-radius: 10px;
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        transition: opacity 0.15s, transform 0.15s;
    }

    .cta-button:hover {
        opacity: 0.92;
        transform: translateY(-1px);
    }

    /* Responsive */
    @media (max-width: 960px) {
        .blog-content { grid-template-columns: 1fr; }
        .sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .featured-card { flex-direction: column; gap: 0; }
        .featured-arrow { display: none; }
    }

    @media (max-width: 600px) {
        .blog-hero { padding: 48px 20px 40px; }
        .blog-hero h1 { font-size: 26px; }
        .featured-section { margin-top: -24px; }
        .featured-card { padding: 20px; }
        .featured-card h2 { font-size: 18px; }
        .posts-grid { grid-template-columns: 1fr; }
        .sidebar { grid-template-columns: 1fr; }
        .pagination { gap: 4px; }
        .page-btn { padding: 8px 12px; font-size: 12px; }
        .hero-btn { padding: 10px 20px; font-size: 14px; }
    }
</style>