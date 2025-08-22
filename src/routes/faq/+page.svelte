<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>FAQ - Fire Temp Mail</title>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Frequently Asked Questions
            </h1>
            
            <div class="text-start">
                <h2>Frequently Asked Questions</h2>
                
                <h3>What is a temporary email?</h3>
                <p>A temporary email is a disposable email address that you can use for signing up to websites, forums, or any online service that requires email verification without using your personal email.</p>
                
                <h3>How long do emails stay in my inbox?</h3>
                <p>Emails are automatically deleted after 24 hours. We don't store your emails permanently.</p>
                
                <h3>Is this service free?</h3>
                <p>Yes, our temporary email service is completely free to use with no hidden costs.</p>
                
                <h3>Can I reply to emails?</h3>
                <p>No, this is a receive-only email service. You can view and forward emails but cannot reply to them.</p>
                
                <h3>Is my data secure?</h3>
                <p>We don't store personal information and all emails are automatically deleted after 24 hours. We don't share your data with third parties.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="/contact" style="color: inherit;">Contact</a>
                </span>
            </p>
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Copyright © {copyrightYear} berrysauce
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
</style>