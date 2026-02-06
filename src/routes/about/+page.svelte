<script>
    import { _ } from 'svelte-i18n';
    
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>About Fire Temp Mail - Our Mission & Story</title>
    <meta name="description" content="Learn about Fire Temp Mail - a free temporary email service dedicated to protecting your privacy online. Discover our mission, values, and commitment to user privacy.">
    <meta name="keywords" content="about temp mail, temporary email service, privacy protection, email security">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://firetempmail.com/about">
</svelte:head>

<section class="py-5">
    <div class="container" style="max-width: 900px;">
        <div class="about-header text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">About Fire Temp Mail</h1>
            <p class="lead text-muted">
                Protecting your digital privacy, one temporary email at a time
            </p>
        </div>

        <div class="content-section">
            <h2 class="section-title">Our Mission</h2>
            <p class="mb-4">
                Fire Temp Mail was created to solve a simple but critical problem: the erosion of online privacy. Every day, millions of people are forced to provide their personal email addresses to access services, sign up for trials, or download resources—often resulting in an inbox flooded with spam and unwanted marketing emails.
            </p>
            <p class="mb-4">
                We believe your email address is personal. You shouldn't have to sacrifice your privacy or compromise your inbox security just to access online services. That's why we built Fire Temp Mail: a completely free, no-registration temporary email service that puts your privacy first.
            </p>

            <h2 class="section-title mt-5">What We Do</h2>
            <p class="mb-4">
                Fire Temp Mail provides instant, disposable email addresses that work just like regular email—but without any strings attached. No sign-up forms, no personal information required, no tracking cookies. Just instant, anonymous email addresses that receive messages in real-time.
            </p>
            
            <div class="feature-boxes">
                <div class="feature-box">
                    <div class="feature-icon">🔒</div>
                    <h3>Privacy First</h3>
                    <p>We don't log your IP address, track your activity, or collect any personal information. Your temporary emails are automatically deleted, leaving no trace.</p>
                </div>
                
                <div class="feature-box">
                    <div class="feature-icon">⚡</div>
                    <h3>Instant Access</h3>
                    <p>No waiting, no registration, no verification. Get a working temporary email address the moment you visit our site.</p>
                </div>
                
                <div class="feature-box">
                    <div class="feature-icon">🆓</div>
                    <h3>Completely Free</h3>
                    <p>Fire Temp Mail is 100% free with no premium tiers, no hidden fees, and no limitations on usage. Privacy should be accessible to everyone.</p>
                </div>
            </div>

            <h2 class="section-title mt-5">Our Values</h2>
            
            <h3 class="subsection-title">Privacy by Default</h3>
            <p class="mb-4">
                We built Fire Temp Mail from the ground up with privacy as the core principle. Unlike traditional email services that require personal information, phone verification, and extensive data collection, we ask for nothing. Your temporary emails exist only in memory and are automatically purged after a short period.
            </p>

            <h3 class="subsection-title">Transparency</h3>
            <p class="mb-4">
                We're honest about what we do and how our service works. We use ads to keep the service free, but we never sell user data or engage in tracking. What you see is what you get—a simple, effective temporary email service.
            </p>

            <h3 class="subsection-title">Accessibility</h3>
            <p class="mb-4">
                Everyone deserves access to privacy tools. Fire Temp Mail works on any device with a web browser—no apps to download, no software to install, no technical knowledge required.
            </p>

            <h2 class="section-title mt-5">Who Uses Fire Temp Mail?</h2>
            
            <div class="use-case-section">
                <div class="use-case-item">
                    <h4>🛡️ Privacy-Conscious Individuals</h4>
                    <p>People who value their digital privacy and want to keep their personal inbox private and spam-free.</p>
                </div>
                
                <div class="use-case-item">
                    <h4>💻 Developers & Testers</h4>
                    <p>Software developers who need multiple email addresses to test registration flows, email notifications, and user management systems.</p>
                </div>
                
                <div class="use-case-item">
                    <h4>🎓 Students & Researchers</h4>
                    <p>Academic users who need temporary email addresses for research, accessing educational resources, or signing up for online tools.</p>
                </div>
                
                <div class="use-case-item">
                    <h4>🎮 Online Service Users</h4>
                    <p>Anyone who wants to try a service, access a free trial, or sign up for a one-time download without compromising their primary email.</p>
                </div>
            </div>

            <h2 class="section-title mt-5">Technical Implementation</h2>
            <p class="mb-4">
                Fire Temp Mail is built on modern web infrastructure to ensure reliability and speed:
            </p>
            <ul class="technical-list">
                <li><strong>Real-time email delivery</strong> - Messages appear in your inbox within seconds</li>
                <li><strong>Multiple domain support</strong> - Choose from various email domains including Gmail-style addresses</li>
                <li><strong>Spam filtering</strong> - Basic spam protection to keep malicious emails out</li>
                <li><strong>Auto-deletion</strong> - All emails are automatically purged to protect your privacy</li>
                <li><strong>No server-side storage</strong> - Emails exist only temporarily in memory, not in databases</li>
            </ul>

            <h2 class="section-title mt-5">Our Commitment</h2>
            <p class="mb-4">
                We're committed to keeping Fire Temp Mail:
            </p>
            <ul class="commitment-list">
                <li>✅ <strong>Free forever</strong> - No freemium model, no paid features</li>
                <li>✅ <strong>Privacy-focused</strong> - No data collection, no tracking, no logs</li>
                <li>✅ <strong>Fast and reliable</strong> - Continuous infrastructure improvements</li>
                <li>✅ <strong>Accessible to all</strong> - Works on any device, any browser</li>
                <li>✅ <strong>Ad-supported</strong> - Transparent monetization to keep the service running</li>
            </ul>

            <h2 class="section-title mt-5">Responsible Use</h2>
            <p class="mb-4">
                While we provide temporary email addresses to protect your privacy, we ask users to use Fire Temp Mail responsibly:
            </p>
            <ul class="mb-4">
                <li>Don't use temporary emails for illegal activities</li>
                <li>Don't use them to create multiple accounts to abuse services</li>
                <li>Don't expect temporary emails to be permanent—they're designed to be disposable</li>
                <li>Don't use them for important accounts like banking or primary social media</li>
            </ul>
            <p class="mb-4">
                Fire Temp Mail is designed for legitimate privacy protection, not for circumventing terms of service or engaging in fraud.
            </p>

            <h2 class="section-title mt-5">Contact Us</h2>
            <p class="mb-4">
                Have questions, feedback, or concerns? We'd love to hear from you:
            </p>
            <ul class="contact-list mb-5">
                <li>📧 <strong>General inquiries:</strong> <a href="mailto:hello@firetempmail.com">hello@firetempmail.com</a></li>
                <li>🔒 <strong>Privacy concerns:</strong> <a href="mailto:privacy@firetempmail.com">privacy@firetempmail.com</a></li>
                <li>⚠️ <strong>Abuse reports:</strong> <a href="mailto:abuse@firetempmail.com">abuse@firetempmail.com</a></li>
                <li>💼 <strong>Business inquiries:</strong> <a href="mailto:business@firetempmail.com">business@firetempmail.com</a></li>
            </ul>

            <div class="cta-box">
                <h3>Ready to protect your inbox?</h3>
                <p>Get started with a free temporary email address in seconds</p>
                <a href="/" class="btn btn-primary btn-lg">Generate Email Now →</a>
            </div>
        </div>
    </div>
