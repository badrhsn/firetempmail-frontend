<script>
    import { onMount } from 'svelte';
    import { _, isLoading } from 'svelte-i18n';
    
    let copyrightYear = 2024; // Default fallback
    let faqItems = [];

    $: if (!$isLoading && $_) {
        faqItems = [
            {
                question: $_('faq.questions.q1.question'),
                answer: $_('faq.questions.q1.answer'),
                icon: "📧",
                open: false
            },
            {
                question: $_('faq.questions.q2.question'),
                answer: $_('faq.questions.q2.answer'),
                icon: "🛡️",
                open: false
            },
            {
                question: $_('faq.questions.q3.question'),
                answer: $_('faq.questions.q3.answer'),
                icon: "🔒",
                open: false
            },
            {
                question: $_('faq.questions.q4.question'),
                answer: $_('faq.questions.q4.answer'),
                icon: "💸",
                open: false
            },
            {
                question: $_('faq.questions.q5.question'),
                answer: $_('faq.questions.q5.answer'),
                icon: "⏱️",
                open: false
            },
            {
                question: $_('faq.questions.q6.question'),
                answer: $_('faq.questions.q6.answer'),
                icon: "📤",
                open: false
            },
            {
                question: $_('faq.questions.q7.question'),
                answer: $_('faq.questions.q7.answer'),
                icon: "🗑️",
                open: false
            },
            {
                question: $_('faq.questions.q8.question'),
                answer: $_('faq.questions.q8.answer'),
                icon: "⚠️",
                open: false
            }
        ];
    }
    
    // Function to toggle FAQ items
    function toggleFaq(index) {
        faqItems.forEach((item, i) => {
            if (i !== index) {
                item.open = false;
            }
        });
        faqItems[index].open = !faqItems[index].open;
    }

    let faqJsonLd;

    // Generate valid JSON-LD once faqItems are ready
    onMount(() => {
        copyrightYear = new Date().getFullYear();
        faqJsonLd = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer.replace(/<[^>]*>/g, '')
                }
            }))
        };
    });
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
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 900px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header with H1 -->
            <header class="page-header">
                <h1 class="text-center">
                    <span class="header-icon">❓</span>
                    {$_('faq.title')}
                </h1>
                
                <p class="page-subtitle">
                    {$_('faq.subtitle')}
                </p>
                
                <div class="faq-intro">
                    <p>Welcome to Fire Temp Mail's comprehensive FAQ section. Here you'll find answers to the most common questions about our free temporary email service. Whether you're new to disposable emails or a regular user, this guide will help you understand how to protect your privacy, avoid spam, and use our service effectively.</p>
                    
                    <p>Fire Temp Mail provides instant, anonymous temporary email addresses that help you maintain your privacy online. Our service is perfect for signing up for websites, testing services, avoiding spam, and keeping your personal inbox clean. No registration required – just generate an email and start receiving messages immediately.</p>
                </div>
            </header>
            
            <!-- FAQ Categories -->
            <div class="faq-categories">
                <div class="category-card">
                    <div class="category-icon">{$_('faq.categories.privacy.icon')}</div>
                    <h3>{$_('faq.categories.privacy.title')}</h3>
                    <p>{$_('faq.categories.privacy.description')}</p>
                </div>
                <div class="category-card">
                    <div class="category-icon">{$_('faq.categories.usage.icon')}</div>
                    <h3>{$_('faq.categories.usage.title')}</h3>
                    <p>{$_('faq.categories.usage.description')}</p>
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
    
    .faq-intro {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 12px;
        border-left: 4px solid #3182ce;
    }
    
    .faq-intro p {
        color: #4a5568;
        line-height: 1.8;
        margin-bottom: 1rem;
        text-align: left;
    }
    
    .faq-intro p:last-child {
        margin-bottom: 0;
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