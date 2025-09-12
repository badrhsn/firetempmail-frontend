<script>
    export let data;
    let post = data.post;   // ✅ `let`, no reassignment needed
    let scrollPercentage = 0;
    let copyrightYear = new Date().getFullYear();

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

    // Scroll progress bar
    import { onMount } from 'svelte';
    onMount(() => {
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
</script>

<svelte:head>
    <title>{post.title} - Fire Temp Mail Blog</title>
    <meta name="description" content={post.excerpt} />
    <link rel="canonical" href={`https://firetempmail.com/blog/${post.slug}`} />
</svelte:head>

<!-- Page Layout -->
<div class="reading-progress-bar">
    <div class="reading-progress" style={`width: ${scrollPercentage}%`}></div>
</div>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Post Content -->
            <div style="text-align: left; margin-bottom: 2rem;">
                <span style="background: #e9ecef; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                    {post.category}
                </span>
                <span style="margin: 0 0.5rem;">•</span>
                <span style="color: #6c757d; font-size: 0.9rem;">{post.date}</span>
                <span style="margin: 0 0.5rem;">•</span>
                <span style="color: #6c757d; font-size: 0.9rem;">{post.readTime}</span>
            </div>

            <h1>{post.title}</h1>
            <p style="font-size: 1.2rem; color: #6c757d;">{post.excerpt}</p>

            <div style="text-align: left; line-height: 1.8;">
                {@html post.content}
            </div>

            <!-- Share buttons -->
            <div style="margin: 2rem 0;">
                <button on:click={() => shareOnFacebook(post)}>Facebook</button>
                <button on:click={() => shareOnTwitter(post)}>Twitter</button>
                <button on:click={() => shareOnLinkedIn(post)}>LinkedIn</button>
            </div>
        </div>
    </div>
</section>

<style>
    .reading-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(0, 123, 255, 0.2);
        z-index: 10000;
    }
    .reading-progress {
        height: 100%;
        background: linear-gradient(90deg, #007bff, #0056b3);
        transition: width 0.2s ease-out;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    }
</style>
