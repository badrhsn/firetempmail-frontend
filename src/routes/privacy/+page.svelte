<script>
    import Header from '$lib/components/ui/Header.svelte';
    import Footer from '$lib/components/ui/Footer.svelte';
    
    let copyrightYear = new Date().getFullYear();
    let stats = { count: 0 };
</script>

<svelte:head>
    <title>Privacy Policy - Fire Temp Mail</title>
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <Header />
            
            <div class="text-start">
                <h2>Privacy Policy</h2>
                <p>Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.</p>
                
                <h3>Information We Collect</h3>
                <p>We only collect email messages sent to your temporary email address. These emails are automatically deleted after a short period.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use the collected emails solely to provide the temporary email service. We do not share your emails with third parties.</p>
            </div>
        </div>

        <Footer {copyrightYear} {stats} />
    </div>
</section>