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

// Simple function to get popular articles
export const getPopularArticles = () => {
    return blogPosts.slice(0, 2);
};

// Simple function to get post by slug
export const getPostBySlug = (slug) => {
    console.log('Looking for slug:', slug);
    const post = blogPosts.find(post => post.slug === slug);
    console.log('Found post:', post);
    return post;
};

// Get all posts
export const getAllPosts = () => {
    return blogPosts;
};