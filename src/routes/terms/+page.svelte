<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Terms of Service - Fire Temp Mail</title>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Terms of Service
            </h1>
            
            <div class="text-start">
                <h2>Terms of Service</h2>
                <p>By using our service, you agree to the following terms:</p>
                
                <h3>Acceptable Use</h3>
                <p>You agree not to use our service for any illegal or unauthorized purpose. You must not transmit any worms or viruses or any code of a destructive nature.</p>
                
                <h3>Service Availability</h3>
                <p>We strive to provide a reliable service but cannot guarantee 100% uptime. We may need to perform maintenance that could result in temporary service interruptions.</p>
                
                <h3>Limitation of Liability</h3>
                <p>We are not liable for any damages that may result from the use of our temporary email service.</p>
                
                <h3>Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. We will notify users of any material changes to these terms.</p>
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