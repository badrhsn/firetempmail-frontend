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

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-8 mb-4 mb-md-0">
                <h5 class="footer-title">Quick Links</h5>
                <div class="row">
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/email-generator">Email Generator</a></li>
                            <li><a href="/gmail-generator">Gmail Generator</a></li>
                            <li><a href="/temporary-gmail">Temporary Gmail</a></li>
                            <li><a href="/temp-gmail">Temp Gmail</a></li>
                            <li><a href="/temp-mail-edu">Temp Mail EDU</a></li>
                            <li><a href="/10minutemail">10 Minute Mail</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <h5 class="footer-title">Support Our Service</h5>
                <div class="donation-section">
                    <p>Help us keep FireTempMail free by making a donation. Your support helps maintain and improve our service.</p>
                    
                    <div class="kofi-qr">
                        <a href="https://ko-fi.com/firetempmail" target="_blank">
                            <img src="https://storage.ko-fi.com/cdn/useruploads/N4N61LJTEP/qrcode.png?v=2668fb77-3b3b-4039-abc5-e7004afdcebe&v=2&_gl=1*1bpnkx0*_gcl_au*Mzg2NjgyMDUuMTc1ODM3MTgzOA..*_ga*Nzg1NDU0NTQ2LjE3NTgzNzE4Mzk.*_ga_M13FZ7VQ2C*czE3NTgzNzE4MzgkbzEkZzEkdDE3NTgzNzI5MTkkajYwJGwwJGgw" 
                                 alt="Support us on Ko-fi" class="img-fluid">
                        </a>
                        <p class="kofi-text">Scan to support us on Ko-fi</p>
                    </div>
                    
                    <div class="mt-3">
                        <p class="mb-0">We've received <span class="counter">15,327</span> emails so far.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="copyright">© 2024 FireTempMail. All Rights Reserved.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <div class="social-icons">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
           /* Footer Styles */
        .footer {
            background-color: #22242b;
            color: #a7a7aa;
            padding: 40px 0 20px;
        }
        .footer a {
            color: #a7a7aa;
            text-decoration: none;
            transition: color 0.3s;
        }
        .footer a:hover {
            color: #3498db;
        }
        .footer-title {
            font-weight: 700;
            margin-bottom: 20px;
            font-size: 1.3rem;
            color: #a7a7aa;
        }
        .footer-links {
            list-style: none;
            padding: 0;
            line-height: 2.2;
        }
        .footer-links li {
            margin-bottom: 8px;
        }
        .divider {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin: 30px 0 20px;
        }
        .donation-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .donation-options {
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }
        .kofi-qr {
            text-align: center;
            margin-top: 15px;
        }
        .kofi-qr img {
            max-width: 150px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .kofi-text {
            font-size: 0.9rem;
            margin-top: 10px;
        }
        .copyright {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .social-icons {
            font-size: 1.5rem;
            margin-top: 15px;
        }
        .social-icons a {
            margin-right: 15px;
        }
        .counter {
            color: rgb(255,255,255);
            background: rgb(33,37,41);
            border-radius: 10px;
            padding: 4px 12px;
            font-size: 14px;
            margin: 0 2px;
            font-family: monospace;
        }
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