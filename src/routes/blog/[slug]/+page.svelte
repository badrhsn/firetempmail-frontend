<script>
    export function load({ params }) {
        console.log('Load function called with params:', params);
        
        // Return simple test data without any imports
        return {
            testData: {
                slug: params.slug,
                title: 'Test Post: ' + params.slug,
                excerpt: 'This is a test post for ' + params.slug,
                category: 'Test',
                date: '2023-11-15',
                author: 'Test Author',
                readTime: '2 min read'
            }
        };
    }
    
    export let data;
    $: testData = data?.testData;
</script>

<svelte:head>
    <title>{testData.title}</title>
    <meta name="description" content={testData.excerpt} />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <h1>{testData.title}</h1>
            <p>{testData.excerpt}</p>
            <p>Category: {testData.category}</p>
            <p>By {testData.author} on {testData.date}</p>
            <a href="/blog">← Back to Blog</a>
        </div>
    </div>
</section>