<script>
    import { _ } from 'svelte-i18n';
    
    // Import page data for SEO
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{data?.seo?.title || 'Privacy Policy - Fire Temp Mail'}</title>
    <meta name="description" content={data?.seo?.description || 'Fire Temp Mail\'s Privacy Policy explains how we collect, use, and protect your information when you use our temporary email services.'}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/privacy-policy'} />
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">
                Privacy Policy
            </h1>
            
            <div class="text-start">
                <p><strong>Last Updated:</strong> 2025-12-31</p>
                
                <div class="alert alert-info">
                    <strong>Note:</strong> Fire Temp Mail ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and disclosed when you use our service at <a href="https://firetempmail.com">https://firetempmail.com</a> and its associated subdomains.
                </div>

                <h2>1. Introduction</h2>
                <p>
                    At Fire Temp Mail, we take your privacy seriously. This Privacy Policy describes how we handle your information when you use our temporary email services. By accessing or using our Service, you agree to the collection and use of information in accordance with this policy.
                </p>
                <p>
                    Our service provides temporary, disposable email addresses that help protect your privacy online. We believe in transparency and want you to understand exactly how we operate.
                </p>

                <h2>2. Definitions</h2>
                <ul>
                    <li><strong>Service:</strong> Refers to the Fire Temp Mail website and temporary email services available at https://firetempmail.com</li>
                    <li><strong>Personal Data:</strong> Any information that can identify an individual</li>
                    <li><strong>Cookies:</strong> Small files stored on your device by your web browser</li>
                    <li><strong>Device:</strong> Any internet-connected device (phone, tablet, computer)</li>
                    <li><strong>IP Address:</strong> Internet Protocol address assigned to your device</li>
                    <li><strong>Website:</strong> Fire Temp Mail's site, which can be accessed via this URL: https://firetempmail.com</li>
                    <li><strong>You:</strong> A person or entity that uses our Services</li>
                </ul>

                <h2>3. Information We Collect</h2>
                <h3>3.1 Automatically Collected Information</h3>
                <p>There is some information like your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our platform. This information may be used to connect your computer to the Internet. Other information collected automatically could be a login, e-mail address, password, computer and connection information such as browser plug-in types and versions and time zone setting, operating systems and platforms.</p>
                
                <p>We automatically collect certain information when you visit, use or navigate the platform. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about who and when you use our service and other technical information. This information is primarily needed to maintain the security and operation of our service, and for our internal analytics and reporting purposes.</p>

                <h3>3.2 Information You Provide</h3>
                <p>We will collect personal information that you submit to us. We may also receive personal information about you from third parties as described above.</p>
                <ul>
                    <li><strong>Temporary Email Addresses:</strong> Generated addresses you use</li>
                    <li><strong>Email Content:</strong> Emails received in temporary inboxes (automatically deleted)</li>
                    <li><strong>Custom Aliases:</strong> If you choose to create custom email addresses</li>
                </ul>

                <h2>4. How We Use Your Information</h2>
                <p>Any of the information we collect from you may be used in one of the following ways:</p>
                <ul>
                    <li><strong>To personalize your experience:</strong> Your information helps us to better respond to your individual needs</li>
                    <li><strong>To improve our service:</strong> We continually strive to improve our service offerings based on the information and feedback we receive from you</li>
                    <li><strong>To improve customer service:</strong> Your information helps us to more effectively respond to your customer service requests and support needs</li>
                    <li><strong>To process transactions</strong></li>
                    <li><strong>To administer a contest, promotion, survey or other site feature</strong></li>
                    <li><strong>To send periodic emails</strong></li>
                </ul>

                <h2>5. Data Storage and Retention</h2>
                <p>We keep your information only so long as we need it to provide service to you and fulfill the purposes described in this policy. This is also the case for anyone that we share your information with and who carries out services on our behalf. When we no longer need to use your information and there is no need for us to keep it to comply with our legal or regulatory obligations, we'll either remove it from our systems or depersonalize it so that we can't identify you.</p>

                <p><strong>Important:</strong> Our service is designed for privacy:</p>
                <ul>
                    <li>Temporary emails are automatically deleted after expiration</li>
                    <li>Email content is not stored permanently</li>
                    <li>IP addresses are logged temporarily for security</li>
                    <li>No personal information is required to use our service</li>
                </ul>

                <h2>6. Cookies and Tracking</h2>
                <h3>6.1 What are Cookies?</h3>
                <p>We use "Cookies" to identify the areas of our website that you have visited. A Cookie is a small piece of data stored on your computer or mobile device by your web browser. We use cookies to personalize the Content that you see on our website. Most web browsers can be set to disable the use of cookies. However, if you disable Cookies, you may not be able to access functionality on our website correctly or at all. We never place Personally Identifiable Information in Cookies.</p>
                
                <h3>6.2 Types of Cookies We Use</h3>
                <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for basic functionality</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong>Functionality Cookies:</strong> Allow the website to remember choices you make</li>
                </ul>

                <h3>6.3 Local Storage and Sessions</h3>
                <p>We use Local Storage (DOM storage) and Sessions to enhance your experience and provide certain functionality.</p>

                <h2>7. Third-Party Services</h2>
                <p>We may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services ("Third-Party Services"). You acknowledge and agree that we shall not be responsible for any Third-Party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof.</p>

                <p>We may share the information that we collect, both personal and non-personal, with third parties such as advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.</p>

                <h2>8. Advertising and Remarketing</h2>
                <p>Advertising keeps us and many of the websites and services you use free of charge. We work hard to make sure that ads are safe, unobtrusive, and as relevant as possible.</p>
                
                <h3>8.1 Remarketing Services</h3>
                <p>We use remarketing services. In digital marketing, remarketing (or retargeting) is the practice of serving ads across the internet to people who have already visited your website. It allows your company to seem like they're "following" people around the internet by serving ads on the websites and platforms they use most.</p>

                <h2>9. Data Security</h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.</p>
                
                <p>We take precautions to protect the security of your information. We have physical, electronic, and managerial procedures to help safeguard, prevent unauthorized access, maintain data security, and correctly use your information. However, neither people nor security systems are foolproof, including encryption systems. In addition, people can commit intentional crimes, make mistakes or fail to follow policies. Therefore, while we use reasonable efforts to protect your personal information, we cannot guarantee its absolute security.</p>

                <h2>10. International Data Transfers</h2>
                <p>Information collected via our website, through direct interactions with you, or from use of our help services may be transferred from time to time to our offices or personnel, or to third parties, located throughout the world, and may be viewed and hosted anywhere in the world, including countries that may not have laws of general applicability regulating the use and transfer of such data. To the fullest extent allowed by applicable law, by using any of the above, you voluntarily consent to the trans-border transfer and hosting of such information.</p>

                <h2>11. Sale of Business</h2>
                <p>We reserve the right to transfer information to a third party in the event of a sale, merger or other transfer of all or substantially all of the assets of Fire Temp Mail, or that portion of Fire Temp Mail to which the Service relates, or in the event that we discontinue our business or file a petition or have filed against us a petition in bankruptcy, reorganization or similar proceeding, provided that the third party agrees to adhere to the terms of this Privacy Policy.</p>

                <h2>12. Your Rights</h2>
                <h3>12.1 Right to Update or Correct Information</h3>
                <p>The rights you have to request updates or corrections to the information we collect depend on your relationship with us. You can contact us in order to (1) update or correct your personally identifiable information, (2) change your preferences with respect to communications and other information you receive from us, or (3) delete the personally identifiable information maintained about you on our systems, by cancelling your account.</p>

                <h3>12.2 GDPR Rights (EU Users)</h3>
                <p>If you are from the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). These include:</p>
                <ul>
                    <li>The right to access, update or delete your information</li>
                    <li>The right of rectification</li>
                    <li>The right to object</li>
                    <li>The right of restriction</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                </ul>

                <h3>12.3 CCPA Rights (California Users)</h3>
                <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
                <ul>
                    <li>Right to know what personal information is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of sale of personal information</li>
                    <li>Right to non-discrimination</li>
                </ul>
                <p><strong>We do not sell your personal information.</strong></p>

                <h2>13. Children's Privacy</h2>
                <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

                <h2>14. Changes to This Policy</h2>
                <p>If we decide to change our privacy policy, we will post those changes on this page, and/or update the Privacy Policy modification date below.</p>

                <h2>15. Governing Law</h2>
                <p>This Privacy Policy is governed by and construed in accordance with the laws of the jurisdiction where Fire Temp Mail operates, excluding its conflicts of law rules.</p>

                <h2>16. Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul>
                    <li><strong>Via Email:</strong> support@firetempmail.com</li>
                    <li><strong>Via Website:</strong> https://firetempmail.com/contact</li>
                </ul>

                

                <h2>17. Acceptance of This Policy</h2>
                <p>By using our service, registering an account, or making a purchase, you consent to this Privacy Policy. If you do not agree to this policy, please do not use our Service. Your continued use of the Service following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

                <hr class="my-4">

                <p class="text-muted"><small>This Privacy Policy is effective as of 2025-12-31 and supersedes all previous versions.</small></p>
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