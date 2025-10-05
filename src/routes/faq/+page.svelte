<script>
    import { onMount } from 'svelte';
    
    let copyrightYear = 2024; // Default fallback
    
    onMount(() => {
        copyrightYear = new Date().getFullYear();
    });
    
    // FAQ data with structured content for SEO
    const faqItems = [
        {
            question: "What is a temporary email address?",
            answer: `
                <p>A temporary email address, also known as a disposable or anonymous email, is a short-term email address that automatically expires after a set period. It allows you to receive emails without revealing your personal email address, protecting your privacy and keeping your primary inbox free from spam.</p>
                <p>Temporary email services like Fire Temp Mail provide these addresses instantly without requiring registration, making them ideal for one-time signups, online verifications, and protecting your identity online.</p>
            `,
            icon: "📧"
        },
        {
            question: "Why should I use a temporary email service?",
            answer: `
                <p>Using a temporary email service offers several important benefits:</p>
                <ul>
                    <li><strong>Privacy Protection:</strong> Keep your personal email address private when signing up for services</li>
                    <li><strong>Spam Prevention:</strong> Avoid unwanted promotional emails and newsletters</li>
                    <li><strong>Security Enhancement:</strong> Reduce risks from data breaches by using disposable addresses</li>
                    <li><strong>Organization:</strong> Create different emails for different purposes (shopping, forums, etc.)</li>
                    <li><strong>Convenience:</strong> No registration required and instant access to new email addresses</li>
                </ul>
            `,
            icon: "🛡️"
        },
        {
            question: "How does Fire Temp Mail protect my privacy?",
            answer: `
                <p>Fire Temp Mail employs multiple strategies to ensure your privacy:</p>
                <ol>
                    <li>We don't require personal information to use our service</li>
                    <li>All emails are automatically deleted after 2 hours</li>
                    <li>We use HTTPS encryption for all data transfers</li>
                    <li>Our service doesn't track your activity across websites</li>
                    <li>We don't sell or share your data with third parties</li>
                </ol>
                <p>For additional security, we recommend not using temporary email for highly sensitive communications.</p>
            `,
            icon: "🔒"
        },
        {
            question: "Is Fire Temp Mail completely free to use?",
            answer: `
                <p>Yes, our basic temporary email service is completely free with no hidden costs. With our free plan, you can:</p>
                <ul>
                    <li>Create unlimited temporary email addresses</li>
                    <li>Receive emails for up to 24 hours (extendable)</li>
                    <li>View emails in our clean, ad-free interface</li>
                    <li>Use our service without registration</li>
                </ul>
                <p>We also offer a premium plan with additional features like sending emails, longer expiration times, and custom domains for users with more advanced needs.</p>
            `,
            icon: "💸"
        },
        {
            question: "How long do temporary emails last?",
            answer: `
                <p>By default, Fire Temp Mail addresses remain active for 24 hours. However, you can extend this period:</p>
                <ol>
                    <li>Basic free addresses: 24 hours (extendable up to 3 times)</li>
                    <li>Extended addresses: Up to 72 hours with multiple extensions</li>
                    <li>Premium addresses: Custom durations up to 30 days</li>
                </ol>
                <p>After the expiration period, all emails associated with the address are permanently deleted from our servers.</p>
            `,
            icon: "⏱️"
        },
        {
            question: "Can I send emails from a temporary address?",
            answer: `
                <p>Our basic service focuses on receiving emails to protect your privacy. However:</p>
                <ul>
                    <li><strong>Free tier:</strong> Receive emails only</li>
                    <li><strong>Premium tier:</strong> Send emails from your temporary address</li>
                    <li><strong>All tiers:</strong> View and manage received emails through our secure interface</li>
                </ul>
                <p>The receiving-only approach for free accounts enhances privacy by preventing misuse of our service for spam activities.</p>
            `,
            icon: "📤"
        },
        {
            question: "What happens to emails after they expire?",
            answer: `
                <p>Fire Temp Mail follows a strict data retention policy:</p>
                <ol>
                    <li>Emails are automatically deleted after the address expires</li>
                    <li>Expired addresses cannot be recovered</li>
                    <li>No backups are maintained of deleted content</li>
                    <li>Our system is designed to permanently erase all data upon expiration</li>
                </ol>
                <p>This approach ensures your privacy is protected and that no sensitive information remains on our servers longer than necessary.</p>
            `,
            icon: "🗑️"
        },
        {
            question: "Can I use temporary email for important accounts?",
            answer: `
                <p>While temporary emails are excellent for privacy, we recommend caution:</p>
                <ul>
                    <li><strong>Recommended for:</strong> One-time signups, newsletters, forum registrations, and temporary verifications</li>
                    <li><strong>Not recommended for:</strong> Banking, government services, primary email accounts, or any service requiring long-term access</li>
                    <li><strong>Consider:</strong> The temporary nature means you'll lose access if you need to reset passwords later</li>
                </ul>
                <p>For important accounts, we recommend using a permanent email address from a reputable provider.</p>
            `,
            icon: "⚠️"
        }
    ];

    // Function to toggle FAQ items
    function toggleFaq(index) {
        faqItems.forEach((item, i) => {
            if (i !== index) {
                item.open = false;
            }
        });
        faqItems[index].open = !faqItems[index].open;
    }
