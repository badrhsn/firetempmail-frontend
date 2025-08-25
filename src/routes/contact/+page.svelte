<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Contact Us - Fire Temp Mail</title>
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
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/" style="color: inherit;">Home</a>&nbsp;&nbsp;
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                    <a href="/10minutemail" style="color: inherit;">10 Minute Mail</a>&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="/faq" style="color: inherit;">FAQ</a>&nbsp;&nbsp;
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
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