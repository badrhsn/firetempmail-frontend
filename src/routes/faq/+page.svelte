<script>
    let copyrightYear = new Date().getFullYear();
    
    // FAQ data
    const faqItems = [
        {
            question: "What is a temporary / disposable / anonymous mail?",
            answer: "<p>A temporary email, also known as disposable or anonymous mail, is a short-term email address that automatically expires after a certain period. It allows you to receive emails without revealing your personal email address, protecting your privacy and keeping your primary inbox free from spam.</p>"
        },
        {
            question: "Why do you need a temporary email address?",
            answer: `
                <p>Temporary email addresses are useful for:</p>
                <ul>
                    <li>Signing up for websites and services without revealing your personal email</li>
                    <li>Protecting your primary inbox from spam and promotional emails</li>
                    <li>Maintaining anonymity when required</li>
                    <li>Preventing tracking of your online activities</li>
                    <li>Avoiding data breaches that could expose your personal email</li>
                </ul>
            `
        },
        {
            question: "What is the difference between disposable mail and regular email?",
            answer: `
                <p>The main differences are:</p>
                <ul>
                    <li><strong>Longevity:</strong> Regular emails are permanent, while disposable emails expire after a set time</li>
                    <li><strong>Purpose:</strong> Regular emails are for personal/professional use, disposable emails are for temporary needs</li>
                    <li><strong>Privacy:</strong> Disposable emails protect your identity and primary inbox</li>
                    <li><strong>Setup:</strong> Regular emails require registration, while temporary emails are instantly available</li>
                    <li><strong>Management:</strong> Regular emails require maintenance, while disposable emails are self-cleaning</li>
                </ul>
            `
        },
        {
            question: "How to extend the lifetime of the email address?",
            answer: `
                <p>With Fire Temp Mail, you can extend the lifetime of your temporary email address by:</p>
                <ol>
                    <li>Visiting your dashboard before the expiration time</li>
                    <li>Clicking the "Extend" button next to your email address</li>
                    <li>Choosing the desired extension period (1 hour, 6 hours, or 24 hours)</li>
                </ol>
                <p>Note: Each email address can be extended up to 3 times for maximum privacy protection.</p>
            `
        },
        {
            question: "How to send an email from a temporary address?",
            answer: `
                <p>Our basic temporary email service currently focuses on receiving emails. However, we offer a premium upgrade that allows you to send emails from your temporary address. With the premium plan, you can:</p>
                <ul>
                    <li>Send emails to any address while maintaining anonymity</li>
                    <li>Use our web interface or browser extension</li>
                    <li>Include attachments up to 10MB</li>
                </ul>
            `
        },
        {
            question: "How to delete a temporary email?",
            answer: `
                <p>Deleting a temporary email is simple:</p>
                <ol>
                    <li>Go to your dashboard</li>
                    <li>Find the email address you want to delete</li>
                    <li>Click the "Delete" button next to it</li>
                    <li>Confirm the deletion in the pop-up window</li>
                </ol>
                <p>Alternatively, you can simply stop using the address, and it will automatically expire and delete itself after the set time period.</p>
            `
        },
        {
            question: "Can I check the received emails?",
            answer: `
                <p>Yes, absolutely! You can view all emails sent to your temporary address through our secure web interface. Here's how:</p>
                <ol>
                    <li>Log in to your dashboard (if you've created an account)</li>
                    <li>Or simply return to the email address page if you're using a quick temporary email</li>
                    <li>All incoming emails will be displayed in chronological order</li>
                    <li>Click on any email to view its contents, including text and attachments</li>
                </ol>
                <p>We provide a clean, ad-free interface for reading your temporary emails without distractions.</p>
            `
        },
        {
            question: "Is Fire Temp Mail completely free to use?",
            answer: `
                <p>Yes, our basic temporary email service is completely free with no hidden costs. You can:</p>
                <ul>
                    <li>Create unlimited temporary email addresses</li>
                    <li>Receive emails for up to 24 hours (extendable)</li>
                    <li>View emails in our clean, ad-free interface</li>
                    <li>Use our service without registration</li>
                </ul>
                <p>We also offer a premium plan with additional features like sending emails, longer expiration times, and custom domains for users with more advanced needs.</p>
            `
        },
        {
            question: "How secure is my data with Fire Temp Mail?",
            answer: `
                <p>We take your privacy and security seriously:</p>
                <ul>
                    <li>All emails are automatically deleted after expiration</li>
                    <li>We don't store personal information or require registration for basic use</li>
                    <li>Our service uses HTTPS encryption for all data transfers</li>
                    <li>We don't sell or share your data with third parties</li>
                    <li>Our servers are secured with industry-standard protections</li>
                </ul>
                <p>However, we recommend not using temporary email for highly sensitive information as an additional precaution.</p>
            `
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
    <title>Frequently Asked Questions - Fire Temp Mail</title>
    <meta name="description" content="Find answers to common questions about Fire Temp Mail, the secure temporary email service that protects your privacy and keeps your inbox spam-free." />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">❓&nbsp;</span>
                Frequently Asked Questions
            </h1>
            
            <p class="text-start" style="margin-bottom: 2rem;">
                Temporary anonymous email service is specifically designed to protect your privacy. 
                Find answers to common questions about our secure and convenient service.
            </p>
            
            <!-- FAQ Items -->
            <div class="faq-container text-start">
                {#each faqItems as item, index}
                    <div class="faq-item">
                        <div class="faq-question" on:click={() => toggleFaq(index)}>
                            {item.question}
                            <span class="faq-icon">{item.open ? '−' : '+'}</span>
                        </div>
                        {#if item.open}
                            <div class="faq-answer">
                                {@html item.answer}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
            
            <!-- Contact Section -->
            <div class="contact-section text-start" style="margin-top: 3rem; padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                <h3>Still have questions?</h3>
                <p>We're here to help you with any questions about our temporary email service.</p>
                <a href="/contact" class="btn btn-primary">Contact Our Support Team</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/" style="color: inherit;">Home</a>&nbsp;&nbsp;
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="/contact" style="color: inherit;">Contact</a>
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Copyright © {copyrightYear} 
            </p>
        </div>
    </div>
</section>

<style>
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--bs-dark);
    }
    
    h3 {
        font-size: 1.5rem;
        margin: 1.5rem 0 0.5rem 0;
        color: var(--bs-dark);
    }
    
    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .faq-container {
        margin: 2rem 0;
    }
    
    .faq-item {
        border-bottom: 1px solid #e9ecef;
    }
    
    .faq-question {
        padding: 1.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: color 0.2s;
    }
    
    .faq-question:hover {
        color: #007bff;
    }
    
    .faq-icon {
        font-size: 1.5rem;
        font-weight: 300;
    }
    
    .faq-answer {
        padding: 0 0 1.5rem 0;
    }
    
    .faq-answer ul, .faq-answer ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .faq-answer li {
        margin-bottom: 0.5rem;
    }
    
    .contact-section {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
    }
    
    .btn-primary {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 0.5rem;
    }
    
    .btn-primary:hover {
        background: #0056b3;
    }
    
    @media (max-width: 768px) {
        .faq-question {
            padding: 1.2rem 0;
            font-size: 1rem;
        }
    }
</style>