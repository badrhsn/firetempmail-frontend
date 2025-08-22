<script>
    // Completely minimal version - no imports
    export function load({ params }) {
        console.log('Params received:', params);
        
        // Return simple test data
        return {
            testData: {
                slug: params.slug,
                message: 'This is a test post',
                timestamp: new Date().toISOString()
            }
        };
    }
    
    let { testData } = $page.data;
</script>

<h1>Test Blog Post</h1>
<p>Slug: {testData.slug}</p>
<p>{testData.message}</p>
<p>Loaded at: {testData.timestamp}</p>