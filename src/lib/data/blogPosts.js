// Make sure this file exists and exports correctly
export const blogPosts = [
    {
        id: 1,
        title: "Why You Should Use Temporary Email Addresses",
        excerpt: "Discover the benefits of using disposable email addresses for online registrations and how they protect your privacy.",
        content: `Full article content would go here...`,
        slug: "why-use-temporary-email",
        date: "2023-11-10",
        author: "Fire Temp Mail Team",
        category: "Privacy",
        readTime: "4 min read",
        image: "/assets/img/blog/email-privacy.jpg"
    },
    // Add a second post to test
    {
        id: 2,
        title: "How to Avoid Email Spam",
        excerpt: "Learn effective strategies to keep your inbox clean from unwanted emails.",
        content: `Full article content would go here...`,
        slug: "how-to-avoid-email-spam",
        date: "2023-11-12",
        author: "Fire Temp Mail Team",
        category: "Security",
        readTime: "5 min read",
        image: "/assets/img/blog/avoid-spam.jpg"
    }
];

export const getPopularArticles = () => {
    return blogPosts.slice(0, 3);
};

export const getPostBySlug = (slug) => {
    console.log('🔍 Searching for slug:', slug);
    console.log('📝 Available slugs:', blogPosts.map(post => post.slug));
    
    const foundPost = blogPosts.find(post => post.slug === slug);
    console.log('✅ Found post:', foundPost);
    
    return foundPost;
};

export const getAllPosts = () => {
    return blogPosts;
};