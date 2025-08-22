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
    // Add more posts as needed
];

export const getPopularArticles = () => {
    return blogPosts.slice(0, 3);
};

export const getPostBySlug = (slug) => {
    return blogPosts.find(post => post.slug === slug);
};

export const getAllPosts = () => {
    return blogPosts;
};