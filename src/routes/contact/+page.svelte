<script>
    import { _ } from 'svelte-i18n';
    let copyrightYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>{$_('contact.title')}</title>
    <meta name="description" content={$_('contact.metaDescription')}>
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
                {$_('nav.contact')}
            </h1>
            
            <div class="text-start">
                <h2>{$_('contact.getInTouch')}</h2>
                <p>{$_('contact.loveToHear')}</p>
                
                <h3>{$_('contact.emailSupport')}</h3>
                <p>{$_('contact.generalInquiries')} <a href="mailto:support@firetempmail.com">support@firetempmail.com</a></p>
                
                <h3>{$_('contact.businessInquiries')}</h3>
                <p>{$_('contact.businessText')} <a href="mailto:business@firetempmail.com">business@firetempmail.com</a></p>
                
                <h3>{$_('contact.reportAbuse')}</h3>
                <p>{$_('contact.reportAbuseText')} <a href="mailto:abuse@firetempmail.com">abuse@firetempmail.com</a></p>
                
                <h3>{$_('contact.responseTime')}</h3>
                <p>{$_('contact.responseText')}</p>
            </div>
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
</style>