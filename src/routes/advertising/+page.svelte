<script>
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Advertising - Fire Temp Mail</title>
    <link rel="canonical" href="https://firetempmail.com/advertising" />
    <meta name="description" content="Explore advertising opportunities with Fire Temp Mail to reach a targeted audience." />
    
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                Advertising
            </h1>
            
            <div class="text-start">
                <h2>Advertising Opportunities</h2>
                <p>Fire Temp Mail offers unique advertising opportunities to reach our growing user base.</p>
                
                <h3>Our Audience</h3>
                <p>We serve thousands of users daily who are tech-savvy, privacy-conscious, and actively engaged in online activities requiring email verification.</p>
                
                <h3>Advertising Options</h3>
                <p>We offer several advertising options including banner ads, sponsored content, and dedicated email placements.</p>
                
                <h3>Ad Policy</h3>
                <p>We maintain a strict ad policy to ensure our users have a positive experience. We don't allow intrusive pop-ups, auto-play videos with sound, or misleading advertisements.</p>
                
                <h3>Get Started</h3>
                <p>For advertising rates and availability, please contact us at <a href="mailto:ads@firetempmail.com">ads@firetempmail.com</a></p>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center p-4 p-lg-5">
            <p class="text-start" style="margin-bottom: 4px;font-size: 16px;">
                <span class="float-end">
                    <a href="/email-generator" style="color: inherit;">Email Generator</a>&nbsp;&nbsp;
                    <a href="/10minutemail" style="color: inherit;">10 Minute Mail</a>&nbsp;&nbsp;
                    <a href="/temp-mail-edu" style="color: inherit;">Temp Mail EDU</a>&nbsp;&nbsp;
                    <a href="/blog" style="color: inherit;">Blog</a>&nbsp;&nbsp;
                    <a href="/privacy-policy" style="color: inherit;">Privacy</a>&nbsp;&nbsp;
                    <a href="/terms" style="color: inherit;">Terms</a>&nbsp;&nbsp;
                    <a href="/faq" style="color: inherit;">FAQ</a>&nbsp;&nbsp;
                    <a href="/contact" style="color: inherit;">Contact</a>
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