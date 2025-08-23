<script>
    // Simple test without any imports
    export function load({ params }) {
        console.log('Load function called with params:', params);
        
        // Return simple test data
        return {
            post: {
                title: 'Test Post: ' + params.slug,
                excerpt: 'This is a test post for debugging',
                category: 'Debug',
                date: '2023-11-15', 
                author: 'Debug Author',
                readTime: '2 min read'
            }
        };
    }
    
    // The data from load() is available as export let data
    export let data;
    
    // Debug what we receive
    $: {
        console.log('Data received:', data);
        if (data) {
            console.log('Post data:', data.post);
        }
    }
    
    $: post = data?.post;
</script>

<svelte:head>
    <title>{post ? post.title : 'Loading...'}</title>
    <meta name="description" content={post ? post.excerpt : 'Blog post'} />
</svelte:head>

{#if !post}
    <section class="py-4 py-xl-5">
        <div class="container" style="max-width: 800px;">
            <div class="text-center p-4 p-lg-5">
                <h1>Loading Debug</h1>
                <p>Data received: {JSON.stringify(data, null, 2)}</p>
                <p>Post: {JSON.stringify(post, null, 2)}</p>
                <a href="/blog">← Back to Blog</a>
            </div>
        </div>
    </section>
{:else}
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
{/if}