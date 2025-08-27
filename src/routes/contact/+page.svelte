<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Contact Us - Fire Temp Mail</title>
    <meta name="description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email. We're here to help!">
    <meta name="keywords" content="contact, support, email, Fire Temp Mail, temp mail, report abuse, business inquiry">
    <meta name="author" content="Fire Temp Mail">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Open Graph / Social sharing -->
    <meta property="og:title" content="Contact Us - Fire Temp Mail">
    <meta property="og:description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://firetempmail.com/contact">
    <meta property="og:image" content="https://firetempmail.com/og-image.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Contact Us - Fire Temp Mail">
    <meta name="twitter:description" content="Get in touch with Fire Temp Mail. Contact our support, business, or report abuse via email.">
    <meta name="twitter:image" content="https://firetempmail.com/og-image.png">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://firetempmail.com/contact">
</svelte:head>


<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Contact Us
            </h1>
            
            <div class="text-start">
                <h2>Get in Touch</h2>
                <p>We'd love to hear from you! Here's how you can reach us:</p>
                
                <h3>Email Support</h3>
                <p>For general inquiries and support: <a href="mailto:support@firetempmail.com">support@firetempmail.com</a></p>
                
                <h3>Business Inquiries</h3>
                <p>For business and partnership opportunities: <a href="mailto:business@firetempmail.com">business@firetempmail.com</a></p>
                
                <h3>Report Abuse</h3>
                <p>To report abuse or illegal activities: <a href="mailto:abuse@firetempmail.com">abuse@firetempmail.com</a></p>
                
                <h3>Response Time</h3>
                <p>We typically respond to all emails within 24-48 hours during business days.</p>
            </div>
        </div>

        <!-- Footer -->
               <div class="text-center p-4 p-lg-5">
            <p class="footer-links">
                <span class="float-end">
                    <a href="/">Home</a>&nbsp;&nbsp;
                    <a href="/10minutemail">10 Minute Mail</a>&nbsp;&nbsp;
                    <a href="/blog">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms">Terms</a>&nbsp;&nbsp;
                    <a href="/faq">FAQ</a>&nbsp;&nbsp;
                    <a href="/contact">Contact</a>
                </span>
            </p>
            <p class="copyright">
                Copyright © {copyrightYear}
            </p>
        </div>
    </div>
</section>

<style>
    h2 {
        font-size: 2rem;
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
    
    a {
        color: var(--bs-primary);
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>