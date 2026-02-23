<script>
    import { getAllPosts } from '$lib/data/blogPosts';
    import Hreflang from '$lib/components/Hreflang.svelte';
import Breadcrumb from '$lib/components/Breadcrumb.svelte';
    
    // Import page data for SEO
    export let data;
    
    // Posts per page
    const POSTS_PER_PAGE = 9;
    
    // Reactive variables
    let copyrightYear = new Date().getFullYear();
    let blogPosts = getAllPosts();
    let currentPage = 1;
    
    // Get categories
    const categories = (() => {
        const categoriesSet = new Set();
        blogPosts.forEach(post => {
            categoriesSet.add(post.category);
        });
        
        const allCategories = Array.from(categoriesSet).map(cat => ({
            id: cat.toLowerCase().replace(/\s+/g, '-'),
            name: cat,
            count: blogPosts.filter(p => p.category === cat).length
        }));
        
        return [
            { id: 'all', name: 'All', count: blogPosts.length },
            ...allCategories
        ];
    })();
    
    // Category filter
    let selectedCategory = 'all';
    
    // Filter posts
    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => 
            post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
        );
    
    // Pagination calculations
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    
    // Format date
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch {
            return dateString;
        }
    };
    
    // Navigation functions
    function goToPage(page) {
        currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextPage() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    function prevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    // Handle category change
    function handleCategoryChange(categoryId) {
        selectedCategory = categoryId;
        currentPage = 1; // Reset to first page when category changes
    }
</script>

<Hreflang path="/blog" />
<svelte:head>
    <title>{data?.seo?.title || 'Blog - Fire Temp Mail | Email Privacy & Security Insights'}</title>
    <meta name="description" content={data?.seo?.description || 'Expert guides on temporary email, email privacy, spam protection, and online security. Tips for protecting your digital identity.'}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/blog'}>
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">

    <!-- Open Graph -->
    <meta property="og:title" content="Blog - Fire Temp Mail | Email Privacy & Security Insights" />
    <meta property="og:description" content="Expert guides on temporary email, privacy, spam protection, and online security." />
    <meta property="og:url" content="https://firetempmail.com/blog" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://firetempmail.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Blog - Fire Temp Mail" />
    <meta name="twitter:description" content="Email privacy & security insights. Expert guides on temp mail and online privacy." />
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png" />
    <meta name="twitter:site" content="@firetempmail" />

    <!-- Pagination -->
    {#if currentPage > 1}
        <link rel="prev" href="https://firetempmail.com/blog?page={currentPage - 1}" />
    {/if}
    {#if currentPage < totalPages}
        <link rel="next" href="https://firetempmail.com/blog?page={currentPage + 1}" />
    {/if}

    <!-- CollectionPage + BreadcrumbList Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "name": "Fire Temp Mail Blog",
          "description": "Email privacy & security insights. Expert guides on temporary email, online privacy, and spam protection.",
          "url": "https://firetempmail.com/blog",
          "isPartOf": { "@id": "https://firetempmail.com/#website" },
          "publisher": { "@id": "https://firetempmail.com/#organization" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://firetempmail.com/blog" }
          ]
        }
      ]
    }
    </script>
</svelte:head>
<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
    <Breadcrumb items={[{name: "Home", href: "/"}, {name: "Blog", href: "/blog"}]} />
</div>

<!-- Header -->
<header class="blog-header">
    <h1>Blog</h1>
    <p>Email privacy & security insights</p>
</header>

