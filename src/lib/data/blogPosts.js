// Simple test data - make sure slugs are correct
export const blogPosts = [
    {
        id: 1,
        title: "Why You Should Use Temporary Email Addresses",
        excerpt: "Discover the benefits of using disposable email addresses for online registrations and how they protect your privacy.",
        content: `Full article content would go here...`,
        slug: "why-use-temporary-email", // Make sure this matches exactly
        date: "2023-11-10",
        author: "Fire Temp Mail Team",
        category: "Privacy",
        readTime: "4 min read"
    },
    {
        id: 2,
        title: "How to Avoid Email Spam",
        excerpt: "Learn effective strategies to keep your inbox clean from unwanted emails.",
        content: `Full article content would go here...`,
        slug: "how-to-avoid-email-spam", // Different slug
        date: "2023-11-12",
        author: "Fire Temp Mail Team",
        category: "Security",
        readTime: "5 min read"
    }
];

// Add debug function to see what's happening
export const debugSlugs = () => {
    console.log('Available slugs:', blogPosts.map(post => post.slug));
    console.log('Available titles:', blogPosts.map(post => post.title));
    return blogPosts;
};

// Simple function to get popular articles
export const getPopularArticles = () => {
    return blogPosts.slice(0, 2);
};

// Enhanced function to get post by slug with debugging
export const getPostBySlug = (slug) => {
    console.log('🔍 Searching for slug:', slug);
    console.log('📝 Available slugs:', blogPosts.map(post => post.slug));
    
    const post = blogPosts.find(post => post.slug === slug);
    
    if (!post) {
        console.warn('❌ No post found for slug:', slug);
        // Try case-insensitive search
        const caseInsensitivePost = blogPosts.find(post => 
            post.slug.toLowerCase() === slug.toLowerCase()
        );
        if (caseInsensitivePost) {
            console.warn('⚠️  Found post with case-insensitive match:', caseInsensitivePost.slug);
            return caseInsensitivePost;
        }
    } else {
        console.log('✅ Found post:', post.title);
    }
    
    return post;
};

// Get all posts
export const getAllPosts = () => {
    return blogPosts;
};