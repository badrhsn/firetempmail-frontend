<script>
    import { getPostBySlug } from '$lib/data/blogPosts';
    import { error } from '@sveltejs/kit';
    
    export function load({ params }) {
        const post = getPostBySlug(params.slug);
        
        if (!post) {
            error(404, 'Post not found');
        }
        
        return {
            post
        };
    }
    
    let { post } = $page.data;
</script>

<svelte:head>
    <title>{post.title} - Fire Temp Mail Blog</title>
    <meta name="description" content={post.excerpt} />
</svelte:head>

<h1>{post.title}</h1>
<p>Blog post content would go here...</p>