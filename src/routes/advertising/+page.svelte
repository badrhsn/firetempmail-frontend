<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
    
    // Import page data for SEO
    export let data;
    
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/advertising" />
<svelte:head>
    <title>{data?.seo?.title || $_('advertising.metaTitle')}</title>
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/advertising'} />
    <meta name="description" content={data?.seo?.description || $_('advertising.metaDescription')} />

    <!-- Open Graph -->
    <meta property="og:title" content="Advertising Opportunities - Fire Temp Mail" />
    <meta property="og:description" content="Advertise with Fire Temp Mail. Reach privacy-conscious users through our advertising opportunities and grow your brand." />
    <meta property="og:url" content="https://firetempmail.com/advertising" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Advertising - Fire Temp Mail" />
    <meta name="twitter:description" content="Advertise with Fire Temp Mail. Reach privacy-conscious users through our advertising opportunities." />

    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

    <!-- BreadcrumbList Schema -->
    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "Advertising", "item": "https://firetempmail.com/advertising" }
      ]
    }) + '</script>'}
    
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 800px;">
        <div class="text-center p-4 p-lg-5">
            <!-- Header -->
            <h1 class="text-start" style="font-family: 'Inter Tight', sans-serif;font-weight: 600;margin-bottom: 16px;">
                <span style="font-weight: normal !important; color: rgb(255, 255, 255);">📮&nbsp;</span>
                {$_('nav.advertising')}
            </h1>
            
            <div class="text-start">
                <h2>{$_('advertising.opportunities.title')}</h2>
                <p>{$_('advertising.opportunities.text')}</p>
                
                <h3>{$_('advertising.audience.title')}</h3>
                <p>{$_('advertising.audience.text')}</p>
                
                <h3>{$_('advertising.options.title')}</h3>
                <p>{$_('advertising.options.text')}</p>
                
                <h3>{$_('advertising.policy.title')}</h3>
                <p>{$_('advertising.policy.text')}</p>
                
                <h3>{$_('advertising.getStarted.title')}</h3>
                <p>{$_('advertising.getStarted.text')} <a href="mailto:ads@firetempmail.com">ads@firetempmail.com</a></p>
            </div>
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