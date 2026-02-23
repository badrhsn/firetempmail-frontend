<script>
    import { _ } from 'svelte-i18n';
    import Hreflang from '$lib/components/Hreflang.svelte';
    export let data;
    let copyrightYear = new Date().getFullYear();
</script>

<Hreflang path="/terms" />
<svelte:head>
    <title>{$_('terms.metaTitle')}</title>
    <meta name="description" content={$_('terms.metaDescription')}>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href={data?.seo?.canonical || 'https://firetempmail.com/terms'} />
    <meta property="og:title" content={$_('terms.metaTitle')} />
    <meta property="og:description" content={$_('terms.metaDescription')} />
    <meta property="og:url" content="https://firetempmail.com/terms" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fire Temp Mail" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={$_('terms.metaTitle')} />
    <meta name="twitter:description" content={$_('terms.metaDescription')} />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    {@html '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firetempmail.com/" },
        { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://firetempmail.com/terms" }
      ]
    }) + '</script>'}
</svelte:head>

<section class="py-4 py-xl-5">
    <div class="container" style="max-width: 1000px;">
        <div class="p-4 p-lg-5">
            <h1 class="text-start mb-4">{$_('terms.title')}</h1>
            <div class="text-start">
                <h2>1. {$_('terms.introduction.title')}</h2>
                <p>{$_('terms.introduction.text')}</p>

                <h2>2. {$_('terms.privacy.title')}</h2>
                <p>{@html $_('terms.privacy.text')}</p>

                <h2>3. {$_('terms.serviceDesc.title')}</h2>
                <p>{$_('terms.serviceDesc.text')}</p>

                <h2>4. {$_('terms.acceptableUse.title')}</h2>
                <p>{$_('terms.acceptableUse.intro')}</p>
                <ul>
                    <li>{$_('terms.acceptableUse.items.0')}</li>
                    <li>{$_('terms.acceptableUse.items.1')}</li>
                    <li>{$_('terms.acceptableUse.items.2')}</li>
                    <li>{$_('terms.acceptableUse.items.3')}</li>
                </ul>

                <h2>5. {$_('terms.dataStorage.title')}</h2>
                <p>{$_('terms.dataStorage.text1')}</p>
                <p>{$_('terms.dataStorage.text2')}</p>

                <h2>6. {$_('terms.premium.title')}</h2>
                <p>{$_('terms.premium.intro')}</p>
                <ul>
                    <li>{$_('terms.premium.features.0')}</li>
                    <li>{$_('terms.premium.features.1')}</li>
                    <li>{$_('terms.premium.features.2')}</li>
                    <li>{$_('terms.premium.features.3')}</li>
                    <li>{$_('terms.premium.features.4')}</li>
                </ul>
                <p>{$_('terms.premium.billing')}</p>

                <h2>7. {$_('terms.liability.title')}</h2>
                <p>{$_('terms.liability.intro')}</p>
                <ul>
                    <li>{$_('terms.liability.items.0')}</li>
                    <li>{$_('terms.liability.items.1')}</li>
                    <li>{$_('terms.liability.items.2')}</li>
                </ul>
                <p>{$_('terms.liability.disclaimer')}</p>

                <h2>8. {$_('terms.changes.title')}</h2>
                <p>{$_('terms.changes.text')}</p>

                <h2>9. {$_('terms.contact.title')}</h2>
                <p>{$_('terms.contact.text')}</p>
                <ul>
                    <li><strong>{$_('terms.contact.email')}</strong></li>
                </ul>

                <hr class="my-4">
                <p class="text-muted"><small>© {copyrightYear} Fire Temp Mail</small></p>
            </div>
        </div>
    </div>
</section>

<style>
    .container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; }
    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    h2 { font-size: 1.8rem; font-weight: 600; margin: 2rem 0 1rem 0; color: #2c3e50; padding-top: 10px; }
    h3 { font-size: 1.3rem; font-weight: 600; margin: 1.5rem 0 0.5rem 0; color: #34495e; }
    p { margin-bottom: 1rem; line-height: 1.6; }
    ul { margin-left: 1.5rem; margin-bottom: 1rem; list-style: disc; }
    li { margin-bottom: 0.5rem; line-height: 1.5; }
    strong { color: #2c3e50; }
    hr { border: 0; height: 1px; background: linear-gradient(to right, transparent, #3498db, transparent); margin: 2rem 0; }
    a { color: #3498db; text-decoration: none; }
    a:hover { text-decoration: underline; }
    @media (max-width: 768px) {
        h1 { font-size: 2rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.2rem; }
        .container { padding: 15px; }
    }
</style>
