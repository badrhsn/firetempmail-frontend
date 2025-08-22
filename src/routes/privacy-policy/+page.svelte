<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Privacy Policy - Fire Temp Mail</title>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Privacy Policy
            </h1>
            
            <div class="text-start">
                <h2>Privacy Policy</h2>
                <p>Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.</p>
                
                <h3>Information We Collect</h3>
                <p>We only collect email messages sent to your temporary email address. These emails are automatically deleted after a short period.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use the collected emails solely to provide the temporary email service. We do not share your emails with third parties.</p>
                
                <h3>Data Retention</h3>
                <p>All emails are automatically deleted from our servers after 24 hours.</p>
                
                <h3>Cookies</h3>
                <p>We use cookies only to maintain your temporary email address during your session. No tracking cookies are used.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                Made with lots of 🥨 in Germany
                <span class="float-end">
                    <a href="/privacy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="https://github.com/berrysauce/justatemp/blob/main/LICENSE" target="_blank" style="color: inherit;">License</a>&nbsp;&nbsp;
                    <a href="mailto:hey@firetempmail.com" style="color: inherit;">Contact</a>
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