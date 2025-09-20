<script>
    import { blogPosts, debugSlugs } from '$lib/data/blogPosts';
    
    let copyrightYear = new Date().getFullYear();
    
    // Debug on component mount
    import { onMount } from 'svelte';
    onMount(() => {
        console.log('Blog page mounted');
        debugSlugs();
    });
</script>

<svelte:head>
    <title>Blog - Fire Temp Mail | Temporary Email Insights</title>
    <meta name="description" content="Read our latest articles about email privacy, online security, and how to protect your digital identity with temporary email services." />
    <link rel="canonical" href="https://firetempmail.com/blog" />
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
    </div>
</section>
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
                        <p class="mb-0">We've received <span class="counter">{stats.count}</span> emails so far.</p>
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