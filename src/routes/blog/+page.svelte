<script>
    import { blogPosts } from '$lib/data/blogPosts';
    
    let copyrightYear = new Date().getFullYear();
    
    // Set page metadata directly instead of using $page.data
    // This is the correct way to set page metadata in SvelteKit
</script>

<svelte:head>
    <title>Blog - Fire Temp Mail | Temporary Email Insights</title>
    <meta name="description" content="Read our latest articles about email privacy, online security, and how to protect your digital identity with temporary email services." />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📝&nbsp;</span>
                Fire Temp Mail Blog
            </h1>
            
            <p class="text-start" style="margin-bottom: 32px;font-size: 20px;">
                Insights, tips, and news about email privacy, online security, and how to protect your digital identity.
            </p>
            
            <!-- Blog Posts -->
            <div class="text-start">
                {#each blogPosts as post}
                    <article class="blog-post" style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #eee;">
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                            <span style="background: #e9ecef; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                                {post.category}
                            </span>
                            <span style="margin: 0 0.5rem;">•</span>
                            <span style="color: #6c757d; font-size: 0.9rem;">{post.date}</span>
                            <span style="margin: 0 0.5rem;">•</span>
                            <span style="color: #6c757d; font-size: 0.9rem;">{post.readTime}</span>
                        </div>
                        
                        <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">
                            <a href="/blog/{post.slug}" style="color: inherit; text-decoration: none;">
                                {post.title}
                            </a>
                        </h2>
                        
                        <p style="font-size: 1.1rem; color: #6c757d; margin-bottom: 1.5rem;">
                            {post.excerpt}
                        </p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #6c757d; font-size: 0.9rem;">By {post.author}</span>
                            <a href="/blog/{post.slug}" class="btn btn-outline-primary">
                                Read More →
                            </a>
                        </div>
                    </article>
                {/each}
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/" style="color: inherit;">Home</a>&nbsp;&nbsp;
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="/contact" style="color: inherit;">Contact</a>
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Copyright © {copyrightYear} 
            </p>
        </div>
    </div>
</section>

<style>
    .blog-post:hover {
        background-color: #f8f9fa;
        transition: background-color 0.2s ease;
        border-radius: 8px;
        padding: 1.5rem !important;
        margin-left: -1.5rem;
        margin-right: -1.5rem;
    }
    
    .btn-outline-primary {
        border-color: #007bff;
        color: #007bff;
    }
    
    .btn-outline-primary:hover {
        background-color: #007bff;
        color: white;
    }
</style>