</section>

<style>
    .about-header {
        padding: 2rem 0;
    }

    .content-section {
        background: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        line-height: 1.8;
    }

    .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 3px solid #007bff;
        display: inline-block;
    }

    .subsection-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #495057;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .feature-boxes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }

    .feature-box {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .feature-box h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #212529;
    }

    .feature-box p {
        color: #6c757d;
        margin: 0;
        line-height: 1.6;
    }

    .use-case-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .use-case-item {
        background: #e9f5ff;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
    }

    .use-case-item h4 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #212529;
    }

    .use-case-item p {
        color: #495057;
        margin: 0;
    }

    .technical-list, .commitment-list {
        background: #f8f9fa;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        list-style-position: inside;
    }

    .technical-list li, .commitment-list li {
        margin-bottom: 0.75rem;
        color: #495057;
    }

    .contact-list {
        background: #fff8e1;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        list-style: none;
        border: 2px solid #ffc107;
    }

    .contact-list li {
        margin-bottom: 1rem;
        color: #495057;
    }

    .contact-list a {
        color: #007bff;
        text-decoration: none;
        font-weight: 500;
    }

    .contact-list a:hover {
        text-decoration: underline;
    }

    .cta-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        text-align: center;
        margin-top: 3rem;
    }

    .cta-box h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .cta-box p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .cta-box .btn {
        background: white;
        color: #667eea;
        padding: 1rem 2.5rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        text-decoration: none;
        display: inline-block;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cta-box .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
        .content-section {
            padding: 2rem 1rem;
        }

        .section-title {
            font-size: 1.5rem;
        }

        .subsection-title {
            font-size: 1.2rem;
        }

        .feature-boxes {
            grid-template-columns: 1fr;
        }

        .use-case-section {
            grid-template-columns: 1fr;
        }

        .cta-box {
            padding: 2rem 1rem;
        }

        .cta-box h3 {
            font-size: 1.5rem;
        }

        .cta-box p {
            font-size: 1rem;
        }
    }
</style>
