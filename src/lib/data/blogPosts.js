// Sample blog posts data
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
    {
        id: 2,
        title: "How to Avoid Spam with Disposable Emails",
        excerpt: "Learn effective strategies to keep your primary inbox clean from spam using temporary email services.",
        content: `Full article content would go here...`,
        slug: "avoid-spam-with-disposable-emails",
        date: "2023-11-05",
        author: "Fire Temp Mail Team",
        category: "Security",
        readTime: "5 min read",
        image: "/assets/img/blog/avoid-spam.jpg"
    },
    {
        id: 3,
        title: "The History of Temporary Email Services",
        excerpt: "Explore the evolution of disposable email services from their inception to modern implementations.",
        content: `Full article content would go here...`,
        slug: "history-temporary-email-services",
        date: "2023-10-28",
        author: "Fire Temp Mail Team",
        category: "Education",
        readTime: "7 min read",
        image: "/assets/img/blog/email-history.jpg"
    },
    {
        id: 4,
        title: "5 Ways Temp Mail Protects Your Digital Identity",
        excerpt: "Discover how temporary email services help safeguard your personal information online.",
        content: `Full article content would go here...`,
        slug: "temp-mail-protects-digital-identity",
        date: "2023-10-20",
        author: "Fire Temp Mail Team",
        category: "Security",
        readTime: "6 min read",
        image: "/assets/img/blog/digital-identity.jpg"
    }
];

// Get popular articles (most recent 3)
export const getPopularArticles = () => {
    return blogPosts.slice(0, 3);
};

// Get post by slug
export const getPostBySlug = (slug) => {
    return blogPosts.find(post => post.slug === slug);
};

// Get all posts for sitemap
export const getAllPosts = () => {
    return blogPosts;
};