<script>
    export function load({ params }) {
        // Simple test to see if routing works
        return {
            slug: params.slug,
            title: `Post: ${params.slug}`,
            content: "This is a test blog post."
        };
    }
    
    let { slug, title, content } = $page.data;
</script>

<h1>{title}</h1>
<p>{content}</p>
<p>Slug: {slug}</p>