// src/lib/data/blogPosts.js
const blogPosts = [
    {
        id: 1,
        title: "Why You Should Use Temporary Email Addresses",
        excerpt: "Discover the benefits of using disposable email addresses for online registrations and how they protect your privacy.",
        slug: "why-use-temporary-email",
        date: "2023-11-10",
        author: "Fire Temp Mail Team",
        category: "Privacy",
        readTime: "4 min read",
        content: `
            <p>Temporary email services provide an essential layer of privacy protection in today's digital world. They allow you to maintain your online privacy while still accessing the services you need.</p>
            
            <h2>The Problem with Personal Email</h2>
            <p>When you use your personal email for online registrations, you're exposing yourself to several risks:</p>
            <ul>
                <li><strong>Spam and marketing emails</strong> - Once companies have your email, they can send unlimited promotional content</li>
                <li><strong>Data breaches</strong> - If a service gets hacked, your personal email becomes part of leaked data</li>
                <li><strong>Tracking</strong> - Companies can track your online activity across different services</li>
                <li><strong>Permanent exposure</strong> - Unlike passwords, you can't change your primary email address easily</li>
            </ul>
            
            <h2>Benefits of Temporary Email</h2>
            
            <h3>1. Privacy Protection</h3>
            <p>Temporary email shields your personal inbox from unwanted exposure. You can sign up for services without revealing your actual email address.</p>
            
            <h3>2. Spam Prevention</h3>
            <p>Since temporary emails expire after a set time or after single use, they naturally prevent spam from accumulating in your primary inbox.</p>
            
            <h3>3. Security Enhancement</h3>
            <p>By using disposable emails for less important registrations, you reduce the attack surface for hackers.</p>
            
            <div class="note-box">
                <strong>Pro Tip:</strong> Use different temporary emails for different types of services to stay organized.
            </div>
            
            <h2>How to Get Started with Fire Temp Mail</h2>
            <p>Using our service is simple:</p>
            <ol>
                <li>Visit our homepage</li>
                <li>Generate a temporary email with one click</li>
                <li>Use that email for your registration</li>
                <li>Receive messages in our secure interface</li>
                <li>Dispose of the email when you're done</li>
            </ol>
            
            <p>No registration required, no personal information collected.</p>
            
            <h2>Conclusion</h2>
            <p>In an era where digital privacy is increasingly important, temporary email services provide a simple yet effective solution. They allow you to enjoy online services while maintaining control over your personal information and inbox.</p>
        `
    },
    {
        id: 2,
        title: "How to Avoid Email Spam and Protect Your Inbox",
        excerpt: "Learn effective strategies to keep your inbox clean from unwanted emails and protect your personal information.",
        slug: "how-to-avoid-email-spam",
        date: "2023-11-12",
        author: "Fire Temp Mail Team",
        category: "Security",
        readTime: "5 min read",
        content: `
            <p>Email spam is more than just an annoyance—it can be a security risk. Learn how to protect your inbox and your personal information.</p>
            
            <h2>Understanding Email Spam</h2>
            <p>Email spam refers to unsolicited, often commercial messages sent in bulk. While some spam is merely annoying, other messages can contain phishing attempts or malware.</p>
            
            <h3>Common Types of Spam</h3>
            <ul>
                <li><strong>Commercial advertisements</strong> - Promotional content you didn't request</li>
                <li><strong>Phishing attempts</strong> - Messages designed to steal your credentials</li>
                <li><strong>Malware distribution</strong> - Emails containing malicious attachments or links</li>
                <li><strong>Scams and fraud</strong> - Offers that are too good to be true</li>
            </ul>
            
            <h2>Effective Strategies to Avoid Spam</h2>
            
            <h3>1. Use Temporary Email Addresses</h3>
            <p>The most effective way to prevent spam is to use disposable email addresses for online registrations, newsletters, and one-time services.</p>
            
            <h3>2. Be Selective with Your Email</h3>
            <p>Think twice before sharing your primary email address. Ask yourself if the service truly needs your permanent contact information.</p>
            
            <div class="warning-box">
                <strong>Warning:</strong> Never use your primary email for questionable websites or services.
            </div>
            
            <h3>3. Read Privacy Policies</h3>
            <p>Before signing up for anything, quickly scan the privacy policy to understand how your data will be used.</p>
            
            <h2>How Fire Temp Mail Helps</h2>
            <p>Our temporary email service provides:</p>
            <ul>
                <li>Instant disposable email addresses</li>
                <li>No registration required</li>
                <li>Automatic expiration of emails</li>
                <li>Secure interface for viewing messages</li>
                <li>Complete anonymity</li>
            </ul>
            
            <p>By using our service for online registrations, you can keep your primary inbox clean and secure.</p>
            
            <h2>Final Thoughts</h2>
            <p>Email spam is an inevitable part of the digital landscape, but it doesn't have to overwhelm your inbox. By implementing these strategies and using tools like temporary email services, you can maintain a clean, organized, and secure email experience.</p>
        `
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
    return blogPosts.slice(0, 2);
};

// Make sure to export the raw data too for debugging
export { blogPosts };
// Add this export at the end of the file
export const debugSlugs = () => {
    return blogPosts.map(post => post.slug);
};