<script>
    import { _ } from 'svelte-i18n';
    
    // Import page data for SEO
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{data?.seo?.title || 'Terms of Service - Fire Temp Mail'}</title>
    <meta name="description" content={data?.seo?.description || 'Terms of Service for Fire Temp Mail. By using our temporary email services, you agree to these terms and conditions.'}>
    <meta name="keywords" content={data?.seo?.keywords || 'Terms of Service, temp mail, disposable email'}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/terms'} />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">
                Terms of Service
            </h1>
            
            <div class="text-start">
                <p><strong>Last updated:</strong> December 31, 2025</p>
                
                <div class="alert alert-info">
                    <strong>Welcome to Fire Temp Mail!</strong> By accessing or using our website (firetempmail.com), mobile applications, or any of our services (collectively, the "Service"), you agree to comply with and be bound by these Terms of Use ("Terms"). Please read them carefully.
                </div>

                <h2>1. Acceptance of Terms</h2>
                <p>By using our Service, you confirm that you are at least 13 years old, or the legal age of majority in your jurisdiction, and are legally capable of entering into a binding contract. If you do not agree to these Terms, please do not use our Service.</p>

                <h2>2. Description of Service</h2>
                <p>Fire Temp Mail provides temporary, disposable email addresses to help users manage online interactions while protecting their primary email accounts. We offer web applications with both free (ad-supported) and premium (subscription-based) features.</p>

                <h2>3. Subscription and Billing</h2>
                <p>Certain features require a paid subscription, available through our website. Subscription plans automatically renew unless cancelled. All fees are non-refundable except as required by law or specifically stated in writing.</p>
                
                <h3>3.1 Web App Subscriptions</h3>
                <p>Web subscriptions are managed via our website. You may cancel via your account dashboard. Upon cancellation, your subscription will remain active until the end of the billing cycle.</p>

                <h2>4. Use of the Service</h2>
                <p>You agree to use the Service only for lawful purposes. You must not:</p>
                <ul>
                    <li>Use the Service for sending spam, abusive content, or illegal activities</li>
                    <li>Attempt to exploit, reverse engineer, or harm our Service or servers</li>
                    <li>Violate any applicable local, national, or international law or regulation</li>
                    <li>Use the Service to harass, threaten, or intimidate others</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                    <li>Use the Service for commercial purposes without our written consent</li>
                    <li>Attempt to gain unauthorized access to any part of the Service</li>
                </ul>

                <h2>5. Acceptable Use Policy</h2>
                <p>Our service is designed for legitimate privacy protection purposes. Acceptable uses include:</p>
                <ul>
                    <li>Protecting your primary email from spam and marketing lists</li>
                    <li>Registering for online services and trials</li>
                    <li>Testing applications and websites safely</li>
                    <li>Receiving verification emails anonymously</li>
                    <li>Accessing content that requires email registration</li>
                </ul>
                <p><strong>Unacceptable uses include:</strong></p>
                <ul>
                    <li>Creating accounts for illegal activities</li>
                    <li>Bypassing bans or suspensions on other platforms</li>
                    <li>Harassment or bullying</li>
                    <li>Financial fraud or identity theft</li>
                    <li>Distribution of malware or phishing attempts</li>
                </ul>

                <h2>6. Advertising and Tracking</h2>
                <p>Our free services are supported by advertising. We may display ads from third-party networks. By using the free version, you consent to this. For more control over your data and an ad-free experience, please consider subscribing to our premium offering.</p>

                <h2>7. Account Security</h2>
                <p>You are responsible for maintaining the confidentiality of your account credentials and are responsible for all activities that occur under your account.</p>

                <h2>8. Data Storage and Privacy</h2>
                <h3>8.1 Temporary Nature of Service</h3>
                <p>Fire Temp Mail is a temporary email service. All data, including emails, attachments, and account information, may be automatically deleted after a certain period. We do not guarantee permanent storage of any data.</p>
                
                <h3>8.2 Email Content</h3>
                <p>While we respect your privacy, please note that:</p>
                <ul>
                    <li>Emails are stored temporarily and automatically deleted</li>
                    <li>We do not read or monitor email content except for abuse prevention</li>
                    <li>We cannot guarantee delivery or storage of any email</li>
                    <li>We may scan emails for security threats and spam</li>
                </ul>
                
                <h3>8.3 Privacy Policy</h3>
                <p>Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. Please review our Privacy Policy at <a href="/privacy-policy">https://firetempmail.com/privacy</a>.</p>

                <h2>9. Intellectual Property</h2>
                <p>All content, features, and functionality (including text, logos, icons, and software) are owned by Fire Temp Mail and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our written permission.</p>

                <h2>10. Termination</h2>
                <p>We reserve the right to suspend or terminate your access to the Service at any time, with or without cause or notice, including for violation of these Terms. Reasons for termination may include:</p>
                <ul>
                    <li>Violation of these Terms of Service</li>
                    <li>Abuse of the Service</li>
                    <li>Illegal or unauthorized use</li>
                    <li>Non-payment for premium services</li>
                </ul>

                <h2>11. Disclaimer of Warranties</h2>
                <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:</p>
                <ul>
                    <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                    <li>Results from using the Service will be accurate or reliable</li>
                    <li>Any errors in the Service will be corrected</li>
                    <li>Emails will always be delivered, stored, or accessible</li>
                    <li>Domains will remain unchanged or available indefinitely</li>
                    <li>Messages will remain unaltered or free from malware</li>
                </ul>

                <h2>12. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, Fire Temp Mail shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of the Service, including but not limited to:</p>
                <ul>
                    <li>Loss of data or emails</li>
                    <li>Loss of business opportunities</li>
                    <li>Interruption of service</li>
                    <li>Any damages resulting from reliance on temporary email addresses</li>
                </ul>
                <p>You agree to hold us harmless from any damages, losses, or claims arising out of your use of the service, including loss of emails or consequences of relying on temporary addresses.</p>

                <h2>13. Indemnification</h2>
                <p>You agree to indemnify and hold harmless Fire Temp Mail and its affiliates, officers, agents, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Service, your violation of these Terms, or your violation of any rights of another.</p>

                <h2>14. Modifications to Terms</h2>
                <p>We may update these Terms at any time. If we make significant changes, we will notify you via our website or app. Your continued use of the Service after any update constitutes acceptance of the revised Terms. We reserve the right to update or revise these Terms at any time. Material changes will be posted on this page with a revised "last updated" date.</p>

                <h2>15. Governing Law and Dispute Resolution</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Fire Temp Mail operates, without regard to its conflict of law principles. Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration rather than in court.</p>

                <h2>16. Severability</h2>
                <p>If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will remain in full force and effect.</p>

                <h2>17. Entire Agreement</h2>
                <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Fire Temp Mail regarding the Service and supersede any prior agreements.</p>

                <h2>18. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> support@firetempmail.com</li>
                    <li><strong>Website:</strong> https://firetempmail.com/contact</li>
                </ul>

                <div class="alert alert-warning mt-4">
                    <strong>Note:</strong> By using Fire Temp Mail, you acknowledge that you have read, understood, and agreed to these Terms of Use. If you do not agree with any part of these terms, you must not use our Service.
                </div>

                <hr class="my-4">

                <p class="text-muted"><small>These Terms of Service are effective as of December 31, 2025 and supersede all previous versions.</small></p>
            </div>
        </div>
    </div>
</section>

<style>
    .container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
    }
    
    h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        color: #2c3e50;
        padding-top: 10px;
    }
    
    h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 1.5rem 0 0.5rem 0;
        color: #34495e;
    }
    
    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        list-style: disc;
    }
    
    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    strong {
        color: #2c3e50;
    }
    
    .alert {
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 5px solid;
    }
    
    .alert-info {
        background-color: #e7f3fe;
        border-color: #2196F3;
        color: #0c5460;
    }
    
    .alert-warning {
        background-color: #fff3cd;
        border-color: #ffc107;
        color: #856404;
    }
    
    hr {
        border: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #3498db, transparent);
        margin: 2rem 0;
    }
    
    a {
        color: #3498db;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        
        h2 {
            font-size: 1.5rem;
        }
        
        h3 {
            font-size: 1.2rem;
        }
        
        .container {
            padding: 15px;
        }
    }
</style>