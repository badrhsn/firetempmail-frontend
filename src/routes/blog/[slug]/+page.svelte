<script>
    export function load({ params }) {
        console.log('Load function called with params:', params);
        
        // Return simple test data
        return {
            testData: {
                slug: params.slug,
                title: 'Test Post: ' + params.slug,
                excerpt: 'This is a test post',
                category: 'Test',
                date: '2023-11-15',
                author: 'Test Author',
                readTime: '2 min read'
            }
        };
    }
    
    export let data;
    
    // Debug what we receive
    $: {
        console.log('Data received:', data);
        console.log('Test data:', data?.testData);
    }
    
    $: testData = data?.testData || {
        title: 'Loading...',
        excerpt: 'Please wait while we load the post.',
        category: 'Loading',
        date: '',
        author: '',
        readTime: ''
    };
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
            
            <!-- Debug info -->
            <div style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <h3>Debug Information</h3>
                <p>Slug from URL: {$page.params.slug}</p>
                <p>Data received: {JSON.stringify(data, null, 2)}</p>
            </div>
        </div>
    </div>
</section>