<!-- Main Content -->
<main class="blog-main">
    <!-- Category Filters -->
    <div class="filters">
        <div class="filters-inner">
            {#each categories as category}
                <button 
                    class="filter-btn {selectedCategory === category.id ? 'active' : ''}" 
                    on:click={() => handleCategoryChange(category.id)}
                >
                    {category.name}
                    <span class="count">({category.count})</span>
                </button>
            {/each}
        </div>
    </div>

    <!-- Posts Grid -->
    <div class="posts-grid">
        {#each currentPosts as post}
            <article class="post-card">
                <div class="card-content">
                    <div class="card-header">
                        <span class="category">{post.category}</span>
                        <span class="date">{formatDate(post.date)}</span>
                    </div>
                    
                    <h3>
                        <a href="/blog/{post.slug}">{post.title}</a>
                    </h3>
                    
                    <p class="excerpt">{post.excerpt}</p>
                    
                    <div class="card-footer">
                        <span class="author">{post.author}</span>
                        <span class="read-time">• {post.readTime} read</span>
                    </div>
                </div>
            </article>
        {/each}
    </div>

    <!-- Pagination -->
    {#if totalPages > 1}
        <div class="pagination">
            <button 
                class="pagination-btn prev" 
                on:click={prevPage}
                disabled={currentPage === 1}
            >
                ← Previous
            </button>
            
            <div class="page-numbers">
                {#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNumber}
                    {#if pageNumber === 1 || pageNumber === totalPages || 
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)}
                        <button 
                            class="page-number {currentPage === pageNumber ? 'active' : ''}" 
                            on:click={() => goToPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    {:else if pageNumber === currentPage - 2 || pageNumber === currentPage + 2}
                        <span class="ellipsis">...</span>
                    {/if}
                {/each}
            </div>
            
            <button 
                class="pagination-btn next" 
                on:click={nextPage}
                disabled={currentPage === totalPages}
            >
                Next →
            </button>
        </div>
        
        <div class="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
        </div>
    {/if}
    
    {#if currentPosts.length === 0}
        <div class="empty-state">
            <p>No articles found in this category</p>
            <button on:click={() => handleCategoryChange('all')} class="reset-btn">
                View all articles
            </button>
        </div>
    {/if}
</main>

<!-- Newsletter -->
<aside class="newsletter">
    <div class="newsletter-content">
        <h3>Stay Updated</h3>
        <p>Get privacy tips and security insights delivered to your inbox</p>
        <form class="subscribe-form">
            <input type="email" placeholder="Email address" required />
            <button type="submit">Subscribe</button>
        </form>
    </div>
</aside>

<style>
    /* Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    /* Header */
    .blog-header {
        padding: 60px 0 40px;
        text-align: center;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 40px;
    }
    
    .blog-header h1 {
        font-size: 48px;
        font-weight: 400;
        margin-bottom: 12px;
        color: #222;
    }
    
    .blog-header p {
        font-size: 18px;
        color: #666;
        font-weight: 300;
    }
    
    /* Main Content */
    .blog-main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    /* Filters */
    .filters {
        margin-bottom: 40px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    .filters-inner {
        display: flex;
        gap: 12px;
        padding-bottom: 8px;
        min-width: min-content;
    }
    
    .filter-btn {
        padding: 10px 20px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 25px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .filter-btn:hover {
        border-color: #007bff;
        color: #007bff;
    }
    
    .filter-btn.active {
        background: #007bff;
        border-color: #007bff;
        color: white;
    }
    
    .filter-btn.active .count {
        color: rgba(255, 255, 255, 0.9);
    }
    
    .count {
        font-size: 12px;
        color: #999;
    }
    
    /* Posts Grid */
    .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 30px;
        margin-bottom: 60px;
    }
    
    @media (max-width: 768px) {
        .posts-grid {
            grid-template-columns: 1fr;
            gap: 24px;
        }
    }
    
    /* Post Cards */
    .post-card {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .post-card:hover {
        border-color: #007bff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
    }
    
    .card-content {
        padding: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        font-size: 13px;
    }
    
    .category {
        color: #007bff;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 12px;
    }
    
    .date {
        color: #888;
    }
    
    .post-card h3 {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.4;
        margin-bottom: 12px;
        color: #222;
    }
    
    .post-card h3 a {
        color: inherit;
        text-decoration: none;
    }
    
    .post-card h3 a:hover {
        color: #007bff;
    }
    
    .excerpt {
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
        flex: 1;
        font-size: 15px;
    }
    
    .card-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #888;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
        margin-top: auto;
    }
    
    .author {
        font-weight: 500;
        color: #666;
    }
    
    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    
    .pagination-btn {
        padding: 10px 20px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 100px;
    }
    
    .pagination-btn:hover:not(:disabled) {
        border-color: #007bff;
        color: #007bff;
    }
    
    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .page-numbers {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    
    .page-number {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 6px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .page-number:hover {
        border-color: #007bff;
        color: #007bff;
    }
    
    .page-number.active {
        background: #007bff;
        border-color: #007bff;
        color: white;
    }
    
    .ellipsis {
        color: #999;
        padding: 0 4px;
        user-select: none;
    }
    
    .pagination-info {
        text-align: center;
        color: #888;
        font-size: 14px;
        margin-bottom: 60px;
    }
    
    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }
    
    .empty-state p {
        margin-bottom: 20px;
        font-size: 16px;
    }
    
    .reset-btn {
        padding: 12px 24px;
        border: 1px solid #007bff;
        background: white;
        color: #007bff;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .reset-btn:hover {
        background: #f8f9fa;
    }
    
    /* Newsletter */
    .newsletter {
        padding: 60px 20px;
        background: #f8f9fa;
        border-top: 1px solid #e0e0e0;
        margin-top: 40px;
    }
    
    .newsletter-content {
        max-width: 500px;
        margin: 0 auto;
        text-align: center;
    }
    
    .newsletter h3 {
        font-size: 24px;
        margin-bottom: 12px;
        color: #222;
    }
    
    .newsletter p {
        color: #666;
        margin-bottom: 24px;
        line-height: 1.5;
    }
    
    .subscribe-form {
        display: flex;
        gap: 10px;
        max-width: 400px;
        margin: 0 auto;
    }
    
    .subscribe-form input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s ease;
    }
    
    .subscribe-form input:focus {
        outline: none;
        border-color: #007bff;
    }
    
    .subscribe-form button {
        padding: 12px 24px;
        border: none;
        background: #007bff;
        color: white;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .subscribe-form button:hover {
        background: #0056b3;
    }
    
    @media (max-width: 480px) {
        .subscribe-form {
            flex-direction: column;
        }
        
        .pagination {
            gap: 10px;
        }
        
        .pagination-btn {
            min-width: auto;
            padding: 10px 16px;
        }
    }
</style>