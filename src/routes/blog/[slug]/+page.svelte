<script>
    // COMPLETELY remove all imports initially
    export function load({ params }) {
        console.log('Load function called with params:', params);
        
        // Return simple test data without any external functions
        return {
            post: {
                title: 'Test Post: ' + params.slug,
                excerpt: 'This is a test post for debugging',
                category: 'Debug',
                date: '2023-11-15', 
                author: 'Debug Author',
                readTime: '2 min read',
                content: 'This is test content for debugging purposes.'
            }
        };
    }
    
    export let data;
    $: post = data?.post;
</script>

<svelte:head>
    <title>{post.title} - Fire Temp Mail Blog</title>
    <meta name="description" content={post.excerpt} />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <p>Category: {post.category}</p>
            <p>By {post.author} on {post.date}</p>
            <a href="/blog">← Back to Blog</a>
        </div>
    </div>
</section>