// Temporarily replace your blogPosts with simple test data
const blogPosts = [
    {
        "id": 1,
        "title": "Test Post",
        "excerpt": "Test excerpt",
        "slug": "test-post",
        "date": "2025-01-01",
        "author": "Test Author",
        "category": "Test",
        "readTime": "1 min read",
        "content": "<p>Test content</p>"
    }
];

// Simple function with debugging
export const getPostBySlug = (slug) => {
    console.log('🔍 Searching for slug:', slug);
    console.log('📝 Available slugs:', blogPosts.map(p => p.slug));

    const post = blogPosts.find(post => post.slug === slug);
    console.log('✅ Found post:', post ? post.title : 'None');

    return post;
};

// Other functions
export const getAllPosts = () => {
    return blogPosts;
};

export const getPopularArticles = () => {
    return blogPosts.slice(0, 10);
};

// Make sure to export the raw data too for debugging
export { blogPosts };
// Add this export at the end of the file
export const debugSlugs = () => {
    return blogPosts.map(post => post.slug);
};