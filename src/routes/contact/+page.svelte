<script>
    import { _ } from 'svelte-i18n';
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Contact Us - Fire Temp Mail</title>
    <meta name="description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email. We're here to help!">
    <meta name="keywords" content="contact, support, email, Fire Temp Mail, temp mail, report abuse, business inquiry">
    <meta name="author" content="Fire Temp Mail">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/contact">
</svelte:head>


<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                {$_('nav.contact')}
            </h1>
            
            <div class="text-start">
                <h2>{$_('contact.getInTouch')}</h2>
                <p>{$_('contact.loveToHear')}</p>
                
                <div class="contact-section">
                    <h3>{$_('contact.emailSupport')}</h3>
                    <p>{$_('contact.generalInquiries')} <a href="mailto:support@firetempmail.com">support@firetempmail.com</a></p>
                    <p class="description">Our support team is dedicated to helping you with any questions about Fire Temp Mail's temporary email service. Whether you need help with creating disposable emails, understanding our privacy features, or troubleshooting any issues, we're here to assist you.</p>
                </div>
                
                <div class="contact-section">
                    <h3>{$_('contact.businessInquiries')}</h3>
                    <p>{$_('contact.businessText')} <a href="mailto:business@firetempmail.com">business@firetempmail.com</a></p>
                    <p class="description">Looking to integrate Fire Temp Mail into your business? We offer API access, enterprise solutions, and partnership opportunities for companies that value privacy and security. Contact us to discuss bulk email generation, custom domains, or white-label solutions.</p>
                </div>
                
                <div class="contact-section">
                    <h3>{$_('contact.reportAbuse')}</h3>
                    <p>{$_('contact.reportAbuseText')} <a href="mailto:abuse@firetempmail.com">abuse@firetempmail.com</a></p>
                    <p class="description">Fire Temp Mail is committed to preventing spam and abuse. If you've received unwanted emails from our service or suspect misuse of our temporary email system, please report it immediately. Include relevant details such as the temporary email address, timestamps, and nature of the abuse.</p>
                </div>
                
                <div class="contact-section">
                    <h3>{$_('contact.responseTime')}</h3>
                    <p>{$_('contact.responseText')}</p>
                    <p class="description">We strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please mark your email subject with "URGENT" for priority handling. Thank you for choosing Fire Temp Mail as your trusted temporary email provider.</p>
                </div>
                
                <div class="why-contact-us">
                    <h3>Why Choose Fire Temp Mail?</h3>
                    <ul>
                        <li><strong>Privacy First:</strong> We never store personal information or track your activity</li>
                        <li><strong>Instant Access:</strong> Generate temporary email addresses in seconds without registration</li>
                        <li><strong>Reliable Service:</strong> 99.9% uptime with fast email delivery</li>
                        <li><strong>Free Forever:</strong> Our core service remains completely free for all users</li>
                        <li><strong>No Spam:</strong> Keep your real inbox clean from promotional emails and spam</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    
    /* Container */
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    /* Header */
    h1 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: left;
    }
    
    h1 span {
        font-weight: normal !important;
        color: rgb(255, 255, 255);
    }
    
    /* Description */
    h2 {
        font-family: 'Inter Tight', sans-serif;
        font-weight: 600;
        margin-bottom: 16px;
        text-align: center;
    }
    
    .contact-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .contact-section h3 {
        margin-top: 0;
        color: #1a1a1a;
    }
    
    .description {
        color: #4a5568;
        line-height: 1.8;
        margin-top: 0.5rem;
    }
    
    .why-contact-us {
        margin-top: 3rem;
        padding: 2rem;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
    }
    
    .why-contact-us h3 {
        margin-top: 0;
        color: #1a1a1a;
        margin-bottom: 1rem;
    }
    
    .why-contact-us ul {
        list-style: none;
        padding: 0;
    }
    
    .why-contact-us li {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f1f1f1;
        line-height: 1.6;
    }
    
    .why-contact-us li:last-child {
        border-bottom: none;
    }
    
    .why-contact-us strong {
        color: #1a1a1a;
    }
    
    a {
        color: #3182ce;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>