<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { getPostBySlug } from '$lib/data/blogPosts';

    export let data;

    let post = data?.post || null; // Start with SSR data if available
    let error = null;
    let isLoading = !post; // Only loading if no post was preloaded
    let scrollPercentage = 0;
    let copyrightYear = new Date().getFullYear();

    // Get slug from URL
    let slug;
    $: slug = $page.params.slug;

    // Load post on mount if not already provided by SSR
    onMount(() => {
        if (!post) {
            try {
                const fetchedPost = getPostBySlug(slug);
                if (fetchedPost) {
                    post = fetchedPost;
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
    {#if post}
        <title>{post.title} - Fire Temp Mail Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://firetempmail.com/blog/${post.slug}`} />
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
                <h1>Loading...</h1>
                <p>Please wait while we load the post.</p>
                <a href="/blog">← Back to Blog</a>
            </div>
        </div>
    </section>
{:else if error}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>Error</h1>
                <p>{error}</p>
                <a href="/blog">← Back to Blog</a>
            </div>
        </div>
    </section>
{:else if post}
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
                        Back to Blog
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
                            <div style="font-weight: 500;">{post.author}</div>
                            <div style="color: #6c757d; font-size: 0.9rem;">Fire Temp Mail Team</div>
                        </div>
                    </div>
                </div>
                
                <!-- Article Content -->
                <div style="text-align: left; line-height: 1.8;">
                    {@html post.content}
                </div>
                
                <!-- Share buttons -->
                <div style="text-align: left; margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Share this article</h3>
                    <div style="display: flex; gap: 1rem;">
                        <button on:click={() => shareOnFacebook(post)} style="padding: 0.5rem 1rem; background: #3b5998; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">Facebook</button>
                        <button on:click={() => shareOnTwitter(post)} style="padding: 0.5rem 1rem; background: #1da1f2; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">Twitter</button>
                        <button on:click={() => shareOnLinkedIn(post)} style="padding: 0.5rem 1rem; background: #0077b5; color: white; border-radius: 4px; text-decoration: none; border: none; cursor: pointer;">LinkedIn</button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center p-4 p-lg-5">
                <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                    <span class="float-end">
                        <a href="/" style="color: inherit;">Home</a>&nbsp;&nbsp;
                        <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                        <a href="/temp-mail-edu" style="color: inherit;">Temp Mail EDU</a>&nbsp;&nbsp;
                        <a href="/10minutemail" style="color: inherit;">10 Minute Mail</a>&nbsp;&nbsp;
                        <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                        <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                        <a href="/faq" style="color: inherit;">FAQ</a>&nbsp;&nbsp;
                        <a href="/contact" style="color: inherit;">Contact</a>
                    </span>
                </p>
                <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                    Copyright © {copyrightYear} 
                </p>
            </div>
        </div>
    </section>
{:else}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>Post Not Found</h1>
                <p>The requested blog post could not be found.</p>
                <a href="/blog">← Back to Blog</a>
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
    
    /* Responsive design */
    @media (max-width: 768px) {
        .reading-progress-bar {
            height: 3px;
        }
    }
</style>