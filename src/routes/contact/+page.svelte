<script>
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
                    <a href="/temp-mail-edu" style="color: inherit;">Temp Mail EDU</a>&nbsp;&nbsp;
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
    

    
    .float-end {
        float: right;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        
        .float-end {
            float: none;
            display: block;
            text-align: center;
            margin-top: 16px;
        }
        
        
    }
</style>