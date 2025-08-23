<script>
    import { getPostBySlug } from '$lib/data/blogPosts';
    import { error } from '@sveltejs/kit';
    
    export function load({ params }) {
        console.log('Loading post for slug:', params.slug);
        
        const post = getPostBySlug(params.slug);
        console.log('Post found:', post);
        
        if (!post) {
            error(404, `Blog post not found: ${params.slug}`);
        }
        
        return { post };
    }
    
    // Use the data prop that SvelteKit provides
    export let data;
    
    // Create a reactive variable with safe defaults
    $: post = data?.post || {
        title: 'Loading...',
        excerpt: 'Please wait while we load the post.',
        category: 'Loading',
        date: '',
        author: '',
        readTime: ''
    };
    
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{post.title} - Fire Temp Mail Blog</title>
    <meta name="description" content={post.excerpt} />
</svelte:head>

{#if !data?.post}
    <!-- Show loading state while data is being fetched -->
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>Loading...</h1>
                <p>Please wait while we load the post.</p>
                <a href="/blog">← Back to Blog</a>
            </div>
        </div>
    </section>
{:else}
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
                    <p>This is where your full blog post content would appear. In a real implementation, you would have actual content here, possibly loaded from a CMS or markdown files.</p>
                    
                    <p>For now, this is a placeholder for the blog post content. You would typically have several paragraphs, images, and other elements that make up a complete blog post.</p>
                    
                    <h2>Why Temporary Email Matters</h2>
                    <p>Temporary email services provide an essential layer of privacy protection in today's digital world. They allow you to:</p>
                    <ul>
                        <li>Sign up for services without revealing your personal email</li>
                        <li>Avoid spam and unwanted marketing emails</li>
                        <li>Protect your primary inbox from data breaches</li>
                        <li>Maintain anonymity when needed</li>
                    </ul>
                    
                    <h2>Getting Started with Fire Temp Mail</h2>
                    <p>Using our service is simple: just generate a temporary email address and start using it immediately. No registration required, no personal information collected.</p>
                    
                    <p>We hope you find this information helpful in your journey to better online privacy!</p>
                </div>
                
                <!-- Share buttons -->
                <div style="text-align: left; margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Share this article</h3>
                    <div style="display: flex; gap: 1rem;">
                        <a href="#" style="padding: 0.5rem 1rem; background: #3b5998; color: white; border-radius: 4px; text-decoration: none;">Facebook</a>
                        <a href="#" style="padding: 0.5rem 1rem; background: #1da1f2; color: white; border-radius: 4px; text-decoration: none;">Twitter</a>
                        <a href="#" style="padding: 0.5rem 1rem; background: #0077b5; color: white; border-radius: 4px; text-decoration: none;">LinkedIn</a>
                    </div>
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
{/if}