</script>

<svelte:head>
    <title>Frequently Asked Questions - Fire Temp Mail | Temporary Email Service</title>
    <meta name="description" content="Get answers to common questions about Fire Temp Mail's temporary email service. Learn how to use disposable emails for privacy, security, and spam protection." />
    <meta name="keywords" content="temporary email, disposable email, FAQ, email privacy, spam protection, anonymous email, burner email, email security" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/faq" />
    
    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:title" content="Frequently Asked Questions - Fire Temp Mail" />
    <meta property="og:description" content="Get answers to common questions about Fire Temp Mail's temporary email service for privacy and security." />
    <meta property="og:type" content="website" />
    
    <!-- JSON-LD structured data for FAQ SEO -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                ${faqItems.map(item => `{
                    "@type": "Question",
                    "name": "${item.question.replace(/"/g, '\\"')}",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "${item.answer.replace(/<[^>]*>/g, '').replace(/"/g, '\\"')}"
                    }
                }`).join(',')}
            ]
        }
    </script>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 900px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header with H1 -->
            <header class="page-header">
                <h1 class="text-center">
                    <span class="header-icon">❓</span>
                    Frequently Asked Questions
                </h1>
                
                <p class="page-subtitle">
                    Find answers to common questions about our secure temporary email service designed to protect your privacy.
                </p>
            </header>
            
            <!-- FAQ Categories -->
            <div class="faq-categories">
                <div class="category-card">
                    <div class="category-icon">🔒</div>
                    <h3>Privacy & Security</h3>
                    <p>How we protect your data and identity</p>
                </div>
                <div class="category-card">
                    <div class="category-icon">⏱️</div>
                    <h3>Usage & Features</h3>
                    <p>How to use our service effectively</p>
                </div>
            </div>
            
            <!-- FAQ Items -->
            <div class="faq-container">
                {#each faqItems as item, index}
                    <div class="faq-item {item.open ? 'active' : ''}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                        <button
                            type="button"
                            class="faq-question"
                            aria-expanded={item.open}
                            aria-controls={'faq-answer-'+index}
                            on:click={() => toggleFaq(index)}
                            on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleFaq(index))}
                            itemprop="name"
                        >
                            <div class="question-content">
                                <span class="question-icon">{item.icon}</span>
                                <span class="question-text">{item.question}</span>
                            </div>
                            <span class="faq-icon" aria-hidden="true">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </button>
                        {#if item.open}
                            <div class="faq-answer" id={'faq-answer-'+index} itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                <div class="answer-content">
                                    {@html item.answer}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
            
            <!-- Quick Stats -->
            <div class="quick-stats">
                <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Service Availability</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">10K+</div>
                    <div class="stat-label">Daily Users</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">99.9%</div>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24h</div>
                    <div class="stat-label">Email Lifetime</div>
                </div>
            </div>
            
            <!-- Additional SEO Content -->
            <div class="seo-content">
                <h2>Why Choose Fire Temp Mail for Your Temporary Email Needs</h2>
                <p>Fire Temp Mail provides a secure, convenient solution for managing your online privacy. Our service helps you avoid spam while protecting your personal information from data breaches and unwanted marketing.</p>
                
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <div class="benefit-icon">⚡</div>
                        <h3>Instant Access</h3>
                        <p>Generate temporary emails immediately without any registration process</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🛡️</div>
                        <h3>Enhanced Privacy</h3>
                        <p>Keep your primary email address confidential and protected</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🚫</div>
                        <h3>Spam Protection</h3>
                        <p>Prevent unwanted emails from reaching your main inbox</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🔐</div>
                        <h3>Security</h3>
                        <p>Reduce risks associated with data breaches and phishing</p>
                    </div>
                </div>
            </div>
            
            <!-- Contact Section -->
            <div class="contact-section">
                <div class="contact-content">
                    <h2>Still Have Questions?</h2>
                    <p>Can't find the answer you're looking for? Our support team is ready to help you with any questions about our temporary email service.</p>
                    <a href="/contact" class="btn btn-primary">
                        <i class="fas fa-envelope"></i>
                        Contact Our Support Team
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-8 mb-4 mb-md-0">
                <h5 class="footer-title">Quick Links</h5>
                <div class="row">
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/email-generator">Email Generator</a></li>
                            <li><a href="/gmail-generator">Gmail Generator</a></li>
                            <li><a href="/temporary-gmail">Temporary Gmail</a></li>
                            <li><a href="/temp-gmail">Temp Gmail</a></li>
                            <li><a href="/temp-mail-edu">Temp Mail EDU</a></li>
                            <li><a href="/10minutemail">10 Minute Mail</a></li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="footer-links">
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <h5 class="footer-title">Support Our Service</h5>
                <div class="donation-section">
                    <p>Help us keep FireTempMail free by making a donation. Your support helps maintain and improve our service.</p>
                    
                    <div class="kofi-qr">
                        <a href="https://ko-fi.com/firetempmail" target="_blank">
                            <img src="https://storage.ko-fi.com/cdn/useruploads/N4N61LJTEP/qrcode.png?v=2668fb77-3b3b-4039-abc5-e7004afdcebe&v=2&_gl=1*1bpnkx0*_gcl_au*Mzg2NjgyMDUuMTc1ODM3MTgzOA..*_ga*Nzg1NDU0NTQ2LjE3NTgzNzE4Mzk.*_ga_M13FZ7VQ2C*czE3NTgzNzE4MzgkbzEkZzEkdDE3NTgzNzI5MTkkajYwJGwwJGgw" 
                                 alt="Support us on Ko-fi" class="img-fluid">
                        </a>
                        <p class="kofi-text">Scan to support us on Ko-fi</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="copyright">© {copyrightYear} FireTempMail. All Rights Reserved.</p>
            </div>
            <div class="col-md-6 text-md-end">
                <div class="social-icons">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    /* Footer Styles */
    .footer {
        background-color: #22242b;
        color: #a7a7aa;
        padding: 40px 0 20px;
    }
    .footer a {
        color: #a7a7aa;
        text-decoration: none;
        transition: color 0.3s;
    }
    .footer a:hover {
        color: #3498db;
    }
    .footer-title {
        font-weight: 700;
        margin-bottom: 20px;
        font-size: 1.3rem;
        color: #a7a7aa;
    }
    .footer-links {
        list-style: none;
        padding: 0;
        line-height: 2.2;
    }
    .footer-links li {
        margin-bottom: 8px;
    }
    .divider {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin: 30px 0 20px;
    }
    .donation-section {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
    }
    .kofi-qr {
        text-align: center;
        margin-top: 15px;
    }
    .kofi-qr img {
        max-width: 150px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .kofi-text {
        font-size: 0.9rem;
        margin-top: 10px;
    }
    .copyright {
        font-size: 0.9rem;
        opacity: 0.8;
    }
    .social-icons {
        font-size: 1.5rem;
        margin-top: 15px;
    }
    .social-icons a {
        margin-right: 15px;
    }
    
    /* FAQ Page Styles */
    .page-header {
        margin-bottom: 3rem;
        text-align: center;
    }
    
    h1 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 700;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #2c3e50;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .header-icon {
        font-size: 2.2rem;
    }
    
    .page-subtitle {
        font-size: 1.2rem;
        color: #6c757d;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
    }
    
    /* FAQ Categories */
    .faq-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 2.5rem 0;
    }
    
    .category-card {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
    }
    
    .category-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .category-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .category-card h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: #2c3e50;
    }
    
    .category-card p {
        color: #6c757d;
        font-size: 0.9rem;
        margin: 0;
    }
    
    /* FAQ Items */
    .faq-container {
        margin: 2.5rem 0;
    }
    
    .faq-item {
        background: white;
        border-radius: 12px;
        margin-bottom: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        border: 1px solid #e9ecef;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .faq-item.active {
        border-color: #3498db;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.15);
    }
    
    .faq-question {
        width: 100%;
        padding: 1.5rem;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s ease;
    }
    
    .faq-question:hover {
        background-color: #f8f9fa;
    }
    
    .question-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .question-icon {
        font-size: 1.5rem;
        width: 40px;
        text-align: center;
    }
    
    .question-text {
        font-weight: 600;
        font-size: 1.1rem;
        color: #2c3e50;
    }
    
    .faq-icon {
        transition: transform 0.3s ease;
        color: #6c757d;
    }
    
    .faq-item.active .faq-icon {
        transform: rotate(180deg);
        color: #3498db;
    }
    
    .faq-answer {
        padding: 0 1.5rem;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .faq-item.active .faq-answer {
        padding: 0 1.5rem 1.5rem;
        max-height: 1000px;
    }
    
    .answer-content {
        border-left: 3px solid #3498db;
        padding-left: 1rem;
    }
    
    .answer-content p {
        margin-bottom: 1rem;
        line-height: 1.7;
    }
    
    .answer-content ul, .answer-content ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .answer-content li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    /* Quick Stats */
    .quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
        margin: 3rem 0;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 12px;
    }
    
    .stat-item {
        text-align: center;
    }
    
    .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: #3498db;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: #6c757d;
        font-weight: 500;
    }
    
    /* SEO Content */
    .seo-content {
        margin: 3rem 0;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 12px;
    }
    
    .seo-content h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
    }
    
    .seo-content p {
        margin-bottom: 1.5rem;
        line-height: 1.7;
    }
    
    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
    
    .benefit-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
    }
    
    .benefit-card:hover {
        transform: translateY(-5px);
    }
    
    .benefit-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .benefit-card h3 {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
        color: #2c3e50;
    }
    
    .benefit-card p {
        font-size: 0.9rem;
        color: #6c757d;
        margin: 0;
        line-height: 1.5;
    }
    
    /* Contact Section */
    .contact-section {
        margin: 3rem 0;
        padding: 2.5rem;
        background: linear-gradient(135deg, #3498db, #2980b9);
        border-radius: 12px;
        color: white;
        text-align: center;
    }
    
    .contact-content h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: white;
    }
    
    .contact-content p {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
        opacity: 0.9;
    }
    
    .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.5rem;
        background: white;
        color: #3498db;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        background: #f8f9fa;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
            flex-direction: column;
            gap: 0;
        }
        
        .header-icon {
            margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
            font-size: 1rem;
        }
        
        .faq-categories {
            grid-template-columns: 1fr;
        }
        
        .faq-question {
            padding: 1.2rem;
        }
        
        .question-content {
            gap: 0.8rem;
        }
        
        .question-text {
            font-size: 1rem;
        }
        
        .quick-stats {
            grid-template-columns: repeat(2, 1fr);
            padding: 1.5rem;
        }
        
        .benefits-grid {
            grid-template-columns: 1fr;
        }
        
        .contact-section {
            padding: 1.5rem;
        }
    }
</style>